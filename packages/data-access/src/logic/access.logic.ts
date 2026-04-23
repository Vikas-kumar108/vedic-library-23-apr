import { User, Node, ContentAccessRule, UserRole, LifeStage, GuidanceLevel } from '@prisma/client'

/**
 * Vedic-Aware Access Algorithm
 * Responsibility: Calculate access based on Role + Attribute + Relationship + Content Rules.
 * Formula: Access = Role + Life Stage + Guidance Level + Relationship + Content Rules
 */
export async function canAccessNode(
  user: Partial<User> & { roles: UserRole[] },
  node: Partial<Node> & { accessRules?: ContentAccessRule[] },
  relationship?: { isGuide: boolean; isTeacher: boolean }
): Promise<{ canAccess: boolean; reason?: string }> {
  
  // LEVEL 1: SUPER ADMIN BYPASS
  if (user.roles.includes('admin')) {
    return { canAccess: true }
  }

  // LEVEL 3: RELATIONSHIP-BASED ACCESS
  // Mentors can see their student's content/progress
  if (relationship?.isGuide) {
    return { canAccess: true }
  }

  // LEVEL 4: CONTENT ACCESS RULES (RBAC + ABAC)
  const rules = node.accessRules || []
  
  // If no restrictions, access is granted (Universal Content)
  if (rules.length === 0 || rules.every(r => !r.isRestricted)) {
    return { canAccess: true }
  }

  for (const rule of rules) {
    // 1. Role Check (RBAC)
    const roleMatch = rule.allowedRoles.length === 0 || 
                      rule.allowedRoles.some(r => user.roles.includes(r))
    
    // 2. Life Stage Check (ABAC)
    const stageMatch = rule.allowedLifeStages.length === 0 || 
                       (user.lifeStage && rule.allowedLifeStages.includes(user.lifeStage))
    
    // 3. Guidance Level Check (ABAC)
    // const guidanceMatch = rule.allowedGuidanceLevels.length === 0 || 
    //                       (user.guidanceLevel && rule.allowedGuidanceLevels.includes(user.guidanceLevel))

    if (roleMatch && stageMatch) {
      return { canAccess: true }
    }
  }

  return { 
    canAccess: false, 
    reason: node.accessRules?.[0]?.messageIfLocked || 'This content is restricted based on your current life stage or guidance level.' 
  }
}

/**
 * Relationship Access Check
 * Responsibility: Verify if a mentor/teacher has a valid connection to a student.
 */
export function hasRelationship(mentorId: string, studentId: string, assignments: any[]): boolean {
  return assignments.some(a => a.guideId === mentorId && a.studentId === studentId)
}
