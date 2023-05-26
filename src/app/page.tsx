import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  return (
    <h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </h1>
  );
}
