"use client";

import { signIn } from "next-auth/react";

type Props = {
  callbackUrl?: string;
};

export default function LoginForm({ callbackUrl = "/" }: Props) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData);

    signIn("credentials", { ...credentials, callbackUrl });
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>Email</label>
      <input
        name="email"
        type="email"
        defaultValue="sjors@avocado-media.nl"
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        defaultValue="password"
      />

      <button type="submit">Sign in</button>
    </form>
  );
}
