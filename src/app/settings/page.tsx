import { SignOutButton } from "@/components/AuthButton";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function Page() {
  return (
    <main>
      <h1>Settings</h1>

      <ChangePasswordForm />

      <SignOutButton />
    </main>
  );
}
