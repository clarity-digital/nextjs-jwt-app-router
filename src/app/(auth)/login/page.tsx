import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Login</h1>

      <LoginForm />

      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/forgot-password">Forgot password</Link>
        </li>
      </ul>
    </>
  );
}
