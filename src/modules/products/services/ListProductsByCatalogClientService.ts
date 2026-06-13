import { WhereOptions } from "sequelize";

import { Product } from "../models/Product";
import { CategoryProduct } from "../../categories-products/models/CategoryProduct";
import {
  ListProductsByCatalogClientParams,
  PaginatedProductsResponse,
} from "./types";
import { CatalogClient } from "../../catalog-clients/models/CatalogClient";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";

export class ListProductsByCatalogClientService {
  public async execute({
    catalogClientName,
    categoriesId,
    page,
    limit,
  }: ListProductsByCatalogClientParams): Promise<PaginatedProductsResponse> {
    const responseCatalogClient = await CatalogClient.findOne({
      where: {
        slug: catalogClientName,
      },
    });

    if (!responseCatalogClient) {
      throw new AppError(
        "Catálogo de cliente não encontrado",
        HttpStatusCode.NOT_FOUND,
      );
    }

    const where: WhereOptions<Product> = {
      catalogClientId: responseCatalogClient?.id,
    };

    if (categoriesId) {
      where.categoriesId = categoriesId;
    }

    const { rows, count } = await Product.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: CategoryProduct,
          as: "category",
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return {
      products: rows.map((productData) => {
        return {
          id: productData.id,
          name: productData.name,
          description: productData.description,
          value: Number(productData.value),
          imageUrl: productData.imageUrl,
          categoriesId: productData.categoriesId,
          catalogClientId: productData.catalogClientId,
          categoryName: productData?.category?.name,
          createdAt: productData.createdAt,
          updatedAt: productData.updatedAt,
        };
      }),
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
