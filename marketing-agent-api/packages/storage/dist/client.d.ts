import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
declare const s3Client: S3Client;
declare const BUCKET: string;
export { s3Client, BUCKET, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand, HeadObjectCommand, getSignedUrl, };
//# sourceMappingURL=client.d.ts.map