import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { VerifyIntegrityCredentials } from "../../../utils/verify-integrity-users";
import { UpdateUserAddressDTO } from "../dtos/UpdateUserAddressDTO";
import { UserAddress } from "../models/UserAddress";
import { UserAddressResponse } from "./types";

export class UpdateUserAddressService {
  public async execute(
    id: number,
    data: UpdateUserAddressDTO,
    authorizationToken: string | undefined,
  ): Promise<UserAddressResponse> {
    const userAddress = await UserAddress.findByPk(id);

    if (!userAddress) {
      throw new AppError("Endereço não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    VerifyIntegrityCredentials(authorizationToken, userAddress.userId);

    await userAddress.update(data);

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
