import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
      if (error.status === 401) {
        return redirect("/login");
      }

      if (error.status === 409) {
        return redirect("/");
      }
    }

    throw new Error("fetchServer failed", { cause: error });
  }
}

export default fetchServer;
