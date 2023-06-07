import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "server-only";

type Props = {
  method?: string;
  url: string;
  body?: string;
};

async function fetchServer({ method = "GET", url, body = "" }: Props) {
  const session = await getServerSession(authOptions);

  return await fetch(url.toString(), {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer" + session?.accessToken,
    },
    body: body || undefined,
  });
}

export default fetchServer;
