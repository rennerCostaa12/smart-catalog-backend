import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { UpdateProductStatusDTO } from "../dtos/UpdateProductStatusDTO";
import { Product } from "../models/Product";
import { ProductResponse } from "./types";

export class UpdateProductStatusService {
  public async execute(
    id: number,
    data: UpdateProductStatusDTO,
  ): Promise<ProductResponse> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError(
        "O parâmetro id é obrigatório.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await product.update({
      isActive: data.isActive,
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      value: Number(product.value),
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoriesId: product.categoriesId,
      catalogClientId: product.catalogClientId,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
