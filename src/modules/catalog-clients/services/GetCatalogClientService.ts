import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { CatalogClient } from "../models/CatalogClient";

export class GetCatalogClientService {
  public async execute(id: number) {
    const catalogClient = await CatalogClient.findByPk(id);

    if (!catalogClient) {
      throw new AppError("Catálogo não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    return {
      id: catalogClient.id,
      name: catalogClient.name,
      slug: catalogClient.slug,
      description: catalogClient.description,
      createdAt: catalogClient.createdAt,
      updatedAt: catalogClient.updatedAt,
    };
  }
}
