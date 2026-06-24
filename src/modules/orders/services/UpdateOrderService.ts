import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
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

    await order.update(data);

    return {
      id: order?.id,
      userId: order?.userId,
      catalogClientId: order?.catalogClientId,
      total: Number(order?.total),
      statusOrderId: order?.statusOrderId,
      methodPaymentId: order?.methodPaymentId,
      deliveryMethod: order?.deliveryMethod,
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
    };
  }
}
