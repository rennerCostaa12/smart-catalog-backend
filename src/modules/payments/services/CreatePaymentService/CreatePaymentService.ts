import { Op } from "sequelize";

import { CatalogClient } from "../../../catalog-clients/models/CatalogClient";
import { MethodPayment } from "../../../method-payments/models/MethodPayment";
import { StatusPayment } from "../../../status-payments/models/StatusPayment";
import { User } from "../../../users/models/User";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/http/HttpStatusCode";
import { PaymentMethodName, PaymentStatusName } from "../../constants";
import { CreateCreditCardPaymentDTO } from "../../dtos/CreateCreditCardPaymentDTO";
import { CreatePixPaymentDTO } from "../../dtos/CreatePixPaymentDTO";
import { Payment } from "../../models/Payment";
import { AsaasPaymentsService } from "../AsaasPaymentsService/AsaasPaymentsService";
import { AsaasPaymentResponse } from "../AsaasPaymentsService/types";

import { PaymentReferences } from "./types";

export class CreatePaymentService {
  constructor(private readonly asaasPaymentsService: AsaasPaymentsService) {}

  public async createPixPayment(
    data: CreatePixPaymentDTO,
  ): Promise<AsaasPaymentResponse> {
    const references = await this.resolveReferences(
      data.userId,
      data.catalogClientId,
      PaymentMethodName.PIX,
    );
    const asaasPayment = await this.asaasPaymentsService.createPixPayment(data);

    await this.persistPayment(data, asaasPayment, references);

    return asaasPayment;
  }

  public async createCreditCardPayment(
    data: CreateCreditCardPaymentDTO,
  ): Promise<AsaasPaymentResponse> {
    const references = await this.resolveReferences(
      data.userId,
      data.catalogClientId,
      PaymentMethodName.CREDIT_CARD,
    );
    const asaasPayment =
      await this.asaasPaymentsService.createCreditCardPayment(data);

    await this.persistPayment(data, asaasPayment, references);

    return asaasPayment;
  }

  private async resolveReferences(
    userId: number,
    catalogClientId: number,
    methodName: PaymentMethodName,
  ): Promise<PaymentReferences> {
    const [user, catalogClient, methodPayment, statusPayment] =
      await Promise.all([
        User.findByPk(userId),
        CatalogClient.findByPk(catalogClientId),
        MethodPayment.findOne({ where: { name: methodName } }),
        StatusPayment.findAll({
          where: {
            name: {
              [Op.in]: Object.values(PaymentStatusName),
            },
          },
        }),
      ]);

    if (!user) {
      throw new AppError("Usuário não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    if (!catalogClient) {
      throw new AppError("Catálogo não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    if (!methodPayment) {
      throw new AppError(
        `Método de pagamento "${methodName}" não encontrado.`,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const statusPaymentByName = new Map(
      statusPayment.map((status) => [status.name, status]),
    );

    if (
      Object.values(PaymentStatusName).some(
        (statusName) => !statusPaymentByName.has(statusName),
      )
    ) {
      throw new AppError(
        "Status de pagamento não configurado.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return { methodPayment, statusPaymentByName };
  }

  private async persistPayment(
    data: CreatePixPaymentDTO | CreateCreditCardPaymentDTO,
    asaasPayment: AsaasPaymentResponse,
    references: PaymentReferences,
  ): Promise<void> {
    const statusName = this.mapAsaasStatus(asaasPayment.status);
    const statusPayment = references.statusPaymentByName.get(statusName);

    if (!statusPayment) {
      throw new AppError(
        "Status de pagamento não configurado.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    await Payment.create({
      methodPaymentId: references.methodPayment.id,
      userId: data.userId,
      catalogClientId: data.catalogClientId,
      amount: asaasPayment.value,
      statusPaymentId: statusPayment.id,
      paidAt: statusName === PaymentStatusName.PAID ? new Date() : null,
    });
  }

  private mapAsaasStatus(status: string): PaymentStatusName {
    if (
      ["CONFIRMED", "RECEIVED", "RECEIVED_IN_CASH"].includes(
        status.toUpperCase(),
      )
    ) {
      return PaymentStatusName.PAID;
    }

    if (
      [
        "CHARGEBACK_REQUESTED",
        "CHARGEBACK_DISPUTE",
        "AWAITING_CHARGEBACK_REVERSAL",
        "REFUNDED",
        "REFUND_REQUESTED",
        "REFUND_IN_PROGRESS",
      ].includes(status.toUpperCase())
    ) {
      return PaymentStatusName.CANCELED;
    }

    return PaymentStatusName.PENDING;
  }
}
