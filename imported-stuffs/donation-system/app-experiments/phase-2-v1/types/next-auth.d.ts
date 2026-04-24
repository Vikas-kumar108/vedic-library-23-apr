import { DefaultSession } from "next-auth"

// Import the role types from our user model
type UserRole = "donor" | "auditor" | "csr_partner" | "ca" | "director" | "super_admin"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      canAccessAdmin: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
  }
}
