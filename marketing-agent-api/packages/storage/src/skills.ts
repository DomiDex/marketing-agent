import { BUCKET, GetObjectCommand, ListObjectsV2Command, s3Client } from './client'

export interface SkillContent {
  skillMd: string
  rulesMd?: string
  subdirectories?: Record<string, Record<string, string>>
}

/**
 * Get skill content from S3
 */
export async function getSkillContent(skillName: string): Promise<SkillContent> {
  const prefix = `skills/${skillName}/`

  // Get SKILL.md
  const skillMdResponse = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: `${prefix}SKILL.md`,
    }),
  )
  const skillMd = (await skillMdResponse.Body?.transformToString()) ?? ''

  // Try to get RULES.md
  let rulesMd: string | undefined
  try {
    const rulesMdResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: `${prefix}RULES.md`,
      }),
    )
    rulesMd = await rulesMdResponse.Body?.transformToString()
  } catch {
    // RULES.md doesn't exist for this skill
  }

  // Check for subdirectories
  const listResponse = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
      Delimiter: '/',
    }),
  )

  const subdirectories: Record<string, Record<string, string>> = {}

  if (listResponse.CommonPrefixes) {
    for (const commonPrefix of listResponse.CommonPrefixes) {
      const subdirName = commonPrefix.Prefix?.replace(prefix, '').replace('/', '')
      if (subdirName && subdirName !== 'SKILL.md' && subdirName !== 'RULES.md') {
        // List files in subdirectory
        const subdirResponse = await s3Client.send(
          new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: commonPrefix.Prefix,
          }),
        )

        subdirectories[subdirName] = {}

        if (subdirResponse.Contents) {
          for (const obj of subdirResponse.Contents) {
            const fileName = obj.Key?.split('/').pop()
            if (!fileName || !obj.Key) continue
            const fileResponse = await s3Client.send(
              new GetObjectCommand({
                Bucket: BUCKET,
                Key: obj.Key,
              }),
            )
            const content = await fileResponse.Body?.transformToString()
            if (content) subdirectories[subdirName][fileName] = content
          }
        }
      }
    }
  }

  return {
    skillMd,
    rulesMd,
    subdirectories: Object.keys(subdirectories).length > 0 ? subdirectories : undefined,
  }
}

/**
 * List all skills
 */
export async function listSkills(): Promise<string[]> {
  const response = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'skills/',
      Delimiter: '/',
    }),
  )

  return (response.CommonPrefixes || [])
    .map((p) => p.Prefix?.replace('skills/', '').replace('/', ''))
    .filter((name): name is string => Boolean(name))
}
