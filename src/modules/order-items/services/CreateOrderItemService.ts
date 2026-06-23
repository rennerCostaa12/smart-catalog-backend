import { CreateOrderItemDTO } from "../dtos/CreateOrderItemDTO";
import { OrderItem } from "../models/OrderItem";

export class CreateOrderItemService {
  public async execute(
    orderId: string,
    data: Omit<CreateOrderItemDTO, "orderId">,
  ) {
    const orderItem = await OrderItem.create({
      ...data,
      orderId,
    });

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
