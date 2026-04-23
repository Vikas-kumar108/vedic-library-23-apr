import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'vedic-secret-key-108';
export class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(data) {
        const { email, password, name } = data;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                verificationToken,
                roles: [UserRole.student],
            },
        });
        // Mock sending email
        console.log(`📧 [MOCK EMAIL] Verification link for ${email}: /auth/verify?token=${verificationToken}`);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
            message: 'Please verify your email to complete registration'
        };
    }
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({
            where: { verificationToken: token },
        });
        if (!user) {
            throw new Error('Invalid or expired verification token');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
                verificationToken: null,
            },
        });
        return { message: 'Email verified successfully' };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            // Don't reveal user existence for security
            return { message: 'If an account exists, a reset link has been sent' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpires,
            },
        });
        console.log(`📧 [MOCK EMAIL] Password reset link for ${email}: /auth/reset-password?token=${resetToken}`);
        return { message: 'If an account exists, a reset link has been sent' };
    }
    async resetPassword(token, password) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpires: { gt: new Date() },
            },
        });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpires: null,
            },
        });
        return { message: 'Password reset successfully' };
    }
    /**
     * calculateEligibility: The "Adhikāra Engine".
     *
     * Purpose: Determines a user's eligibility level based on Age and Life Stage.
     * Responsibility: Enforces the scientific mapping of maturity to content access levels.
     */
    calculateEligibility(ageGroup, asrama) {
        // Level 1: Child / Early student
        if (ageGroup === 'child_0_5' || ageGroup === 'child_5_10')
            return 1;
        // Level 2: Teen / Brahmacari
        if (ageGroup === 'teen_10_18')
            return 2;
        // Level 5: Mature / Mentor (50+)
        if (ageGroup === 'mid_40_60' || ageGroup === 'senior_60_plus')
            return 5;
        // Level 4: Married (Grihastha)
        if (asrama === 'married')
            return 4;
        // Level 3: Young adult (Pre-marriage)
        return 3;
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id, email: user.email, roles: user.roles }, JWT_SECRET, { expiresIn: '7d' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles,
                emailVerified: user.emailVerified,
            }
        };
    }
}
