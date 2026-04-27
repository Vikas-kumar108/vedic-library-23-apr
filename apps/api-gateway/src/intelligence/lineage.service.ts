import { PrismaClient } from '@dharma/data-access';

export type LineageMember = {
  id: string;
  name: string;
  relation?: string;
  role?: string;
};

export type LineageView = {
  family: {
    parents: LineageMember[];
    children: LineageMember[];
    spouse?: LineageMember;
  };
  mentorship: {
    current_mentor?: LineageMember;
    students: LineageMember[];
  };
  parampara_chain: { guru: string; level: number }[];
};

/**
 * 🌳 Lineage Intelligence Service
 * Responsibility: Provide a reverent view of the seeker's biological and spiritual heritage.
 */
export class LineageService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getLineageView: Reconstructs the seeker's multifaceted connections with institutional reverence.
   */
  async getLineageView(userId: string): Promise<LineageView> {
    const prisma = this.prisma;

    // 1. Fetch Family Connections
    const familyLineage = await prisma.family_lineage.findMany({
      where: { 
        OR: [
          { parent_id: userId },
          { child_id: userId }
        ]
      },
      include: {
        parent: { include: { profile: true } },
        child: { include: { profile: true } }
      }
    });

    const parents: LineageMember[] = [];
    const children: LineageMember[] = [];
    let spouse: LineageMember | undefined;

    familyLineage.forEach(f => {
      const isParentInDB = f.parent_id === userId;
      const other = isParentInDB ? f.child : f.parent;
      const member = {
        id: other.id,
        name: other.profile?.full_name || 'Seeker',
        relation: f.relation_type
      };

      if (f.relation_type === 'parent') {
        if (f.child_id === userId) parents.push(member);
        else if (f.parent_id === userId) children.push(member);
      } else if (f.relation_type === 'child') {
         if (f.parent_id === userId) children.push(member);
         else if (f.child_id === userId) parents.push(member);
      } else if (f.relation_type === 'spouse') {
        spouse = member;
      }
    });

    // 2. Fetch Guidance Chain (Mentorship)
    const mentorRelations = await prisma.mentor_lineage.findMany({
      where: {
        OR: [
          { mentor_id: userId },
          { student_id: userId }
        ],
        active: true
      },
      include: {
        mentor: { include: { profile: true } },
        student: { include: { profile: true } }
      }
    });

    const mentorData = mentorRelations.find(m => m.student_id === userId);
    const current_mentor = mentorData ? {
      id: mentorData.mentor_id,
      name: mentorData.mentor.profile?.full_name || 'Guide',
      role: 'guide'
    } : undefined;

    const students: LineageMember[] = mentorRelations
      .filter(m => m.mentor_id === userId)
      .map(m => ({
        id: m.student_id,
        name: m.student.profile?.full_name || 'Seeker',
        role: 'seeker'
      }));

    // 3. Recursive Heritage Chain (Parampara)
    const parampara_chain: { guru: string; level: number }[] = [];
    let currentId: string | null = userId;
    let depth = 0;
    const MAX_DEPTH = 10;

    while (currentId && depth < MAX_DEPTH) {
      const entry = await prisma.parampara_lineage.findFirst({
        where: { disciple_id: currentId }
      });

      if (entry) {
        parampara_chain.push({
          guru: entry.guru_name,
          level: entry.level
        });
        currentId = entry.parent_id; 
        depth++;
      } else {
        currentId = null;
      }
    }

    return {
      family: { parents, children, spouse },
      mentorship: { current_mentor, students },
      parampara_chain
    };
  }
}
