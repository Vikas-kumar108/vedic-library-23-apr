import { z } from "zod";

/**
 * REGISTER
 */
export const RegisterInput = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterInputType = z.infer<typeof RegisterInput>;

export const RegisterResponse = z.object({
    id: z.string(),
    email: z.string(),
});

export type RegisterResponseType = z.infer<typeof RegisterResponse>;

/**
 * LOGIN
 */
export const LoginInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginInputType = z.infer<typeof LoginInput>;

export const LoginResponse = z.object({
    token: z.string(),
    user: z.object({
        id: z.string(),
        email: z.string(),
    }),
});

export type LoginResponseType = z.infer<typeof LoginResponse>;

/**
 * FORGOT PASSWORD
 */
export const ForgotPasswordInput = z.object({
    email: z.string().email(),
});

export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordInput>;