import { FastifyInstance } from 'fastify';
import { GuruService } from '../intelligence/guru.service';
import { FamilyService } from '../intelligence/family.service';
import { HarmonyService } from '../intelligence/harmony.service';
import { CommunityService } from '../intelligence/community.service';
import { AdaptiveService } from '../intelligence/adaptive.service';
import { DharmaTimelineService } from '../intelligence/dharma-timeline.service';
import { GovernanceService } from '../intelligence/governance.service';
import { AuthService } from '../services/auth.service';
import { IntegrationRegistry } from '../integrations/registry';

/**
 * 🧠 Intelligence & Guidance Routes
 * Responsibility: Expose unified Guru guidance, specialized analytics, adaptive state, longitudinal timelines, and ethical governance.
 */
export default async function intelligenceRoutes(fastify: FastifyInstance) {
  const emailService = IntegrationRegistry.getEmailService();
  const authService = new AuthService(fastify.prisma, emailService);
  const guruService = new GuruService(fastify.prisma);
  const familyService = new FamilyService(fastify.prisma);
  const harmonyService = new HarmonyService(fastify.prisma);
  const communityService = new CommunityService(fastify.prisma);
  const adaptiveService = new AdaptiveService(fastify.prisma);
  const timelineService = new DharmaTimelineService(fastify.prisma);
  const governanceService = new GovernanceService(fastify.prisma);

  /**
   * GET /guru
   * Orchestrate unified institutional guidance (Guru Engine).
   */
  fastify.get('/guru', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const guidance = await guruService.getUnifiedGuidance(seeker.id);
      return reply.send(guidance);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * GET /timeline
   * Retrieve the longitudinal Dharma Timeline (Past, Present, Future) for the seeker.
   */
  fastify.get('/timeline', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const timeline = await timelineService.getTimeline(seeker.id);
      return reply.send(timeline);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * GET /governance
   * Retrieve the current ethical governance status, active violations, and restorative actions.
   */
  fastify.get('/governance', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const status = await governanceService.getGovernanceStatus(seeker.id);
      return reply.send(status);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * GET /adaptive
   * Retrieve the current adaptive state and guidance weights for the seeker.
   */
  fastify.get('/adaptive', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const adaptiveState = await adaptiveService.computeAdjustments(seeker.id);
      return reply.send(adaptiveState);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * POST /feedback
   * Record seeker feedback on a specific guidance type.
   */
  fastify.post('/feedback', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const { guidance_type, rating, outcome } = request.body as { guidance_type: string, rating: number, outcome?: string };

    try {
      const seeker = await authService.validateToken(token);
      const feedback = await fastify.prisma.guidance_feedback.create({
        data: {
          user_id: seeker.id,
          guidance_type,
          rating,
          outcome
        }
      });
      return reply.send(feedback);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session or data' });
    }
  });

  /**
   * GET /family/:id
   * Orchestrate collective family intelligence.
   */
  fastify.get('/family/:id', async (request, reply) => {
    const { id: familyId } = request.params as { id: string };
    
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    try {
      const dashboard = await familyService.getFamilyDashboard(familyId);
      return reply.send(dashboard);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  });

  /**
   * GET /alignment/:familyId
   * Orchestrate detailed relational harmony and alignment analysis.
   */
  fastify.get('/alignment/:familyId', async (request, reply) => {
    const { familyId } = request.params as { familyId: string };
    
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    try {
      const analysis = await harmonyService.analyzeFamilyHarmony(familyId);
      return reply.send(analysis);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  });

  /**
   * GET /community/:communityId
   * Orchestrate collective Dharmic health analysis for a specific community.
   */
  fastify.get('/community/:communityId', async (request, reply) => {
    const { communityId } = request.params as { communityId: string };
    
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    try {
      const health = await communityService.analyzeCommunityHealth(communityId);
      return reply.send(health);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  });
}
