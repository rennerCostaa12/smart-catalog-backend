import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { OrderItem } from "../models/OrderItem";

export class DeleteOrderItemService {
  public async execute(id: string, orderId: string): Promise<void> {
    const orderItem = await OrderItem.findOne({
      where: {
        id,
        orderId,
      },
    });

    if (!orderItem) {
      throw new AppError(
        "Item do pedido não encontrado.",
        HttpStatusCode.NOT_FOUND,
      );
    }

    await orderItem.destroy();
  }
}
