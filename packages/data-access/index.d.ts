import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
declare const prismaClientSingleton: () => PrismaClient<{
    datasources: {
        db: {
            url: string;
        };
    };
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}
declare const prisma: PrismaClient<{
    datasources: {
        db: {
            url: string;
        };
    };
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export default prisma;
export { prisma };
export * from '@prisma/client';
export { PrismaClient, user_role_enum, user_status_enum } from '@prisma/client';
//# sourceMappingURL=index.d.ts.map