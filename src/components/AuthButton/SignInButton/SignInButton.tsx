"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>...</>;
  }

  if (!session) {
    return <Link href="/login">Login</Link>;
  }

  return <Link href="/dashboard">{session?.user?.name}</Link>;
}
