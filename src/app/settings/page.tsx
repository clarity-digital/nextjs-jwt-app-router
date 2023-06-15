"use client";

import { SignOutButton } from "@/components/auth-button";
import { ChangePasswordForm } from "@/components/change-password-form";
import UpdateUserForm from "@/components/update-user-form";
import VerifyEmailForm from "@/components/verify-email-form";

export default function Page() {
  return (
    <main>
      <h1>Settings</h1>

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
