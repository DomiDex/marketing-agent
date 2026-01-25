import { BUCKET, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, getSignedUrl, s3Client, } from './client';
/**
 * Save output to S3
 */
export async function saveOutput(skillName, clientSlug, outputType, content) {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const parts = [clientSlug, outputType, date].filter(Boolean);
    const fileName = `${parts.join('-')}.md`;
    const key = `outputs/${skillName}/${fileName}`;
    await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: content,
        ContentType: 'text/markdown',
    }));
    return key;
}
/**
 * Get output content
 */
export async function getOutput(s3Key) {
    const response = await s3Client.send(new GetObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
    }));
    return (await response.Body?.transformToString()) ?? '';
}
/**
 * Generate signed download URL
 */
export async function getDownloadUrl(s3Key, expiresIn = 3600) {
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
    });
    return await getSignedUrl(s3Client, command, { expiresIn });
}
/**
 * List outputs for a skill
 */
export async function listOutputs(skillName, limit = 20) {
    const response = await s3Client.send(new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: `outputs/${skillName}/`,
        MaxKeys: limit,
    }));
    return (response.Contents || [])
        .map((obj) => obj.Key)
        .filter((key) => Boolean(key));
}
//# sourceMappingURL=outputs.js.map