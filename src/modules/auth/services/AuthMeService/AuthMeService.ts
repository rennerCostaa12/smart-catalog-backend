import { Admin } from "../../../admin/models/Admin";
import { CatalogClient } from "../../../catalog-clients/models/CatalogClient";
import { User } from "../../../users/models/User";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/http/HttpStatusCode";
import { verifyAuthToken } from "../../../../shared/security/auth-token";

import { AuthMeResponse } from "./types";
import { ROLE_USERS_ENUM } from "../../../../types/roles";

export class AuthMeService {
  public async execute(token: string | undefined): Promise<AuthMeResponse> {
    const payload = token ? verifyAuthToken(token) : null;

    if (!payload) {
      throw new AppError(
        "Token de autenticação inválido ou expirado.",
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    if (payload.role === ROLE_USERS_ENUM.ADMIN) {
      const admin = await Admin.findByPk(payload.sub, {
        attributes: ["id", "name", "email", "phone"],
        include: [
          {
            model: CatalogClient,
            as: "catalogClient",
            attributes: ["id", "slug"],
          },
        ],
      });

      if (!admin) {
        throw new AppError(
          "Sessão de autenticação não encontrada.",
          HttpStatusCode.UNAUTHORIZED,
        );
      }

      const catalogClient = admin.catalogClient
        ? {
            id: admin.catalogClient.id,
            slug: admin.catalogClient.slug,
          }
        : undefined;

      return {
        id: admin?.id,
        name: admin?.name,
        email: admin?.email,
        phone: admin?.phone,
        catalogClient,
      };
    }

    const user = await User.findByPk(payload.sub, {
      attributes: ["id", "name", "email", "phone"],
    });

    if (!user) {
      throw new AppError(
        "Sessão de autenticação não encontrada.",
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    };
  }
}
