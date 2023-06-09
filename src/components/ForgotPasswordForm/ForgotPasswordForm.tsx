"use client";

import Input from "@/components/Input";
import authService from "@/services/authService";

export default function ForgotPasswordForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await authService().requestPasswordReset(formData);

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
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue="john@avocado-media.nl"
      />

      <button type="submit">Send</button>
    </form>
  );
}
