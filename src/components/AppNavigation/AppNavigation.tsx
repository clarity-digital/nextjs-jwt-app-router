import { SignInButton } from "@/components/AuthButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AppNavigation() {
  const session = await getServerSession(authOptions);

  return (
    <nav>
      <Link href="/">Logo</Link>

      <ul>
        <li>
          <SignInButton session={session} />
        </li>
      </ul>
    </nav>
  );
}
