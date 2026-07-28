import { paymentReversalEvents } from "../constants";
import { AsaasPaymentReversalWebhookDTO } from "../dtos/AsaasPaymentReversalWebhookDTO";
import {
  PaymentReversalWebhookEventName,
  PaymentReversalWebhookResult,
} from "../types";
import { PaymentStatusName } from "../../../modules/payments/constants";
import { Payment } from "../../../modules/payments/models/Payment";
import { StatusPayment } from "../../../modules/status-payments/models/StatusPayment";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";

export class PaymentReversalWebhookService {
  public async execute(
    data: Partial<AsaasPaymentReversalWebhookDTO> | null,
  ): Promise<PaymentReversalWebhookResult> {
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

    if (!paymentReversalEvents.has(data.event)) {
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

    const statusNameByEvent = {
      [PaymentReversalWebhookEventName.PAYMENT_REFUND_IN_PROGRESS]:
        PaymentStatusName.REVERSAL_IN_PROGRESS,
      [PaymentReversalWebhookEventName.PAYMENT_REFUND_DENIED]:
        PaymentStatusName.REVERSAL_DENIED,
      [PaymentReversalWebhookEventName.PAYMENT_REFUNDED]:
        PaymentStatusName.REVERSED,
    };
    const statusName = statusNameByEvent[data.event];

    const reversalStatus = await StatusPayment.findOne({
      where: { name: statusName },
    });

    if (!reversalStatus) {
      throw new AppError(
        "Status de estorno do pagamento não configurado.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const paymentReversalDate =
      statusName === PaymentStatusName.REVERSED
        ? (payment.paymentReversalDate ?? new Date())
        : payment.paymentReversalDate;

    await payment.update({
      statusPaymentId: reversalStatus.id,
      paymentReversalDate,
    });

    return {
      updated: true,
      ignored: false,
      paymentId: payment.id,
    };
  }
}
