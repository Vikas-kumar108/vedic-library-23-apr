import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import cors from '@fastify/cors';
import prismaPlugin from './plugins/prisma';
import libraryRoutes from './routes/library.routes';
import authRoutes from './routes/auth';
import discoveryRoutes from './routes/discovery.routes';
const fastify = Fastify({
    logger: true,
}).withTypeProvider();
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
// Register Plugins
await fastify.register(cors);
await fastify.register(prismaPlugin);
await fastify.register(libraryRoutes, { prefix: '/library' });
await fastify.register(authRoutes, { prefix: '/auth' });
await fastify.register(discoveryRoutes, { prefix: '/discovery' });
// Health Check
fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});
// Start Server
const start = async () => {
    try {
        await fastify.listen({ port: 4444, host: '0.0.0.0' });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
