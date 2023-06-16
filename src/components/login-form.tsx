"use client";

import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    signIn("credentials", { ...credentials, callbackUrl });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue="john@avocado-media.nl"
        />

        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue="password"
        />

        <button type="submit">Login</button>
      </form>

      <FormError error={error} />
    </>
  );
}

function FormError({ error }: { error: string | null }) {
  if (!error) return null;

  const errorMessages: { [key: string]: string } = {
    CredentialsSignin: "Invalid credentials",
    Default: "Default Error Message",
  };

  return <p>{errorMessages[error]}</p>;
}
