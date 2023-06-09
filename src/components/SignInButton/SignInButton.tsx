import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import Link from "next/link";

export default async function SignInButton() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Link href="/login">Login</Link>;
  }

  return <Link href="/dashboard">{session?.user?.name}</Link>;
}
