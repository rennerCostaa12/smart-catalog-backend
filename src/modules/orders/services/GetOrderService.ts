import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { Payment } from "../../payments/models/Payment";
import { StatusPayment } from "../../status-payments/models/StatusPayment";
import { Order } from "../models/Order";

export class GetOrderService {
  public async execute(id: string, userId: number) {
    const order = await Order.findOne({
      where: {
        id,
        userId,
      },
      include: [
        {
          model: Payment,
          as: "payment",
          attributes: ["amount", "paidAt"],
          include: [
            {
              model: StatusPayment,
              as: "statusPayment",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new AppError("Pedido não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    return {
      id: order?.id,
      userId: order?.userId,
      catalogClientId: order?.catalogClientId,
      total: Number(order?.total),
      statusOrderId: order?.statusOrderId,
      methodPaymentId: order?.methodPaymentId,
      paymentId: order?.paymentId ?? null,
      payment: order.payment
        ? {
            amount: Number(order.payment.amount),
            paidAt: order.payment.paidAt ?? null,
            statusPayment: order.payment.statusPayment
              ? {
                  name: order.payment.statusPayment.name,
                }
              : null,
          }
        : null,
      deliveryMethod: order?.deliveryMethod,
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
    };
  }
}
