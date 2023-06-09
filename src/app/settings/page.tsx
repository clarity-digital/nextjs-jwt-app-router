import { SignOutButton } from "@/components/auth-button";
import { ChangePasswordForm } from "@/components/change-password-form";
import UpdateUserForm from "@/components/update-user-form";

export default function Page() {
  return (
    <main>
      <h1>Settings</h1>

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
