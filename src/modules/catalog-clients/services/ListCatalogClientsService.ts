import { CatalogClient } from "../models/CatalogClient";

export class ListCatalogClientsService {
  public async execute() {
    const catalogClients = await CatalogClient.findAll({
      order: [["id", "ASC"]],
    });

    return catalogClients.map((catalogData) => {
      return {
        id: catalogData.id,
        name: catalogData.name,
        slug: catalogData.slug,
        description: catalogData.description,
        createdAt: catalogData.createdAt,
        updatedAt: catalogData.updatedAt,
      };
    });
  }
}
