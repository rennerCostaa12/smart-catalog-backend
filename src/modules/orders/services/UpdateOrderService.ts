import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { Payment } from "../../payments/models/Payment";
import { UpdateOrderDTO } from "../dtos/UpdateOrderDTO";
import { Order } from "../models/Order";

export class UpdateOrderService {
  public async execute(id: string, userId: number, data: UpdateOrderDTO) {
    const order = await Order.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!order) {
      throw new AppError("Pedido não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await this.ensurePaymentBelongsToOrder(
      data.paymentId === undefined ? order.paymentId : data.paymentId,
      userId,
      data.catalogClientId ?? order.catalogClientId,
      data.methodPaymentId ?? order.methodPaymentId,
    );

    await order.update(data);

    return {
      id: order?.id,
      userId: order?.userId,
      catalogClientId: order?.catalogClientId,
      total: Number(order?.total),
      statusOrderId: order?.statusOrderId,
      methodPaymentId: order?.methodPaymentId,
      paymentId: order?.paymentId ?? null,
      deliveryMethod: order?.deliveryMethod,
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
    };
  }

  private async ensurePaymentBelongsToOrder(
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
