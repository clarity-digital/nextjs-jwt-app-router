import "next-auth";
import type { User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
    accessToken?: string;
  }

  interface User {
    name: string;
    email: string;
    email_verified_at: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    accessToken: string;
    accessTokenExpires: number;
  }
}
