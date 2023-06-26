import { authOptions } from "@/lib/auth";
import fetchServer from "@/lib/fetch-server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email_verified_at) {
    redirect("/dashboard");
  }

  async function sendVerificationLink() {
    "use server";

    try {
      const response = await fetchServer({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/email/verification-notification",
      });

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      throw new Error("Could not send email verification request", { cause: error });
    }
  }

  return (
    <>
      <h1>Verify email</h1>

      <form action={sendVerificationLink}>
        <button type="submit">Send me a verification link</button>
      </form>
    </>
  );
}
