import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { User } from "../models/User";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { VerifyIntegrityCredentials } from "../../../utils/verify-integrity-users";

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
    VerifyIntegrityCredentials(authorizationToken, userId);

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
