import { Op, UniqueConstraintError } from "sequelize";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { UpdateCatalogClientDTO } from "../dtos/UpdateCatalogClientDTO";
import { CatalogClient } from "../models/CatalogClient";

export class UpdateCatalogClientService {
  public async execute(id: number, data: UpdateCatalogClientDTO) {
    const catalogClient = await CatalogClient.findByPk(id);

    if (!catalogClient) {
      throw new AppError("Catálogo não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    if (data.slug) {
      const catalogClientWithSlug = await CatalogClient.findOne({
        where: {
          slug: data.slug,
          id: { [Op.ne]: id },
        },
      });

      if (catalogClientWithSlug) {
        throw new AppError(
          "Já existe um catálogo com este slug.",
          HttpStatusCode.CONFLICT,
        );
      }
    }

    try {
      await catalogClient.update(data);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new AppError(
          "Já existe um catálogo com este slug.",
          HttpStatusCode.CONFLICT,
        );
      }

      throw error;
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
