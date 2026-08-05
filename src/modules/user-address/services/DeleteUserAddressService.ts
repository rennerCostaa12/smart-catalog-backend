import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { VerifyIntegrityCredentials } from "../../../utils/verify-integrity-users";
import { UserAddress } from "../models/UserAddress";

export class DeleteUserAddressService {
  public async execute(
    id: number,
    authorizationToken: string | undefined,
  ): Promise<void> {
    const userAddress = await UserAddress.findByPk(id);

    if (!userAddress) {
      throw new AppError("Endereço não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    VerifyIntegrityCredentials(authorizationToken, userAddress.userId);

    await userAddress.destroy();
  }
}
