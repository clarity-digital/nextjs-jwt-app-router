import ForgotPasswordForm from "@/components/ForgotPasswordForm/ForgotPasswordForm";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Forgot password</h1>

      <ForgotPasswordForm />

      <Link href="/login">Login</Link>
    </main>
  );
}
