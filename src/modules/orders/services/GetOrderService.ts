import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { Order } from "../models/Order";

export class GetOrderService {
  public async execute(id: string, userId: number) {
    const order = await Order.findOne({
      where: {
        id,
        userId,
      },
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
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
    };
  }
}
