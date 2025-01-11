
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const { auth, signIn, signOut, handlers} = NextAuth({
    session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name:"credentials",
      async authorize(credentials) {
     
        if (!credentials) return null;

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) throw new Error("Invalid credentials");
          
          const user = await response.json();
          if (user) return user;
          return null;
        } catch (error) {
            throw new Error(error)
        }
      },
    }),
 
  ],
  callbacks: {
    async jwt({ token, user ,trigger, session}) {
     
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
          ...token.user,  // Retain existing token data
          ...session.user, // Merge updated user data
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
    }
  }
  
});

