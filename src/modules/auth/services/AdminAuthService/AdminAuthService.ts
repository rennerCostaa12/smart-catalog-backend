import { LoginAdminDTO } from "../../dtos/LoginAdminDTO";
import { RegisterAdminDTO } from "../../dtos/RegisterAdminDTO";
import { Admin } from "../../../admin/models/Admin";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/http/HttpStatusCode";
import { generateAuthToken } from "../../../../shared/security/auth-token";
import {
  comparePassword,
  hashPassword,
} from "../../../../shared/security/password-hash";

import { AuthResponse } from "./types";
import { CatalogClient } from "../../../catalog-clients/models/CatalogClient";

export class AdminAuthService {
  public async register(data: RegisterAdminDTO): Promise<AuthResponse> {
    const adminAlreadyExists = await Admin.findOne({
      where: { email: data.email },
    });

    if (adminAlreadyExists) {
      throw new AppError("Admin já cadastrado.", HttpStatusCode.CONFLICT);
    }

    const admin = await Admin.create({
      name: data.name,
      document: data.document,
      email: data.email,
      phone: data.phone,
      catalogClientId: data.catalogClientId,
      passwordHash: await hashPassword(data.password),
    });

    return this.buildAuthResponse(admin);
  }

  public async login(data: LoginAdminDTO): Promise<AuthResponse> {
    const admin = await Admin.findOne({
      where: { email: data.email },
      include: [
        {
          model: CatalogClient,
          as: "catalogClient",
        },
      ],
    });

    if (!admin) {
      throw new AppError("Credenciais inválidas.", HttpStatusCode.UNAUTHORIZED);
    }

    const passwordMatches = await comparePassword(
      data.password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas.", HttpStatusCode.UNAUTHORIZED);
    }

    return this.buildAuthResponse(admin);
  }

  private buildAuthResponse(admin: Admin): AuthResponse {
    return {
      admin: {
        id: admin?.id,
        name: admin?.name,
        document: admin?.document,
        email: admin?.email,
        phone: admin?.phone,
        catalogClient: {
          id: admin?.catalogClient?.id,
          slug: admin?.catalogClient?.slug,
        },
      },
      token: generateAuthToken({ sub: admin?.id, role: "admin" }),
    };
  }
}
