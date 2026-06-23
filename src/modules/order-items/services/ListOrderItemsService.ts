import { OrderItem } from "../models/OrderItem";
import { OrderItemResponse } from "./types";

export class ListOrderItemsService {
  public async execute(orderId: string): Promise<OrderItemResponse[]> {
    const orderItems = await OrderItem.findAll({
      where: { orderId },
      order: [["createdAt", "DESC"]],
    });

    return orderItems.map((orderData) => {
      return {
        id: orderData?.id,
        orderId: orderData?.orderId,
        productId: orderData?.productId,
        quantity: orderData?.quantity,
        unitPrice: Number(orderData?.unitPrice),
        subtotal: Number(orderData?.subtotal),
        createdAt: orderData?.createdAt,
        updatedAt: orderData?.updatedAt,
      };
    });
  }
}
