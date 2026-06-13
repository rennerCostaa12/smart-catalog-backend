import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { Product } from "../models/Product";

export class GetProductService {
  public async execute(id: number) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", HttpStatusCode.NOT_FOUND);
    }

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
