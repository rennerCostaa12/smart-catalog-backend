import { CreateProductDTO } from "../dtos/CreateProductDTO";
import { Product } from "../models/Product";

export class CreateProductService {
  public async execute(data: CreateProductDTO) {
    const product = await Product.create(data);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      value: Number(product.value),
      imageUrl: product.imageUrl,
      categoriesId: product.categoriesId,
      catalogClientId: product.catalogClientId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
