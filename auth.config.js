import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  trustHost: true, 
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            cache: "no-store",
          });

          if (!response.ok) {
            console.error("Backend auth failed with status:", response.status);
            return null; 
          }

          const user = await response.json();
          if (user) return user;
          return null;
        } catch (error) {
          console.error("Auth error in authorize function:", error);
          return null; 
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      }

      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          ...session.user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.id = token.id;
      session.user = {
        ...session.user,
        ...token.user,
      };
      return session;
    },
  },
});