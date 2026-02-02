import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // 1) Try database
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (user) {
            const passwordMatch = await bcrypt.compare(credentials.password, user.password)
            if (!passwordMatch) return null
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          }
        } catch (error) {
          console.error("DB auth failed, falling back to env admin:", error)
        }

        // 2) Fallback env admin (works even if DB is down)
        const envUser = process.env.ADMIN_USER
        const envPass = process.env.ADMIN_PASS
        if (envUser && envPass && credentials.email === envUser && credentials.password === envPass) {
          return {
            id: "env-admin",
            email: envUser,
            name: "Admin",
            role: "ADMIN"
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/admin/login"
  }
}



