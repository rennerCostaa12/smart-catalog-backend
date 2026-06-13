import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { Product } from "../models/Product";

export class DeleteProductService {
  public async execute(id: number): Promise<void> {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await product.destroy();
  }
}
