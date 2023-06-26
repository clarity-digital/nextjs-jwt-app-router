import PasswordResetForm from "@/components/password-reset-form";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Password reset</h1>

      <PasswordResetForm />

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
