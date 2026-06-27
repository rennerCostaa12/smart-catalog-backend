import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { HttpStatusCode } from "../http/HttpStatusCode";
import { verifyAuthToken } from "../security/auth-token";
import { getBearerToken } from "../../utils/get-bearer-token";

export const requireAdminAuth = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const authorization = request.headers.authorization;
  const token = getBearerToken(authorization);

  if (!token) {
    next(
      new AppError(
        "Token de autenticação não informado.",
        HttpStatusCode.UNAUTHORIZED,
      ),
    );
    return;
  }

  const payload = verifyAuthToken(token);

  if (!payload) {
    next(
      new AppError(
        "Token de autenticação inválido ou expirado.",
        HttpStatusCode.UNAUTHORIZED,
      ),
    );
    return;
  }

  if (payload.role !== "admin") {
    next(
      new AppError(
        "Acesso permitido somente para administradores.",
        HttpStatusCode.FORBIDDEN,
      ),
    );
    return;
  }

  next();
};
