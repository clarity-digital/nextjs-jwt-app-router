"use client";

import fetchClient from "@/lib/fetch-client";
import { useSession } from "next-auth/react";

export default function VerifyEmailForm() {
  const { data: session, status } = useSession();

  async function sendVerificationLink() {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/email/verification-notification",
      });

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      throw new Error("Could not send email verification request");
    }
  }

  if (status === "loading") {
    return <>...</>;
  }

  if (session?.user?.email_verified_at) {
    return <p>Your email is verified</p>;
  }

  return (
    <>
      <h1>client session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <button
        type="button"
        onClick={sendVerificationLink}
      >
        Send me a verification link
      </button>
    </>
  );
}
