import { BUCKET, GetObjectCommand, ListObjectsV2Command, s3Client } from './client';
/**
 * Get client context from S3
 */
export async function getClientContext(clientSlug) {
    const prefix = `clients/${clientSlug}/`;
    // Helper to get file content
    async function getFile(key) {
        try {
            const response = await s3Client.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
            return await response.Body?.transformToString();
        }
        catch {
            return undefined;
        }
    }
    const [profile, voice, messaging, assets, primaryIcp, secondaryIcp, antiPersonas, customerJourney, overview, pricing, differentiators, objections, competitors, industry, proof,] = await Promise.all([
        getFile(`${prefix}profile.md`),
        getFile(`${prefix}brand/voice.md`),
        getFile(`${prefix}brand/messaging.md`),
        getFile(`${prefix}brand/assets.md`),
        getFile(`${prefix}audience/primary-icp.md`),
        getFile(`${prefix}audience/secondary-icp.md`),
        getFile(`${prefix}audience/anti-personas.md`),
        getFile(`${prefix}audience/customer-journey.md`),
        getFile(`${prefix}product/overview.md`),
        getFile(`${prefix}product/pricing.md`),
        getFile(`${prefix}product/differentiators.md`),
        getFile(`${prefix}product/objections.md`),
        getFile(`${prefix}market/competitors.md`),
        getFile(`${prefix}market/industry.md`),
        getFile(`${prefix}market/proof.md`),
    ]);
    if (!profile) {
        throw new Error(`Client not found: ${clientSlug}`);
    }
    return {
        profile,
        brand: { voice, messaging, assets },
        audience: { primaryIcp, secondaryIcp, antiPersonas, customerJourney },
        product: { overview, pricing, differentiators, objections },
        market: { competitors, industry, proof },
    };
}
/**
 * List all clients
 */
export async function listClients() {
    const response = await s3Client.send(new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: 'clients/',
        Delimiter: '/',
    }));
    return (response.CommonPrefixes || [])
        .map((p) => p.Prefix?.replace('clients/', '').replace('/', ''))
        .filter((name) => Boolean(name) && name !== '_template');
}
//# sourceMappingURL=clients.js.map