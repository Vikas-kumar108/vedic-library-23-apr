import { PrismaClient, user_role_enum } from '@dharma/data-access'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { InstitutionalEmailService } from '../integrations/adapter.foundation'

const JWT_SECRET = process.env.JWT_SECRET || 'vedic-secret-key-108'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private emailService?: InstitutionalEmailService
  ) {}

  async register(data: any) {
    const { email, password, name } = data

    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verification_token = crypto.randomBytes(32).toString('hex')

    const user = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        verification_token,
        roles: ['student'],
        user_profiles: {
          create: { full_name: name }
        }
      },
      include: { user_profiles: true }
    })

    // 🛰️ Send Institutional Verification Email
    if (this.emailService) {
      const verificationLink = `${FRONTEND_URL}/auth/verify?token=${verification_token}`
      console.log(`\n📧 NEW SEEKER INITIATION LINK:`)
      console.log(`🔗 ${verificationLink}\n`)

      await this.emailService.sendEmail({
        to: email,
        subject: 'Welcome to the Vedic Gurukulam • Verify Identity',
        body: `Please verify your email using this token: ${verification_token}`,
        html: `
          <div style="font-family: serif; padding: 40px; border: 1px solid #eee; border-radius: 20px;">
            <h2 style="color: #9333ea italic;">Welcome to the Gurukulam</h2>
            <p>Your spiritual journey requires identity verification.</p>
            <a href="${verificationLink}" 
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
      name: user.user_profiles?.full_name,
      roles: user.roles,
      message: 'Please verify your email to complete registration'
    }
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.users.findFirst({
      where: { verification_token: token },
    })

    if (!user) {
      throw new Error('Invalid or expired verification token')
    }

    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        email_verified: new Date(),
        verification_token: null,
      },
    })

    return { message: 'Email verified successfully' }
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal user existence for security
      return { message: 'If an account exists, a reset link has been sent' }
    }

    const reset_token = crypto.randomBytes(32).toString('hex')
    const reset_token_expires = new Date(Date.now() + 3600000) // 1 hour

    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        reset_token,
        reset_token_expires,
      },
    })

    // 🛰️ Send Institutional Reset Email
    if (this.emailService) {
      const resetLink = `${FRONTEND_URL}/auth/reset-password?token=${reset_token}`
      console.log(`\n🔑 IDENTITY RECOVERY LINK GENERATED:`)
      console.log(`🔗 ${resetLink}\n`)

      await this.emailService.sendEmail({
        to: email,
        subject: 'Password Reset • Vedic Institutional OS',
        body: `Reset your password using this token: ${reset_token}`,
        html: `
          <div style="font-family: serif; padding: 40px; border: 1px solid #eee; border-radius: 20px;">
            <h2 style="color: #9333ea italic;">Identity Recovery</h2>
            <p>A request was made to reset your institutional credentials.</p>
            <a href="${resetLink}" 
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
    const user = await this.prisma.users.findFirst({
      where: {
        reset_token: token,
        reset_token_expires: { gt: new Date() },
      },
    })

    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      },
    })

    return { message: 'Password reset successfully' }
  }

  async login(data: any) {
    const { email, password } = data

    const user = await this.prisma.users.findUnique({
      where: { email },
      include: { user_profiles: true }
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // 1. Check for Account Lockout
    if (user.account_locked_until && user.account_locked_until > new Date()) {
      throw new Error(`Account locked. Please try again after ${user.account_locked_until.toLocaleTimeString()}`)
    }

    const isMatch = await bcrypt.compare(password, user.password || '')
    
    if (!isMatch) {
      // 2. Handle Failed Attempt
      const failed_attempts = (user.failed_login_attempts || 0) + 1
      const isLockout = failed_attempts >= 5
      
      await this.prisma.users.update({
        where: { id: user.id },
        data: {
          failed_login_attempts: failed_attempts,
          account_locked_until: isLockout ? new Date(Date.now() + 30 * 60000) : null // 30 mins lockout
        }
      })

      // 3. Log Security Incident
      await this.prisma.audit_logs.create({
        data: {
          action: 'LOGIN_FAILED',
          performed_by_id: user.id,
          module: 'AUTH',
          old_data: { attempts: failed_attempts }
        }
      })

      throw new Error(isLockout ? 'Too many failed attempts. Account locked for 30 minutes.' : 'Invalid credentials')
    }

    // 4. Reset Failed Attempts on Success
    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        failed_login_attempts: 0,
        account_locked_until: null,
        last_active: new Date()
      }
    })

    // 5. Log Successful Login
    await this.prisma.audit_logs.create({
      data: {
        action: 'LOGIN_SUCCESS',
        performed_by_id: user.id,
        module: 'AUTH'
      }
    })

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_profiles?.full_name,
        roles: user.roles,
        email_verified: user.email_verified,
      }
    }
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const user = await this.prisma.users.findUnique({
        where: { id: decoded.userId },
        include: { user_profiles: true }
      })

      if (!user) {
        throw new Error('User not found')
      }

      return {
        id: user.id,
        email: user.email,
        name: user.user_profiles?.full_name,
        roles: user.roles,
        email_verified: user.email_verified,
      }
    } catch (error) {
      throw new Error('Invalid or expired token')
    }
  }

  async logout(userId: string) {
    // Log the event
    await this.prisma.audit_logs.create({
      data: {
        action: 'LOGOUT',
        performed_by_id: userId,
        module: 'AUTH'
      }
    })
  }
}
