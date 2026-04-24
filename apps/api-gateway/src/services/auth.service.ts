import { PrismaClient, UserRole } from '@dharma/data-access'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { InstitutionalEmailService } from '../integrations/adapter.foundation'

const JWT_SECRET = process.env.JWT_SECRET || 'vedic-secret-key-108'

export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private emailService?: InstitutionalEmailService
  ) {}

  async register(data: any) {
    const { email, password, name } = data

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verification_token = crypto.randomBytes(32).toString('hex')

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verification_token,
        roles: [UserRole.student],
        profile: {
          create: { full_name: name }
        }
      },
      include: { profile: true }
    })

    // 🛰️ Send Institutional Verification Email
    if (this.emailService) {
      await this.emailService.sendEmail({
        to: email,
        subject: 'Welcome to the Vedic Gurukulam • Verify Identity',
        body: `Please verify your email using this token: ${verification_token}`,
        html: `
          <div style="font-family: serif; padding: 40px; border: 1px solid #eee; border-radius: 20px;">
            <h2 style="color: #9333ea italic;">Welcome to the Gurukulam</h2>
            <p>Your spiritual journey requires identity verification.</p>
            <a href="${process.env.FRONTEND_URL}/auth/verify?token=${verification_token}" 
               style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">
               Complete Verification
            </a>
          </div>
        `
      })
    }

    return {
      id: user.id,
      email: user.email,
      name: user.profile?.full_name,
      roles: user.roles,
      message: 'Please verify your email to complete registration'
    }
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { verification_token: token },
    })

    if (!user) {
      throw new Error('Invalid or expired verification token')
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verification_token: null,
      },
    })

    return { message: 'Email verified successfully' }
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal user existence for security
      return { message: 'If an account exists, a reset link has been sent' }
    }

    const reset_token = crypto.randomBytes(32).toString('hex')
    const reset_token_expires = new Date(Date.now() + 3600000) // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        reset_token,
        reset_token_expires,
      },
    })

    // 🛰️ Send Institutional Reset Email
    if (this.emailService) {
      await this.emailService.sendEmail({
        to: email,
        subject: 'Password Reset • Vedic Institutional OS',
        body: `Reset your password using this token: ${reset_token}`,
        html: `
          <div style="font-family: serif; padding: 40px; border: 1px solid #eee; border-radius: 20px;">
            <h2 style="color: #9333ea italic;">Identity Recovery</h2>
            <p>A request was made to reset your institutional credentials.</p>
            <a href="${process.env.FRONTEND_URL}/auth/reset-password?token=${reset_token}" 
               style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">
               Reset Password
            </a>
          </div>
        `
      })
    }

    return { message: 'If an account exists, a reset link has been sent' }
  }

  async resetPassword(token: string, password: any) {
    const user = await this.prisma.user.findFirst({
      where: {
        reset_token: token,
        reset_token_expires: { gt: new Date() },
      },
    })

    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      },
    })

    return { message: 'Password reset successfully' }
  }

  /**
   * calculateEligibility: The "Adhikāra Engine".
   * 
   * Purpose: Determines a user's eligibility level based on Age and Life Stage.
   * Responsibility: Enforces the scientific mapping of maturity to content access levels.
   */
  private calculateEligibility(ageGroup: string, asrama: string): number {
    // Level 1: Child / Early student
    if (ageGroup === 'child_0_5' || ageGroup === 'child_5_10') return 1
    
    // Level 2: Teen / Brahmacari
    if (ageGroup === 'teen_10_18') return 2
    
    // Level 5: Mature / Mentor (50+)
    if (ageGroup === 'mid_40_60' || ageGroup === 'senior_60_plus') return 5
    
    // Level 4: Married (Grihastha)
    if (asrama === 'married') return 4
    
    // Level 3: Young adult (Pre-marriage)
    return 3
  }

  async login(data: any) {
    const { email, password } = data

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, user.password || '')
    if (!isMatch) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.full_name,
        roles: user.roles,
        emailVerified: user.emailVerified,
      }
    }
  }
}
