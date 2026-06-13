import { UniqueConstraintError } from "sequelize";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { CreateCatalogClientDTO } from "../dtos/CreateCatalogClientDTO";
import { CatalogClient } from "../models/CatalogClient";

export class CreateCatalogClientService {
  public async execute(data: CreateCatalogClientDTO) {
    const catalogClientAlreadyExists = await CatalogClient.findOne({
      where: { slug: data.slug },
    });

    if (catalogClientAlreadyExists) {
      throw new AppError(
        "Já existe um catálogo com este slug.",
        HttpStatusCode.CONFLICT,
      );
    }

    try {
      const catalogClient = await CatalogClient.create(data);

      return {
        id: catalogClient.id,
        name: catalogClient.name,
        slug: catalogClient.slug,
        description: catalogClient.description,
        createdAt: catalogClient.createdAt,
        updatedAt: catalogClient.updatedAt,
      };
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new AppError(
          "Já existe um catálogo com este slug.",
          HttpStatusCode.CONFLICT,
        );
      }

      throw error;
    }
  }
}
