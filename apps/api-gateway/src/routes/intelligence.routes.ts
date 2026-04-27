import { FastifyInstance } from 'fastify';
import { GuidanceService } from '../intelligence/guidance.service';
import { FamilyService } from '../intelligence/family.service';
import { HarmonyService } from '../intelligence/harmony.service';
import { MentorService } from '../intelligence/mentor.service';
import { SamskaraService } from '../intelligence/samskara.service';
import { LineageService } from '../intelligence/lineage.service';
import { CommunityService } from '../intelligence/community.service';
import { JyotishService } from '../intelligence/jyotish.service';
import { KarmaService } from '../intelligence/karma.service';
import { AuthService } from '../services/auth.service';
import { IntegrationRegistry } from '../integrations/registry';

/**
 * 🧠 Intelligence & Guidance Routes
 * Responsibility: Expose spiritual guidance, family analytics, harmony detection, mentorship, samskaras, lineage, community, jyotish, and karma endpoints.
 */
export default async function intelligenceRoutes(fastify: FastifyInstance) {
  const emailService = IntegrationRegistry.getEmailService();
  const authService = new AuthService(fastify.prisma, emailService);
  const guidanceService = new GuidanceService(fastify.prisma);
  const familyService = new FamilyService(fastify.prisma);
  const harmonyService = new HarmonyService(fastify.prisma);
  const mentorService = new MentorService(fastify.prisma);
  const samskaraService = new SamskaraService(fastify.prisma);
  const lineageService = new LineageService(fastify.prisma);
  const communityService = new CommunityService(fastify.prisma);
  const jyotishService = new JyotishService(fastify.prisma);
  const karmaService = new KarmaService(fastify.prisma);

  /**
   * GET /guidance
   * Orchestrate personalized spiritual direction.
   */
  fastify.get('/guidance', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const guidance = await guidanceService.getGuidance(seeker.id);
      return reply.send(guidance);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
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
   * GET /mentor
   * Orchestrate personalized mentorship analysis for the current user.
   */
  fastify.get('/mentor', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const mentorship = await mentorService.determineMentorshipNeeds(seeker.id);
      return reply.send(mentorship);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * GET /samskara
   * Orchestrate life-stage milestone analysis for the current user.
   */
  fastify.get('/samskara', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const timeline = await samskaraService.getSamskaraTimeline(seeker.id);
      return reply.send(timeline);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * GET /lineage
   * Orchestrate biological and spiritual lineage analysis for the current user.
   */
  fastify.get('/lineage', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const lineage = await lineageService.getLineageView(seeker.id);
      return reply.send(lineage);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
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

  /**
   * GET /jyotish
   * Orchestrate life-phase analysis for the current user.
   */
  fastify.get('/jyotish', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const phase = await jyotishService.getCurrentLifePhase(seeker.id);
      return reply.send(phase);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });

  /**
   * GET /karma
   * Orchestrate behavioral pattern analysis for the current user.
   */
  fastify.get('/karma', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const seeker = await authService.validateToken(token);
      const analysis = await karmaService.analyzeKarma(seeker.id);
      return reply.send(analysis);
    } catch (error: any) {
      return reply.code(401).send({ error: 'Invalid session' });
    }
  });
}
