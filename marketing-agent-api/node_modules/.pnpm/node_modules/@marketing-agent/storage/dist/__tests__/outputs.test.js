import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
// Mock the client module before importing the functions
vi.mock('../client', () => {
    const mockSend = vi.fn();
    const mockGetSignedUrl = vi.fn();
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
        PutObjectCommand: class MockPutObjectCommand {
            params;
            constructor(params) {
                this.params = params;
            }
        },
        getSignedUrl: mockGetSignedUrl,
    };
});
import { saveOutput, getOutput, getDownloadUrl, listOutputs } from '../outputs';
import { s3Client, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, getSignedUrl, } from '../client';
describe('saveOutput', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock Date to have consistent test output
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-15'));
    });
    afterEach(() => {
        vi.useRealTimers();
    });
    it('should generate correct S3 key with date', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({});
        const result = await saveOutput('copywriting', 'acme-corp', 'homepage', '# Content');
        expect(result).toBe('outputs/copywriting/acme-corp-homepage-2024-01-15.md');
        const command = mockSend.mock.calls[0][0];
        expect(command).toBeInstanceOf(PutObjectCommand);
        expect(command.params).toEqual({
            Bucket: 'test-bucket',
            Key: 'outputs/copywriting/acme-corp-homepage-2024-01-15.md',
            Body: '# Content',
            ContentType: 'text/markdown',
        });
    });
    it('should handle undefined clientSlug', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({});
        const result = await saveOutput('copywriting', undefined, 'homepage', '# Content');
        expect(result).toBe('outputs/copywriting/homepage-2024-01-15.md');
    });
    it('should set correct content type', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({});
        await saveOutput('copywriting', 'acme', 'page', '# Content');
        const command = mockSend.mock.calls[0][0];
        expect(command.params.ContentType).toBe('text/markdown');
    });
    it('should call S3 send', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({});
        await saveOutput('copywriting', 'acme', 'page', '# Content');
        expect(mockSend).toHaveBeenCalledTimes(1);
    });
});
describe('getOutput', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return content as string', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: {
                transformToString: () => Promise.resolve('# Output Content'),
            },
        });
        const result = await getOutput('outputs/copywriting/acme-homepage-2024-01-15.md');
        expect(result).toBe('# Output Content');
    });
    it('should return empty string on empty body', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: undefined,
        });
        const result = await getOutput('outputs/copywriting/test.md');
        expect(result).toBe('');
    });
    it('should call GetObjectCommand with correct params', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('content') },
        });
        await getOutput('outputs/copywriting/test.md');
        const command = mockSend.mock.calls[0][0];
        expect(command).toBeInstanceOf(GetObjectCommand);
        expect(command.params).toEqual({
            Bucket: 'test-bucket',
            Key: 'outputs/copywriting/test.md',
        });
    });
});
describe('getDownloadUrl', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return signed URL', async () => {
        const mockGetSignedUrl = getSignedUrl;
        mockGetSignedUrl.mockResolvedValueOnce('https://s3.example.com/signed-url');
        const result = await getDownloadUrl('outputs/copywriting/test.md');
        expect(result).toBe('https://s3.example.com/signed-url');
    });
    it('should use default expiresIn of 3600', async () => {
        const mockGetSignedUrl = getSignedUrl;
        mockGetSignedUrl.mockResolvedValueOnce('https://s3.example.com/signed-url');
        await getDownloadUrl('outputs/copywriting/test.md');
        expect(mockGetSignedUrl).toHaveBeenCalledWith(s3Client, expect.any(GetObjectCommand), { expiresIn: 3600 });
    });
    it('should respect custom expiresIn', async () => {
        const mockGetSignedUrl = getSignedUrl;
        mockGetSignedUrl.mockResolvedValueOnce('https://s3.example.com/signed-url');
        await getDownloadUrl('outputs/copywriting/test.md', 7200);
        expect(mockGetSignedUrl).toHaveBeenCalledWith(s3Client, expect.any(GetObjectCommand), { expiresIn: 7200 });
    });
    it('should create GetObjectCommand with correct key', async () => {
        const mockGetSignedUrl = getSignedUrl;
        mockGetSignedUrl.mockResolvedValueOnce('https://s3.example.com/signed-url');
        await getDownloadUrl('outputs/copywriting/test.md');
        const command = mockGetSignedUrl.mock.calls[0][1];
        expect(command).toBeInstanceOf(GetObjectCommand);
        expect(command.params).toEqual({
            Bucket: 'test-bucket',
            Key: 'outputs/copywriting/test.md',
        });
    });
});
describe('listOutputs', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return array of keys', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Contents: [
                { Key: 'outputs/copywriting/acme-homepage-2024-01-15.md' },
                { Key: 'outputs/copywriting/acme-landing-2024-01-14.md' },
            ],
        });
        const result = await listOutputs('copywriting');
        expect(result).toEqual([
            'outputs/copywriting/acme-homepage-2024-01-15.md',
            'outputs/copywriting/acme-landing-2024-01-14.md',
        ]);
    });
    it('should use default limit of 20', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({ Contents: [] });
        await listOutputs('copywriting');
        const command = mockSend.mock.calls[0][0];
        expect(command).toBeInstanceOf(ListObjectsV2Command);
        expect(command.params).toEqual({
            Bucket: 'test-bucket',
            Prefix: 'outputs/copywriting/',
            MaxKeys: 20,
        });
    });
    it('should respect limit parameter', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({ Contents: [] });
        await listOutputs('copywriting', 50);
        const command = mockSend.mock.calls[0][0];
        expect(command.params.MaxKeys).toBe(50);
    });
    it('should return empty array when no outputs', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({ Contents: undefined });
        const result = await listOutputs('copywriting');
        expect(result).toEqual([]);
    });
    it('should filter out entries with undefined Key', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Contents: [
                { Key: 'outputs/copywriting/valid.md' },
                { Key: undefined },
                {},
            ],
        });
        const result = await listOutputs('copywriting');
        expect(result).toEqual(['outputs/copywriting/valid.md']);
    });
});
//# sourceMappingURL=outputs.test.js.map