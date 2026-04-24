import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectToDatabase } from "./db"
import { User } from "./models/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password")
        }

        await connectToDatabase()

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        )

        if (!user) {
          throw new Error("Invalid email or password")
        }

        const isValid = await user.comparePassword(credentials.password as string)

        if (!isValid) {
          throw new Error("Invalid email or password")
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "user" | "admin"
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
