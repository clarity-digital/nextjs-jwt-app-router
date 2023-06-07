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
      </ul>
    </nav>
  );
}
