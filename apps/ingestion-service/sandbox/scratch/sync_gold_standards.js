const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const PROJECT_ROOT = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2'

// Absolute precision from .env
const supabaseUrl = process.env.SOVEREIGN_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SECRET_SERVICE_KEY // Corrected spelling
const bucketName = process.env.SOVEREIGN_SUPABASE_BUCKET

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadFile(localPath, category) {
  const fileName = path.basename(localPath)
  const fileBuffer = fs.readFileSync(localPath)
  const filePath = `${category}/${fileName}`

  console.log(`🚀 UPLOADING ${fileName} to bucket [${bucketName}] at path [${filePath}]...`)

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, fileBuffer, {
      upsert: true,
      contentType: 'text/plain'
    })

  if (error) {
    console.error(`❌ FAILED TO UPLOAD ${fileName}:`, error.message)
  } else {
    console.log(`✅ ${fileName} ENSHRINED.`)
  }
}

async function main() {
  console.log('🏛️ ENSHRINING GOLD STANDARDS IN THE CLOUD VAULT (ADMIN PRIVILEGES)...')
  
  if (!supabaseUrl || !supabaseKey || !bucketName) {
    console.error('❌ MISSING SOVEREIGN SERVICE ROLE CREDENTIALS IN .ENV')
    console.log('Detected URL:', !!supabaseUrl)
    console.log('Detected Key:', !!supabaseKey)
    console.log('Detected Bucket:', !!bucketName)
    return
  }

  await uploadFile(path.join(PROJECT_ROOT, 'docs/Schema/schema_gold.sql'), 'schema')
  await uploadFile(path.join(PROJECT_ROOT, 'packages/data-access/prisma/schema.prisma'), 'schema')
  await uploadFile(path.join(PROJECT_ROOT, 'docs/rules/exhaustive_vedic_ontology.json'), 'ontology')
  
  console.log('🏆 ALL GOLD STANDARDS ARE NOW SOVEREIGN AND ACCESSIBLE.')
}

main()
