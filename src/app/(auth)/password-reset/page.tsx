import PasswordResetForm from "@/components/PasswordResetForm";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Password reset</h1>

      <PasswordResetForm />

      <Link href="/login">Login</Link>
    </main>
  );
}
