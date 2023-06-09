import { SignInButton } from "@/components/AuthButton";
import Link from "next/link";

export default function AppNavigation() {
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
