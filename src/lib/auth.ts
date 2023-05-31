import jwt from "@/helpers/jwt";
import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
          const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data: { user: User; access_token: string } = await response.json();

          if (!data?.access_token) {
            throw response;
          }

          return { ...data.user, accessToken: data?.access_token };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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

      return session;
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token.accessToken,
      },
    });

    if (!response.ok) throw response;

    const refreshedAccessToken: { access_token: string } = await response.json();
    const { exp } = jwt.decode(refreshedAccessToken.access_token);

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      accessTokenExpires: exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
