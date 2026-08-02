import { ConfirmPaymentWebhookResult } from "../types";
import { paidEvents } from "../constants";
import { AsaasPaymentWebhookDTO } from "../dtos/AsaasPaymentWebhookDTO";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { AppError } from "../../../shared/errors/AppError";
import { Payment } from "../../../modules/payments/models/Payment";
import { Order } from "../../../modules/orders/models/Order";
import { OrderItem } from "../../../modules/order-items/models/OrderItem";
import { StatusPayment } from "../../../modules/status-payments/models/StatusPayment";
import { PaymentStatusName } from "../../../modules/payments/constants";
import { handleDatePayment } from "../../../utils/handle-date-payment";
import { Product } from "../../../modules/products/models/Product";
import { sequelize } from "../../../config/database";
import { Transaction } from "sequelize";

export class ConfirmPaymentWebhookService {
  public async execute(
    data: Partial<AsaasPaymentWebhookDTO> | null,
  ): Promise<ConfirmPaymentWebhookResult> {
    if (!data?.payment?.id) {
      throw new AppError(
        "Identificador do pagamento é obrigatório.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (!data.event) {
      throw new AppError(
        "Evento do webhook é obrigatório.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (!paidEvents.has(data.event)) {
      return {
        updated: false,
        ignored: true,
      };
    }

    const payment = await Payment.findOne({
      where: { asaasPaymentId: data.payment.id },
    });

    if (!payment) {
      return {
        updated: false,
        ignored: true,
      };
    }

    const paymentStatuses = await StatusPayment.findAll({
      where: {
        name: [
          PaymentStatusName.PAID,
          PaymentStatusName.REVERSAL_IN_PROGRESS,
          PaymentStatusName.REVERSAL_DENIED,
          PaymentStatusName.REVERSED,
        ],
      },
    });
    const paymentStatusByName = new Map(
      paymentStatuses.map((status) => [status.name, status]),
    );
    const paidStatus = paymentStatusByName.get(PaymentStatusName.PAID);

    if (!paidStatus) {
      throw new AppError(
        "Status de pagamento pago não configurado.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const reversalStatusIds = [
      paymentStatusByName.get(PaymentStatusName.REVERSAL_IN_PROGRESS)?.id,
      paymentStatusByName.get(PaymentStatusName.REVERSAL_DENIED)?.id,
      paymentStatusByName.get(PaymentStatusName.REVERSED)?.id,
    ].filter((statusId): statusId is number => Boolean(statusId));

    if (
      payment.statusPaymentId === paidStatus.id ||
      reversalStatusIds.includes(payment.statusPaymentId)
    ) {
      return {
        updated: false,
        ignored: true,
        paymentId: payment.id,
      };
    }

    const newDate = new Date();
    const datePayment = payment.paidAt ?? handleDatePayment(data, newDate);

    const updated = await sequelize.transaction(async (transaction) => {
      const paymentToConfirm = await Payment.findByPk(payment.id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!paymentToConfirm) {
        throw new AppError(
          "Pagamento não encontrado.",
          HttpStatusCode.NOT_FOUND,
        );
      }

      if (
        paymentToConfirm.statusPaymentId === paidStatus.id ||
        reversalStatusIds.includes(paymentToConfirm.statusPaymentId)
      ) {
        return false;
      }

      await this.synchronizeStock(paymentToConfirm.id, transaction);

      await paymentToConfirm.update(
        {
          statusPaymentId: paidStatus.id,
          paidAt: paymentToConfirm.paidAt ?? datePayment,
        },
        { transaction },
      );

      return true;
    });

    return {
      updated,
      ignored: !updated,
      paymentId: payment.id,
    };
  }

  private async synchronizeStock(paymentId: number, transaction: Transaction) {
    const order = await Order.findOne({
      where: {
        paymentId: paymentId,
      },
      transaction,
    });

    if (!order) {
      throw new AppError(
        "Pedido vinculado ao pagamento não encontrado.",
        HttpStatusCode.NOT_FOUND,
      );
    }

    const orderItems = await OrderItem.findAll({
      where: {
        orderId: order.id,
      },
      transaction,
    });

    if (!orderItems.length) {
      throw new AppError(
        "Pedido sem itens para sincronizar estoque.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    for (const orderItem of orderItems) {
      const product = await Product.findByPk(orderItem.productId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!product) {
        throw new AppError(
          "Produto do pedido não encontrado.",
          HttpStatusCode.NOT_FOUND,
        );
      }

      const nextStock = product.stock - orderItem.quantity;

      if (nextStock < 0) {
        throw new AppError(
          `Estoque insuficiente para o produto ${product.name}.`,
          HttpStatusCode.CONFLICT,
        );
      }

      await product.update(
        {
          stock: nextStock,
        },
        { transaction },
      );
    }
  }
}
