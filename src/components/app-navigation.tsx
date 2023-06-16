import { SignInButton } from "@/components/auth-button";
import Link from "next/link";

export function AppNavigation() {
  return (
    <nav>
      <Link href="/">Logo</Link>

      <ul>
        <li>
          <SignInButton />
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
