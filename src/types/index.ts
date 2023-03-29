import { Request, Response, NextFunction, RequestHandler } from "express";


export type AsyncReqHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;


