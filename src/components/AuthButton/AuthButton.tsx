"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return <Link href="/dashboard">{session?.user?.name}</Link>;
  }

  return (
    <button
      type="button"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
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
