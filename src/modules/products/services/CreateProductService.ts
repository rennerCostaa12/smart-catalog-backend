import { CreateProductDTO } from "../dtos/CreateProductDTO";
import { Product } from "../models/Product";
import { uploadProductImage } from "../../../utils/product-image-storage";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";

export class CreateProductService {
  public async execute(data: CreateProductDTO) {
    if (data.isActive === undefined) {
      data.isActive = true;
    }

    const { image, ...productData } = data;
    const imageUrl = await uploadProductImage(image);

    if (!imageUrl) {
      throw new AppError(
        "Erro ao realizar upload de imagem.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const product = await Product.create({
      ...productData,
      imageUrl,
    });

    return {
      id: product?.id,
      name: product?.name,
      description: product?.description,
      value: Number(product?.value),
      imageUrl: product?.imageUrl,
      categoriesId: product?.categoriesId,
      catalogClientId: product?.catalogClientId,
      isActive: product?.isActive,
      createdAt: product?.createdAt,
      updatedAt: product?.updatedAt,
    };
  }
}
