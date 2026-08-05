import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { VerifyIntegrityCredentials } from "../../../utils/verify-integrity-users";
import { User } from "../../users/models/User";
import { UserAddress } from "../models/UserAddress";
import { UserAddressResponse } from "./types";

export class ListUserAddressesService {
  public async execute(
    userId: number,
    authorizationToken: string | undefined,
  ): Promise<UserAddressResponse[]> {
    VerifyIntegrityCredentials(authorizationToken, userId);

    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    const userAddresses = await UserAddress.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return userAddresses.map((addresses) => {
      return {
        id: addresses.id,
        label: addresses.label,
        address: addresses.address,
        neighborhood: addresses.neighborhood,
        complement: addresses.complement,
        city: addresses.city,
        state: addresses.state,
        number: addresses.number,
        postalCode: addresses.postalCode,
        userId: addresses.userId,
      };
    });
  }
}
