import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { CatalogClient } from "../models/CatalogClient";

export class DeleteCatalogClientService {
  public async execute(id: number): Promise<void> {
    const catalogClient = await CatalogClient.findByPk(id);

    if (!catalogClient) {
      throw new AppError("Catálogo não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await catalogClient.destroy();
  }
}
