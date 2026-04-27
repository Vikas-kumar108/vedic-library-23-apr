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
  ) { 
    console.log("DB URL:", process.env.DATABASE_URL)
  }

  /**
   * [IDENTITY MIGRATION GATEWAY]
   * Dynamically resolves the User delegate based on the migration toggle.
   */
  private get userStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';

    if (isIdentityEnabled) {
      return this.prisma.users;
    }

    return (this.prisma as any).legacy_users;
  }

  /**
   * [IDENTITY MIGRATION GATEWAY]
   * Dynamically resolves the Profile delegate based on the migration toggle.
   */
  private get profileStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';

    if (isIdentityEnabled) {
      return this.prisma.user_profiles;
    }

    return (this.prisma as any).legacy_user_profiles;
  }

  private get preferenceStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) {
      return this.prisma.user_preferences;
    }
    return (this.prisma as any).legacy_user_preferences;
  }

  private get spiritualProfileStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) {
      return this.prisma.spiritual_profiles;
    }
    return (this.prisma as any).legacy_spiritual_profiles;
  }

  private get statisticsStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) {
      return this.prisma.user_statistics;
    }
    return (this.prisma as any).legacy_user_statistics;
  }

  async register(data: any) {
    try {
      const { email, password, name } = data

      // Check existence using toggled store
      const existingUser = await this.userStore.findUnique({
        where: { email },
      })

      if (existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const verification_token = crypto.randomBytes(32).toString('hex')

      // [SCHEMA STABILITY]: Create user in the active schema
      const user = await this.userStore.create({
        data: {
          email,
          password: hashedPassword,
          verification_token,
          roles: ['student'],
        }
      })


      // [SCHEMA STABILITY]: Create profile in the SAME active schema
      // This prevents the Foreign Key violation where an identity user tries 
      // to link to a public profile.
      await this.profileStore.upsert({
        where: { user_id: user.id },
        update: {
          full_name: name
        },
        create: {
          user_id: user.id,
          full_name: name
        }
      })

      await this.preferenceStore.upsert({
        where: { user_id: user.id },
        update: {},
        create: { user_id: user.id }
      })

      await this.spiritualProfileStore.upsert({
        where: { user_id: user.id },
        update: {},
        create: { user_id: user.id }
      })

      await this.statisticsStore.upsert({
        where: { user_id: user.id },
        update: {},
        create: { user_id: user.id }
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
        // Use local 'name' since profile write was decoupled from user creation
        name: name,
        roles: user.roles,
        message: 'Please verify your email to complete registration'
      }
    } catch (error) {
      // [TEMPORARY DEBUG LOGGING]: Expose the real backend error
      console.error("REGISTER ERROR:", error)
      throw error
    }
  }

  async verifyEmail(token: string) {
    const user = await this.userStore.findFirst({
      where: { verification_token: token },
    })

    if (!user) {
      throw new Error('Invalid or expired verification token')
    }

    await this.userStore.update({
      where: { id: user.id },
      data: {
        email_verified: new Date(),
        verification_token: null,
      },
    })

    return { message: 'Email verified successfully' }
  }

  async forgotPassword(email: string) {
    const user = await this.userStore.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal user existence for security
      return { message: 'If an account exists, a reset link has been sent' }
    }

    const reset_token = crypto.randomBytes(32).toString('hex')
    const reset_token_expires = new Date(Date.now() + 3600000) // 1 hour

    await this.userStore.update({
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
    const user = await this.userStore.findFirst({
      where: {
        reset_token: token,
        reset_token_expires: { gt: new Date() },
      },
    })

    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userStore.update({
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

    console.log("LOGIN TOGGLE:", process.env.IDENTITY_SCHEMA_ENABLED)

    const user = await this.userStore.findUnique({
      where: { email },
      include: { user_profiles: true }
    })

    console.log("USER PASSWORD:", user?.password)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    if (user.account_locked_until && user.account_locked_until > new Date()) {
      throw new Error(`Account locked. Please try again after ${user.account_locked_until.toLocaleTimeString()}`)
    }

    const isMatch = await bcrypt.compare(password, user.password || '')

    console.log("PASSWORD MATCH:", isMatch)

    if (!isMatch) {
      const failed_attempts = (user.failed_login_attempts || 0) + 1
      const isLockout = failed_attempts >= 5

      await this.userStore.update({
        where: { id: user.id },
        data: {
          failed_login_attempts: failed_attempts,
          account_locked_until: isLockout ? new Date(Date.now() + 30 * 60000) : null
        }
      })

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

    await this.userStore.update({
      where: { id: user.id },
      data: {
        failed_login_attempts: 0,
        account_locked_until: null,
        last_active: new Date()
      }
    })

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
      const user = await this.userStore.findUnique({
        where: { id: decoded.userId },
        include: { 
          user_profiles: true,
          spiritual_profiles: true,
          user_statistics: true
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      // [SHADOW READ]: Consistency check for identity migration
      if (process.env.IDENTITY_SCHEMA_ENABLED !== 'true') {
        const identityUser = await (this.prisma as any).users?.findUnique({
          where: { id: user.id },
          include: { spiritual_profiles: true }
        }).catch(() => null)
        if (!identityUser) console.warn(`[IDENTITY] Shadow mismatch for ${user.id}`)
      }

      return {
        id: user.id,
        email: user.email,
        name: user.user_profiles?.full_name,
        avatar: user.user_profiles?.avatar_url,
        roles: user.roles,
        email_verified: user.email_verified,
        
        // ✨ Seeker Context: Spiritual Profile
        spiritual_profile: user.spiritual_profiles ? {
          life_stage: user.spiritual_profiles.life_stage,
          inner_state: user.spiritual_profiles.inner_state,
          eligibility_level: user.spiritual_profiles.eligibility_level,
          current_focus: user.spiritual_profiles.current_focus,
          current_primary_node_id: user.spiritual_profiles.current_primary_node_id,
          last_guided_at: user.spiritual_profiles.last_guided_at
        } : null,

        // 📈 Seeker Context: Statistics
        statistics: {
          nodes_read_count: user.user_statistics?.nodes_read_count || 0,
          courses_completed: user.user_statistics?.courses_completed || 0
        }
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
