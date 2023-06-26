"use client";

import { Input } from "@/components/ui/input";
import fetchClient from "@/lib/fetch-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function PasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      formData.set("token", searchParams.get("token") || "");

      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/reset-password",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      router.push("/login");
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json();

        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(`[name="${errorKey}"]`) as HTMLInputElement;
          input.setCustomValidity(response.errors[errorKey]);
          input.reportValidity();
        });
      }

      throw new Error("An error has occurred during password reset request");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={searchParams.get("email") || ""}
      />

      <label htmlFor="password">Password</label>
      <Input
        id="password"
        name="password"
        type="password"
        defaultValue="password"
      />

      <label htmlFor="password_confirmation">Password confirmation</label>
      <Input
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        defaultValue="password"
      />

      <button type="submit">Reset password</button>
    </form>
  );
}
