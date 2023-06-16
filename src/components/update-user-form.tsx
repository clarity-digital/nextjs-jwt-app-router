"use client";

import { Input } from "@/components/ui/input";
import authService from "@/services/auth";
import { useSession } from "next-auth/react";

export default function UpdateUserForm() {
  const { data: session, update } = useSession();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await authService().updateUser(formData);

      if (!response.ok) {
        throw response;
      }

      const user = await response.json();
      await update(user);
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
        defaultValue={session?.user?.name}
      />

      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={session?.user?.email}
      />

      <button type="submit">Update user</button>
    </form>
  );
}
