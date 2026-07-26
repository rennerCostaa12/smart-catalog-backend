import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { HttpStatusCode } from "../http/HttpStatusCode";
import { verifyAuthToken } from "../security/auth-token";
import { getRequestAuthToken } from "../../utils/get-auth-token";
import { ROLE_USERS_ENUM } from "../../types/roles";

export const requireAdminAuth = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const token = getRequestAuthToken(request);

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

  if (payload.role !== ROLE_USERS_ENUM.ADMIN) {
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
