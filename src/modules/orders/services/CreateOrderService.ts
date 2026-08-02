import { sequelize } from "../../../config/database";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { OrderItem } from "../../order-items/models/OrderItem";
import { Payment } from "../../payments/models/Payment";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { Order } from "../models/Order";

export class CreateOrderService {
  public async execute(userId: number, data: CreateOrderDTO) {
    const { items, ...orderData } = data;

    await this.verifyExistsPayments(
      data.paymentId,
      userId,
      data.catalogClientId,
      data.methodPaymentId,
    );

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
      methodPaymentId: order?.methodPaymentId,
      paymentId: order?.paymentId ?? null,
      deliveryMethod: order?.deliveryMethod,
      items: listOrderItems,
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
    };
  }

  private async verifyExistsPayments(
    paymentId: number | null | undefined,
    userId: number,
    catalogClientId: number,
    methodPaymentId: number,
  ): Promise<void> {
    if (!paymentId) {
      return;
    }

    const payment = await Payment.findOne({
      where: {
        id: paymentId,
        userId,
        catalogClientId,
        methodPaymentId,
      },
    });

    if (!payment) {
      throw new AppError(
        "Pagamento não encontrado para este pedido.",
        HttpStatusCode.NOT_FOUND,
      );
    }
  }
}
