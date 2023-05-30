import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
    <main>
      <h1>Login</h1>

      <LoginForm callbackUrl="/dashboard" />
    </main>
  );
}
