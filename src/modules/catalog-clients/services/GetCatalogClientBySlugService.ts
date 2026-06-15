import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { CatalogClient } from "../models/CatalogClient";

export class GetCatalogClientBySlugService {
  public async execute(slug: string) {
    const catalogClient = await CatalogClient.findOne({
      where: { slug },
    });

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
