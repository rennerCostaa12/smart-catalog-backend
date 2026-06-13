import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { HttpStatusCode } from "../http/HttpStatusCode";
import { verifyAuthToken } from "../security/auth-token";

export const requireAuth = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const authorization = request.headers.authorization;
  const token = authorization?.match(/^Bearer ([^\s]+)$/i)?.[1];

  if (!token) {
    next(
      new AppError(
        "Token de autenticação não informado.",
        HttpStatusCode.UNAUTHORIZED,
      ),
    );
    return;
  }

  if (!verifyAuthToken(token)) {
    next(
      new AppError(
        "Token de autenticação inválido ou expirado.",
        HttpStatusCode.UNAUTHORIZED,
      ),
    );
    return;
  }

  next();
};
