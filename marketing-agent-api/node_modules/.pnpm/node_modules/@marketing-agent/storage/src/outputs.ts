import {
  BUCKET,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  getSignedUrl,
  s3Client,
} from './client'

export interface OutputFile {
  key: string
  content: string
  metadata: {
    skill: string
    client?: string
    type?: string
    date: string
  }
}

/**
 * Save output to S3
 */
export async function saveOutput(
  skillName: string,
  clientSlug: string | undefined,
  outputType: string,
  content: string,
): Promise<string> {
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const parts = [clientSlug, outputType, date].filter(Boolean)
  const fileName = `${parts.join('-')}.md`
  const key = `outputs/${skillName}/${fileName}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: content,
      ContentType: 'text/markdown',
    }),
  )

  return key
}

/**
 * Get output content
 */
export async function getOutput(s3Key: string): Promise<string> {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
    }),
  )
  return (await response.Body?.transformToString()) ?? ''
}

/**
 * Generate signed download URL
 */
export async function getDownloadUrl(s3Key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: s3Key,
  })
  return await getSignedUrl(s3Client, command, { expiresIn })
}

/**
 * List outputs for a skill
 */
export async function listOutputs(skillName: string, limit = 20): Promise<string[]> {
  const response = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: `outputs/${skillName}/`,
      MaxKeys: limit,
    }),
  )

  return (response.Contents || [])
    .map((obj) => obj.Key)
    .filter((key): key is string => Boolean(key))
}
