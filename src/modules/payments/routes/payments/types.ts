import { NextFunction, Request, Response } from "express";

export type AsyncRouteHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<Response | void>;
