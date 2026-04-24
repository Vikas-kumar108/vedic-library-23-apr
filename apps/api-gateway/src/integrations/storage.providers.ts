import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { StorageProvider, StoragePayload } from './adapter.foundation'
import fs from 'fs/promises'
import path from 'path'

/**
 * 📦 Cloudflare R2 Adapter (Primary Production Storage)
 * Logic: S3-Compatible object storage.
 */
export class R2StorageProvider implements StorageProvider {
  name = 'CLOUDFLARE_R2'
  private client: S3Client
  private bucketName: string
  private publicUrl: string

  constructor(config: { 
    accountId: string; 
    accessKeyId: string; 
    secretAccessKey: string; 
    bucketName: string;
    publicUrl: string;
  }) {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })
    this.bucketName = config.bucketName
    this.publicUrl = config.publicUrl
  }

  async upload(payload: StoragePayload): Promise<string> {
    const key = `${payload.category.toLowerCase()}/${Date.now()}-${payload.fileName}`
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: payload.buffer,
      ContentType: payload.mimeType,
    })

    await this.client.send(command)
    return `${this.publicUrl}/${key}`
  }
}

/**
 * 💾 Local Filesystem Adapter (Resilient Fallback / Dev Storage)
 */
export class LocalStorageProvider implements StorageProvider {
  name = 'LOCAL_FILESYSTEM'
  private storageDir: string

  constructor(baseDir: string) {
    this.storageDir = path.resolve(baseDir, 'institutional-vault')
  }

  async upload(payload: StoragePayload): Promise<string> {
    const dir = path.join(this.storageDir, payload.category.toLowerCase())
    await fs.mkdir(dir, { recursive: true })
    
    const fileName = `${Date.now()}-${payload.fileName}`
    const filePath = path.join(dir, fileName)
    
    await fs.writeFile(filePath, payload.buffer)
    
    // Return a local URL (In production this would be served by Fastify static)
    return `/vault/${payload.category.toLowerCase()}/${fileName}`
  }
}
