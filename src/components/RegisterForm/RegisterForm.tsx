"use client";

import authService from "@/services/authService";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await authService().register(formData);

      if (!response.ok) {
        throw response;
      }

      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      signIn("credentials", credentials);
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

      throw new Error("An error has occurred during registration request");
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>name</label>
      <input
        name="name"
        type="text"
        defaultValue="John Doe"
      />

      <label>Email</label>
      <input
        name="email"
        type="email"
        defaultValue="john@avocado-media.nl"
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        defaultValue="password"
      />

      <label>Password confirmation</label>
      <input
        name="password_confirmation"
        type="password"
        defaultValue="password"
      />

      <button type="submit">Register</button>
    </form>
  );
}
