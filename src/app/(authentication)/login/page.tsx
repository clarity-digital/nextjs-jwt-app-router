import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Login</h1>

      <LoginForm />

      <Link href="/register">Register</Link>
      <Link href="/forgot-password">Forgot password</Link>
    </main>
  );
}
