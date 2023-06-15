import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions({ forceRefresh: true }));
};

export { handler as GET, handler as POST };
