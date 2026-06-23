import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { Order } from "../models/Order";

export class DeleteOrderService {
  public async execute(id: string, userId: number): Promise<void> {
    const order = await Order.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!order) {
      throw new AppError("Pedido não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    await order.destroy();
  }
}
