import { CreateCreditCardPaymentDTO } from "../../dtos/CreateCreditCardPaymentDTO";
import { CreatePixPaymentDTO } from "../../dtos/CreatePixPaymentDTO";
import { AsaasHttpClient } from "../../../../shared/integrations/asaas/AsaasHttpClient";
import {
  AsaasPaymentResponse,
  AsaasPixQrCodeResponse,
  BillingTypeEnum,
} from "./types";

export class AsaasPaymentsService {
  constructor(private readonly asaasHttpClient: AsaasHttpClient) {}

  public async createPixPayment(
    data: CreatePixPaymentDTO,
  ): Promise<AsaasPaymentResponse> {
    return this.asaasHttpClient.post<AsaasPaymentResponse, object>(
      "/payments",
      {
        ...data,
        billingType: BillingTypeEnum.PIX,
      },
    );
  }

  public async createCreditCardPayment(
    data: CreateCreditCardPaymentDTO,
  ): Promise<AsaasPaymentResponse> {
    return this.asaasHttpClient.post<AsaasPaymentResponse, object>(
      "/payments",
      {
        ...data,
        billingType: BillingTypeEnum.CREDIT_CARD,
      },
    );
  }

  public async getPixQrCode(
    paymentId: string,
  ): Promise<AsaasPixQrCodeResponse> {
    return this.asaasHttpClient.get<AsaasPixQrCodeResponse>(
      `/payments/${paymentId}/pixQrCode`,
    );
  }
}
