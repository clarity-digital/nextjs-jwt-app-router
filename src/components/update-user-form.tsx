"use client";

import { Input } from "@/components/ui/input";
import fetchClient from "@/lib/fetch-client";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UpdateUserFormProps {
  user?: User;
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const router = useRouter();
  const { update } = useSession();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      const user = await response.json();
      await update(user);

      router.refresh();
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

      throw new Error("An error has occurred during update user request");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={user?.name}
      />

      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={user?.email}
      />

      <button type="submit">Update user</button>
    </form>
  );
}
