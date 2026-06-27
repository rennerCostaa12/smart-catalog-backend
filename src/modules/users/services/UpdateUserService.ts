import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { User } from "../models/User";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { getBearerToken } from "../../../utils/get-bearer-token";
import { verifyAuthToken } from "../../../shared/security/auth-token";

type UpdateUserResponse = {
  name: string;
  email: string;
  phone: string;
};

export class UpdateUserService {
  public async execute(
    data: UpdateUserDTO,
    userId: number,
    authorizationToken: string | undefined,
  ): Promise<UpdateUserResponse> {
    const token = getBearerToken(authorizationToken);
    const authPayload = token ? verifyAuthToken(token) : null;

    if (!authPayload) {
      throw new AppError(
        "Token de autenticação inválido ou expirado.",
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    if (authPayload?.role === "user" && authPayload?.sub !== userId) {
      throw new AppError(
        "Usuário não autorizado a atualizar esses dados.",
        HttpStatusCode.FORBIDDEN,
      );
    }

    const userFinded = await User.findOne({
      where: { id: userId },
    });

    if (!userFinded) {
      throw new AppError("Usuário não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await User.update(
      {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    return {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
    };
  }
}
