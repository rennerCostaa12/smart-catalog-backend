import { AppError } from "../shared/errors/AppError";
import { HttpStatusCode } from "../shared/http/HttpStatusCode";
import { verifyAuthToken } from "../shared/security/auth-token";
import { ROLE_USERS_ENUM } from "../types/roles";
import { getAuthToken } from "./get-auth-token";

export function VerifyIntegrityCredentials(
  authorizationToken?: string,
  userId?: number,
) {
  if (!authorizationToken || !userId) {
    throw new AppError(
      "Token e userId são parâmetros obrigatórios",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const token = getAuthToken(authorizationToken);
  const authPayload = token ? verifyAuthToken(token) : null;

  if (!authPayload) {
    throw new AppError(
      "Token de autenticação inválido ou expirado.",
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  if (
    authPayload?.role === ROLE_USERS_ENUM.USER &&
    authPayload?.sub !== userId
  ) {
    throw new AppError(
      "Usuário não autorizado a atualizar esses dados.",
      HttpStatusCode.FORBIDDEN,
    );
  }
}
