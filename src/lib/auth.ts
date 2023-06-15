import jwt from "@/helpers/jwt";
import authService from "@/services/auth";

import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type CallbackOptions = {
  forceRefresh?: boolean;
};

export const authOptions = (callbackOptions?: CallbackOptions): NextAuthOptions => ({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await authService().login(credentials);

          if (!response.ok) {
            throw response;
          }

          const data: { user: User; access_token: string } = await response.json();

          if (!data?.access_token) {
            throw response;
          }

          return { ...data.user, accessToken: data?.access_token };
        } catch (error) {
          if (error instanceof Response) {
            return null;
          }

          throw new Error("An error has occurred during login request");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" || callbackOptions?.forceRefresh) {
        try {
          const response = await authService().getUser(token.accessToken);

          if (!response.ok) {
            throw response;
          }

          const user = await response.json();

          return { ...token, ...session, ...user };
        } catch (error) {
          return { ...token, ...session };
        }
      }

      if (user) {
        return { ...token, ...user };
      }

      const { exp: accessTokenExpires } = jwt.decode(token.accessToken);

      if (!accessTokenExpires) {
        return token;
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

      if (!accessTokenHasExpired) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.error) {
        throw new Error("Refresh token has expired");
      }

      session.accessToken = token.accessToken;
      session.user.name = token.name || "";
      session.user.email = token.email || "";
      session.user.email_verified_at = token.email_verified_at;

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await authService().logout(token.accessToken);
    },
  },
});

async function refreshAccessToken(token: JWT) {
  try {
    const response = await authService().refresh(token.accessToken);

    if (!response.ok) throw response;

    const refreshedAccessToken: { access_token: string } = await response.json();
    const { exp } = jwt.decode(refreshedAccessToken.access_token);

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
