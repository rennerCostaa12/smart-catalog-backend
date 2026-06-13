import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { UpdateProductDTO } from "../dtos/UpdateProductDTO";
import { Product } from "../models/Product";

export class UpdateProductService {
  public async execute(
    id: number,
    data: UpdateProductDTO,
  ) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await product.update(data);

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
