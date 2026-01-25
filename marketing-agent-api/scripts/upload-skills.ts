#!/usr/bin/env bun
import { readFile, readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

// Initialize S3 client for MinIO
const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
    secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
  },
  forcePathStyle: true,
})

const BUCKET = process.env.S3_BUCKET || 'marketing-agent'

// Skills directory is in parent folder
const SKILLS_DIR = resolve(import.meta.dir, '../../.claude/skills')

async function ensureBucketExists() {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET }))
    console.log(`Bucket '${BUCKET}' exists`)
  } catch (error: unknown) {
    const err = error as { name?: string; $metadata?: { httpStatusCode?: number } }
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      console.log(`Creating bucket '${BUCKET}'...`)
      await s3Client.send(new CreateBucketCommand({ Bucket: BUCKET }))
      console.log(`Bucket '${BUCKET}' created`)
    } else {
      throw error
    }
  }
}

async function uploadDirectory(localPath: string, s3Prefix: string) {
  const entries = await readdir(localPath, { withFileTypes: true })

  for (const entry of entries) {
    const localFullPath = join(localPath, entry.name)
    const s3Key = `${s3Prefix}${entry.name}`

    if (entry.isDirectory()) {
      await uploadDirectory(localFullPath, `${s3Key}/`)
    } else if (entry.name.endsWith('.md')) {
      const content = await readFile(localFullPath, 'utf-8')
      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: s3Key,
          Body: content,
          ContentType: 'text/markdown',
        }),
      )
      console.log(`  Uploaded: ${s3Key}`)
    }
  }
}

async function main() {
  console.log('=== Upload Skills to S3 ===')
  console.log(`Skills directory: ${SKILLS_DIR}`)
  console.log(`S3 endpoint: ${process.env.S3_ENDPOINT || 'http://localhost:9000'}`)
  console.log(`Bucket: ${BUCKET}`)
  console.log('')

  // Ensure bucket exists
  await ensureBucketExists()
  console.log('')

  // Get all skill directories
  const skills = await readdir(SKILLS_DIR)
  let uploadedCount = 0

  for (const skill of skills) {
    const skillPath = join(SKILLS_DIR, skill)
    const skillStat = await stat(skillPath)

    if (skillStat.isDirectory()) {
      console.log(`Uploading skill: ${skill}`)
      await uploadDirectory(skillPath, `skills/${skill}/`)
      uploadedCount++
    }
  }

  console.log('')
  console.log(`Done! Uploaded ${uploadedCount} skills.`)
}

main().catch((err) => {
  console.error('Upload failed:', err)
  process.exit(1)
})
