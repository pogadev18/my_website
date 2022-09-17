import { NextApiRequest, NextApiResponse } from "next";

type createContextParams =  {
  req: NextApiRequest,
  res: NextApiResponse
}

export function createContext({req, res}: createContextParams) {
  return {
    req,
    res
  }
}

export type Context = ReturnType<typeof createContext>;