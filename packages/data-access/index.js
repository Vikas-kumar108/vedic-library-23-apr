import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL || '';
    return new PrismaClient({
        datasources: {
            db: {
                url: connectionString
            }
        }
    });
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prisma;
export { prisma };
export * from '@prisma/client';
export { PrismaClient, user_role_enum, user_status_enum } from '@prisma/client';
