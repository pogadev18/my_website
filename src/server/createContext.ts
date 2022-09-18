import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from '@/root/utils/prisma';
import { verifyJwt } from "@/root/utils/jwt";

interface CtxUser {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

async function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;

  if (token) {
    try {
      return verifyJwt<CtxUser>(token);
      
    } catch (e) {
      return null;
    }
  }

  return null;
}

type createContextParams = {
  req: NextApiRequest,
  res: NextApiResponse
}

export function createContext({req, res}: createContextParams) {
  const user = getUserFromRequest(req);

  return {
    req,
    res,
    prisma,
    user
  }
}

export type Context = ReturnType<typeof createContext>;