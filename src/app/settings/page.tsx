import { SignOutButton } from "@/components/AuthButton";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import UpdateUserForm from "@/components/UpdateUserForm";

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
