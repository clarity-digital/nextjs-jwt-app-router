import { getSession } from "next-auth/react";

type Props = {
  method?: string;
  url: string;
  body?: string;
  token?: string;
};

async function fetchClient({ method = "GET", url, body = "", token }: Props) {
  const session = await getSession();
  const accessToken = token || session?.accessToken;

  return await fetch(url.toString(), {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer" + accessToken,
    },
    body: body || undefined,
  });
}

export default fetchClient;
