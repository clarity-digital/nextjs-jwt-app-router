"use client";

import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignInButton({ session }: { session: Session | null }) {
  if (!session) {
    return <Link href="/login">Sign in</Link>;
  }

  return <Link href="/dashboard">{session?.user?.name}</Link>;
}

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
