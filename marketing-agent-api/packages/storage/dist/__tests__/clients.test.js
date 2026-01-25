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
import { getClientContext, listClients } from '../clients';
import { s3Client, GetObjectCommand, ListObjectsV2Command } from '../client';
describe('getClientContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return full ClientContext structure', async () => {
        const mockSend = s3Client.send;
        // Mock all 15 file responses in order
        const files = [
            '# Profile', // profile.md
            '# Voice', // brand/voice.md
            '# Messaging', // brand/messaging.md
            '# Assets', // brand/assets.md
            '# Primary ICP', // audience/primary-icp.md
            '# Secondary ICP', // audience/secondary-icp.md
            '# Anti-personas', // audience/anti-personas.md
            '# Customer Journey', // audience/customer-journey.md
            '# Overview', // product/overview.md
            '# Pricing', // product/pricing.md
            '# Differentiators', // product/differentiators.md
            '# Objections', // product/objections.md
            '# Competitors', // market/competitors.md
            '# Industry', // market/industry.md
            '# Proof', // market/proof.md
        ];
        for (const content of files) {
            mockSend.mockResolvedValueOnce({
                Body: { transformToString: () => Promise.resolve(content) },
            });
        }
        const result = await getClientContext('my-client');
        expect(result.profile).toBe('# Profile');
        expect(result.brand.voice).toBe('# Voice');
        expect(result.brand.messaging).toBe('# Messaging');
        expect(result.brand.assets).toBe('# Assets');
        expect(result.audience.primaryIcp).toBe('# Primary ICP');
        expect(result.audience.secondaryIcp).toBe('# Secondary ICP');
        expect(result.audience.antiPersonas).toBe('# Anti-personas');
        expect(result.audience.customerJourney).toBe('# Customer Journey');
        expect(result.product.overview).toBe('# Overview');
        expect(result.product.pricing).toBe('# Pricing');
        expect(result.product.differentiators).toBe('# Differentiators');
        expect(result.product.objections).toBe('# Objections');
        expect(result.market.competitors).toBe('# Competitors');
        expect(result.market.industry).toBe('# Industry');
        expect(result.market.proof).toBe('# Proof');
    });
    it('should fetch all 15 possible files in parallel', async () => {
        const mockSend = s3Client.send;
        // Profile exists
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Profile') },
        });
        // All other files missing
        for (let i = 0; i < 14; i++) {
            mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        }
        await getClientContext('my-client');
        // Should have called send 15 times (once for each file)
        expect(mockSend).toHaveBeenCalledTimes(15);
    });
    it('should throw when profile.md is missing', async () => {
        const mockSend = s3Client.send;
        // Profile missing
        mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        // All other files exist
        for (let i = 0; i < 14; i++) {
            mockSend.mockResolvedValueOnce({
                Body: { transformToString: () => Promise.resolve('# Content') },
            });
        }
        await expect(getClientContext('my-client')).rejects.toThrow('Client not found: my-client');
    });
    it('should handle missing optional files gracefully', async () => {
        const mockSend = s3Client.send;
        // Only profile exists
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Profile') },
        });
        // All other files missing
        for (let i = 0; i < 14; i++) {
            mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        }
        const result = await getClientContext('my-client');
        expect(result.profile).toBe('# Profile');
        expect(result.brand.voice).toBeUndefined();
        expect(result.brand.messaging).toBeUndefined();
        expect(result.brand.assets).toBeUndefined();
        expect(result.audience.primaryIcp).toBeUndefined();
        expect(result.product.overview).toBeUndefined();
        expect(result.market.competitors).toBeUndefined();
    });
    it('should use correct S3 paths', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            Body: { transformToString: () => Promise.resolve('# Profile') },
        });
        for (let i = 0; i < 14; i++) {
            mockSend.mockRejectedValueOnce(new Error('NoSuchKey'));
        }
        await getClientContext('test-client');
        // Check that the first call was for profile.md
        const firstCommand = mockSend.mock.calls[0][0];
        expect(firstCommand).toBeInstanceOf(GetObjectCommand);
        expect(firstCommand.params.Key).toBe('clients/test-client/profile.md');
    });
});
describe('listClients', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return client slugs', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [
                { Prefix: 'clients/acme-corp/' },
                { Prefix: 'clients/widgets-inc/' },
            ],
        });
        const result = await listClients();
        expect(result).toEqual(['acme-corp', 'widgets-inc']);
    });
    it('should filter out _template directory', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [
                { Prefix: 'clients/_template/' },
                { Prefix: 'clients/acme-corp/' },
                { Prefix: 'clients/widgets-inc/' },
            ],
        });
        const result = await listClients();
        expect(result).toEqual(['acme-corp', 'widgets-inc']);
        expect(result).not.toContain('_template');
    });
    it('should return empty array when no clients', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: undefined,
        });
        const result = await listClients();
        expect(result).toEqual([]);
    });
    it('should return empty array when only _template exists', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [{ Prefix: 'clients/_template/' }],
        });
        const result = await listClients();
        expect(result).toEqual([]);
    });
    it('should call S3 with correct parameters', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({ CommonPrefixes: [] });
        await listClients();
        expect(mockSend).toHaveBeenCalledTimes(1);
        const command = mockSend.mock.calls[0][0];
        expect(command).toBeInstanceOf(ListObjectsV2Command);
        expect(command.params).toEqual({
            Bucket: 'test-bucket',
            Prefix: 'clients/',
            Delimiter: '/',
        });
    });
    it('should filter out entries with undefined Prefix', async () => {
        const mockSend = s3Client.send;
        mockSend.mockResolvedValueOnce({
            CommonPrefixes: [
                { Prefix: 'clients/acme-corp/' },
                { Prefix: undefined },
                { Prefix: '' },
            ],
        });
        const result = await listClients();
        expect(result).toEqual(['acme-corp']);
    });
});
//# sourceMappingURL=clients.test.js.map