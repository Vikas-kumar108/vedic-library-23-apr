import fp from 'fastify-plugin';
import prismaInstance from '@dharma/data-access';
export default fp(async (fastify) => {
    // Handle ESM interop if needed
    const actualPrisma = prismaInstance.default || prismaInstance;
    console.log('REGISTERING PRISMA PLUGIN, PRISMA CLIENT:', !!actualPrisma);
    fastify.decorate('prisma', actualPrisma);
    fastify.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });
});
