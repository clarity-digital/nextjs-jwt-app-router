import VerifyEmailForm from "@/components/verify-email-form";
import { authOptions } from "@/lib/auth";
import fetchServer from "@/lib/fetch-server";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: Props) {
  const session = await getServerSession(authOptions({ refreshUser: true }));

  if (session && session?.user?.email_verified_at) {
    redirect("/dashboard");
  }

  const isVerified = await verifyEmail({ searchParams });

  return (
    <main>
      <h1>Verify email</h1>

      {isVerified ? (
        <>
          <p>Email successfully verified</p>
          <Link href="/dashboard">Navigate to dashboard</Link>
        </>
      ) : (
        <VerifyEmailForm />
      )}
    </main>
  );
}

async function verifyEmail({ searchParams }: Props) {
  if (!searchParams.url || !searchParams.signature) {
    return false;
  }

  try {
    const url = `/api/verify-email/${searchParams.url}&signature=${searchParams.signature}`;
    const response = await fetchServer({
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + url,
    });

    if (!response.ok) {
      throw response;
    }

    await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/auth/session?refreshUser=true");
    return response.ok;
  } catch (error) {
    throw new Error("Could not verify email", { cause: error });
  }
}
