import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "database" }, // Ensures we use the adapter to store sessions
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // This helps ensure the profile data maps correctly to the User model
      allowDangerousEmailAccountLinking: true, 
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // In database strategy, 'user' is the record from your Postgres DB
      if (session.user && user) {
        session.user.id = user.id
      }
      return session
    },
  },
})