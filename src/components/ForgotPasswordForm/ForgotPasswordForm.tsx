"use client";

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

      // console.log(response);
    } catch (error) {
      // console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        name="email"
        type="email"
        defaultValue="john@avocado-media.nl"
      />

      <button type="submit">Send</button>
    </form>
  );
}
