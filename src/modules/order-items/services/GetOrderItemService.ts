import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { OrderItem } from "../models/OrderItem";

export class GetOrderItemService {
  public async execute(id: string, orderId: string) {
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

    return {
      id: orderItem?.id,
      orderId: orderItem?.orderId,
      productId: orderItem?.productId,
      quantity: orderItem?.quantity,
      unitPrice: Number(orderItem?.unitPrice),
      subtotal: Number(orderItem?.subtotal),
      createdAt: orderItem?.createdAt,
      updatedAt: orderItem?.updatedAt,
    };
  }
}
