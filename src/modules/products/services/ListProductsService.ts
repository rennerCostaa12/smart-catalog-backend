import { Product } from "../models/Product";
import { ProductResponse } from "./types";

export class ListProductsService {
  public async execute(): Promise<ProductResponse[]> {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });

    return products.map((productsData) => {
      return {
        id: productsData.id,
        name: productsData.name,
        description: productsData.description,
        value: Number(productsData.value),
        imageUrl: productsData.imageUrl,
        categoriesId: productsData.categoriesId,
        catalogClientId: productsData.catalogClientId,
        createdAt: productsData.createdAt,
        updatedAt: productsData.updatedAt,
      };
    });
  }
}
