import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { demo } from "./server-action/logincheck";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // const user = await authLoginCheck(credentials);
        const res = await demo(credentials);
        console.log("auth res: ", res);
        if (!res.success) {
          throw new CredentialsSignin({
            cause: res.error,
          });
        }
        return res.data;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.verified = user.verified;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string; // Explicitly cast to string
      session.user.id = token.id as string;
      session.user.verified = token.verified as boolean;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        secure: true, // Only secure in production
        sameSite: "none", // Allows cross-site cookies
        path: "/",
      },
    },
  },
});
