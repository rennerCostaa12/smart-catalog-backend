import { sequelize } from "../../../config/database";
import { OrderItem } from "../../order-items/models/OrderItem";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { Order } from "../models/Order";

export class CreateOrderService {
  public async execute(userId: number, data: CreateOrderDTO) {
    const { items, ...orderData } = data;

    const result = await sequelize.transaction(async (transaction) => {
      const order = await Order.create(
        {
          userId,
          ...orderData,
        },
        { transaction },
      );

      const payloadOrderItems = items?.map((item) => {
        return {
          ...item,
          orderId: order?.id,
        };
      });

      const orderItems = await OrderItem.bulkCreate(payloadOrderItems, {
        transaction,
      });

      return {
        order,
        orderItems,
      };
    });

    const { order, orderItems } = result;

    const listOrderItems = orderItems.map((item) => {
      return {
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        subtotal: Number(item.subtotal),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

    return {
      id: order?.id,
      userId: userId,
      catalogClientId: order?.catalogClientId,
      total: Number(order?.total),
      statusOrderId: order?.statusOrderId,
      items: listOrderItems,
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
    };
  }
}
