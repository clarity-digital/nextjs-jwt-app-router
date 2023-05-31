import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Register</h1>

      <RegisterForm />

      <Link href="/login">Inloggen</Link>
    </main>
  );
}
