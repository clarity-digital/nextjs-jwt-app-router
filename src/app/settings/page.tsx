import { SignOutButton } from "@/components/auth-button";
import { ChangePasswordForm } from "@/components/change-password-form";
import UpdateUserForm from "@/components/update-user-form";
import VerifyEmailForm from "@/components/verify-email-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions({ refreshUser: true }));

  return (
    <main>
      <h1>Settings</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <section>
        <h2>Verify your email</h2>
        <VerifyEmailForm />
      </section>

      <section>
        <h2>Update user</h2>
        <UpdateUserForm />
      </section>

      <section>
        <h2>Change password</h2>
        <ChangePasswordForm />
      </section>

      <SignOutButton />
    </main>
  );
}
