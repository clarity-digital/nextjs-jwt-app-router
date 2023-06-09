"use client";

import Input from "@/components/ui/Input";
import authService from "@/services/authService";

export default function ChangePasswordForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await authService().changePassword(formData);

      if (!response.ok) {
        throw response;
      }
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

      throw new Error("An error has occurred during forgot password request");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Change password</button>
    </form>
  );
}
