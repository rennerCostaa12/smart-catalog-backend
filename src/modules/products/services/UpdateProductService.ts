import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { uploadProductImage } from "../../../utils/product-image-storage";
import { UpdateProductDTO } from "../dtos/UpdateProductDTO";
import { Product } from "../models/Product";

export class UpdateProductService {
  public async execute(id: number, data: UpdateProductDTO) {
    if (data.isActive === undefined) {
      data.isActive = true;
    }

    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    const { image, ...productData } = data;
    const imageUrl = image ? await uploadProductImage(image) : undefined;

    if (!imageUrl) {
      throw new AppError(
        "Erro ao realizar upload de imagem.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    await product.update({
      ...productData,
      ...(imageUrl ? { imageUrl } : {}),
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      value: Number(product.value),
      imageUrl: product.imageUrl,
      categoriesId: product.categoriesId,
      catalogClientId: product.catalogClientId,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
