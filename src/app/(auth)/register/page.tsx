import RegisterForm from "@/components/register-form";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Register</h1>

      <RegisterForm />

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
