import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from '@/root/utils/prisma';

type createContextParams = {
  req: NextApiRequest,
  res: NextApiResponse
}

export function createContext({req, res}: createContextParams) {
  return {
    req,
    res,
    prisma
  }
}

export type Context = ReturnType<typeof createContext>;