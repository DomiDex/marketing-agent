import { describe, expect, it, vi, beforeEach } from 'vitest';
// Mock the client module before importing the functions
vi.mock('../client', () => {
    const mockSend = vi.fn();
    return {
        s3Client: { send: mockSend },
        BUCKET: 'test-bucket',
        GetObjectCommand: class MockGetObjectCommand {
            params;
            constructor(params) {
                this.params = params;
            }
        },
        ListObjectsV2Command: class MockListObjectsV2Command {
            params;
            constructor(params) {
                this.params = params;
            }
        },
    };
});
import { getSkillContent, listSkills } from '../skills';
import { s3Client, ListObjectsV2Command } from '../client';
describe('getSkillContent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return skillMd content', async () => {
        const mockSend = s3Client.send;
        // Mock SKILL.md response
        mockSend.mockResolvedValueOnce({
            Body: {
                transformToString: () => Promise.resolve('# Skill Content'),
            },
        });
        // Mock RULES.md response (throws to simulate missing file)
        mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        // Mock list response (no subdirectories)
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [],
        });
        const result = await getSkillContent('copywriting');
        expect(result.skillMd).toBe('# Skill Content');
        expect(result.rulesMd).toBeUndefined();
        expect(result.subdirectories).toBeUndefined();
    });
    it('should return rulesMd when present', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Skill Content') },
        });
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Rules Content') },
        });
        mockSend.mockResolvedValueOnce({ CommonPrefixes: [] });
        const result = await getSkillContent('copywriting');
        expect(result.skillMd).toBe('# Skill Content');
        expect(result.rulesMd).toBe('# Rules Content');
    });
    it('should return undefined rulesMd when RULES.md is missing', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Skill Content') },
        });
        mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        mockSend.mockResolvedValueOnce({ CommonPrefixes: [] });
        const result = await getSkillContent('copywriting');
        expect(result.rulesMd).toBeUndefined();
    });
    it('should fetch subdirectory contents', async () => {
        const mockSend = s3Client.send;
        // Mock SKILL.md
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Skill Content') },
        });
        // Mock RULES.md (missing)
        mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        // Mock list response with subdirectory
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [{ Prefix: 'skills/copywriting/templates/' }],
        });
        // Mock subdirectory listing
        mockSend.mockResolvedValueOnce({
            Contents: [{ Key: 'skills/copywriting/templates/example.md' }],
        });
        // Mock file content
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Template Content') },
        });
        const result = await getSkillContent('copywriting');
        expect(result.subdirectories).toBeDefined();
        expect(result.subdirectories?.templates).toBeDefined();
        expect(result.subdirectories?.templates['example.md']).toBe('# Template Content');
    });
    it('should handle empty subdirectories', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Skill Content') },
        });
        mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [{ Prefix: 'skills/copywriting/empty/' }],
        });
        mockSend.mockResolvedValueOnce({
            Contents: [],
        });
        const result = await getSkillContent('copywriting');
        // Empty subdirectories are included but with empty objects
        expect(result.subdirectories).toEqual({ empty: {} });
    });
    it('should throw on S3 errors for SKILL.md', async () => {
        const mockSend = s3Client.send;
        mockSend.mockRejectedValueOnce(new Error('Access Denied'));
        await expect(getSkillContent('copywriting')).rejects.toThrow('Access Denied');
    });
});
describe('listSkills', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return array of skill names', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [
                { Prefix: 'skills/copywriting/' },
                { Prefix: 'skills/email-sequence/' },
                { Prefix: 'skills/page-cro/' },
            ],
        });
        const result = await listSkills();
        expect(result).toEqual(['copywriting', 'email-sequence', 'page-cro']);
    });
    it('should filter out non-directory prefixes', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [
                { Prefix: 'skills/copywriting/' },
                { Prefix: undefined },
                { Prefix: 'skills/' },
            ],
        });
        const result = await listSkills();
        expect(result).toEqual(['copywriting']);
    });
    it('should return empty array when no skills', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: undefined,
        });
        const result = await listSkills();
        expect(result).toEqual([]);
    });
    it('should call S3 with correct parameters', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({ CommonPrefixes: [] });
        await listSkills();
        expect(mockSend).toHaveBeenCalledTimes(1);
        const command = mockSend.mock.calls[0][0];
        expect(command).toBeInstanceOf(ListObjectsV2Command);
        expect(command.params).toEqual({
            Bucket: 'test-bucket',
            Prefix: 'skills/',
            Delimiter: '/',
        });
    });
});
//# sourceMappingURL=skills.test.js.map