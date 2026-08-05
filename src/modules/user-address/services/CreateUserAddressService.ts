import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { VerifyIntegrityCredentials } from "../../../utils/verify-integrity-users";
import { User } from "../../users/models/User";
import { MAX_ADDRESSES_PER_USER } from "../constants";
import { CreateUserAddressDTO } from "../dtos/CreateUserAddressDTO";
import { UserAddress } from "../models/UserAddress";
import { UserAddressResponse } from "./types";

export class CreateUserAddressService {
  public async execute(
    data: CreateUserAddressDTO,
    authorizationToken: string | undefined,
  ): Promise<UserAddressResponse> {
    VerifyIntegrityCredentials(authorizationToken, data.userId);

    const user = await User.findByPk(data.userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    const userAddressesCount = await UserAddress.count({
      where: { userId: data.userId },
    });

    if (userAddressesCount >= MAX_ADDRESSES_PER_USER) {
      throw new AppError(
        "Limite de 3 endereços por usuário atingido.",
        HttpStatusCode.CONFLICT,
      );
    }

    const userAddress = await UserAddress.create(data);

    return {
      id: userAddress.id,
      label: userAddress.label,
      address: userAddress.address,
      neighborhood: userAddress.neighborhood,
      complement: userAddress.complement,
      city: userAddress.city,
      state: userAddress.state,
      number: userAddress.number,
      postalCode: userAddress.postalCode,
      userId: userAddress.userId,
    };
  }
}
