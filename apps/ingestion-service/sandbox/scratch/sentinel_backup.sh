#!/bin/bash

# Institutional Sentinel: Database Backup Engine
# Purpose: Protect Shastra data before major refactors

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
DB_NAME="vedic_library"
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "🛡️ SENTINEL: Starting backup of $DB_NAME..."

# Execute pg_dump
# Note: Assumes pg_dump is in PATH and user has access
pg_dump -U ppublications -d $DB_NAME > $BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "✅ SENTINEL: Backup successful!"
  echo "📄 File: $BACKUP_FILE"
  
  # Keep only the last 5 backups to save space
  ls -t $BACKUP_DIR/*.sql | tail -n +6 | xargs rm -f
  echo "🧹 SENTINEL: Cleaned old backups. Total kept: 5"
else
  echo "❌ SENTINEL: Backup FAILED!"
  exit 1
fi
