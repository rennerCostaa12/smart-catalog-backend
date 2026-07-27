import { ConfirmPaymentWebhookResult } from "../types";
import { paidEvents } from "../constants";
import { AsaasPaymentWebhookDTO } from "../dtos/AsaasPaymentWebhookDTO";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { AppError } from "../../../shared/errors/AppError";
import { Payment } from "../../../modules/payments/models/Payment";
import { StatusPayment } from "../../../modules/status-payments/models/StatusPayment";
import { PaymentStatusName } from "../../../modules/payments/constants";
import { handleDatePayment } from "../../../utils/handle-date-payment";

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

    if (!paidEvents.has(data?.event)) {
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

    const paidStatus = await StatusPayment.findOne({
      where: { name: PaymentStatusName.PAID },
    });

    if (!paidStatus) {
      throw new AppError(
        "Status de pagamento pago não configurado.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const datePayment = payment?.paidAt ?? handleDatePayment(data, new Date());

    await payment.update({
      statusPaymentId: paidStatus.id,
      paidAt: datePayment,
    });

    return {
      updated: true,
      ignored: false,
      paymentId: payment.id,
    };
  }
}
