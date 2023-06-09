import { SignOutButton } from "@/components/auth-button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <SignOutButton />
    </main>
  );
}
