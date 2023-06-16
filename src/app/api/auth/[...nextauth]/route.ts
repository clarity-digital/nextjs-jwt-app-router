import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let options = {};

  if (req.url) {
    const searchParams = new URL(req.url).searchParams;
    const refreshUser = searchParams.get("refreshUser");

    if (refreshUser) {
      options = { ...options, refreshUser: true };
    }
  }

  return NextAuth(req, res, authOptions(options));
};

export { handler as GET, handler as POST };
