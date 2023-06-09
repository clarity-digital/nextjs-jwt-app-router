import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "server-only";

type Props = {
  method?: string;
  url: string;
  body?: string;
};

async function fetchServer({ method = "GET", url, body = "" }: Props) {
  try {
    const session = await getServerSession(authOptions);

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + session?.accessToken,
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 401 || error.status === 403) {
        // Handle error when occurs
      }

      throw error;
    }

    throw new Error("fetchServer failed", { cause: error });
  }
}

export default fetchServer;
