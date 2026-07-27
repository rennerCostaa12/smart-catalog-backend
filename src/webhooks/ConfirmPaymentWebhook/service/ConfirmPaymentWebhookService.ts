import { ConfirmPaymentWebhookResult } from "../types";
import { paidEvents } from "../constants";
import { AsaasPaymentWebhookDTO } from "../dtos/AsaasPaymentWebhookDTO";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { AppError } from "../../../shared/errors/AppError";
import { Payment } from "../../../modules/payments/models/Payment";
import { StatusPayment } from "../../../modules/status-payments/models/StatusPayment";
import { PaymentStatusName } from "../../../modules/payments/constants";

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

    await payment.update({
      statusPaymentId: paidStatus.id,
      paidAt: payment.paidAt ?? this.resolvePaidAt(data),
    });

    return {
      updated: true,
      ignored: false,
      paymentId: payment.id,
    };
  }

  private resolvePaidAt(data: Partial<AsaasPaymentWebhookDTO>): Date {
    const paidAt =
      data.payment?.paymentDate ??
      data.payment?.confirmedDate ??
      data.payment?.clientPaymentDate ??
      data.dateCreated;

    if (!paidAt) {
      return new Date();
    }

    const parsedPaidAt = new Date(paidAt);

    if (Number.isNaN(parsedPaidAt.getTime())) {
      return new Date();
    }

    return parsedPaidAt;
  }
}
