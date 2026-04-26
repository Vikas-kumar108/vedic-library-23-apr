import { PrismaClient } from '@prisma/client'

export const rawDb = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_RAW
        }
    }
})

export const syncDb = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_SYNC
        }
    }
})