import { CreateCreditCardPaymentDTO } from "../../dtos/CreateCreditCardPaymentDTO";
import { CreatePixPaymentDTO } from "../../dtos/CreatePixPaymentDTO";
import { AsaasHttpClient } from "../../../../shared/integrations/asaas/AsaasHttpClient";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/http/HttpStatusCode";
import {
  AsaasCustomerListResponse,
  AsaasCustomerRequest,
  AsaasCustomerResponse,
  AsaasPaymentResponse,
  AsaasPixQrCodeResponse,
  BillingTypeEnum,
} from "./types";

export class AsaasPaymentsService {
  constructor(private readonly asaasHttpClient: AsaasHttpClient) {}

  public async createPixPayment(
    data: CreatePixPaymentDTO,
  ): Promise<AsaasPaymentResponse> {
    const customer = await this.resolveCustomer(data);
    const { customerData, userId, ...paymentData } = data;

    return this.asaasHttpClient.post<AsaasPaymentResponse, object>(
      "/payments",
      {
        ...paymentData,
        customer: customer.id,
        externalReference: String(userId),
        billingType: BillingTypeEnum.PIX,
      },
    );
  }

  public async createCreditCardPayment(
    data: CreateCreditCardPaymentDTO,
  ): Promise<AsaasPaymentResponse> {
    const customer = await this.resolveCustomer(
      data,
      this.getCustomerDataFromCreditCardHolder(data),
    );
    const { customerData, userId, ...paymentData } = data;

    return this.asaasHttpClient.post<AsaasPaymentResponse, object>(
      "/payments",
      {
        ...paymentData,
        customer: customer.id,
        externalReference: String(userId),
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

  private async addCustomer(
    data: AsaasCustomerRequest,
  ): Promise<AsaasCustomerResponse> {
    return this.asaasHttpClient.post<
      AsaasCustomerResponse,
      AsaasCustomerRequest & { groupName: string }
    >("/customers", {
      ...data,
      groupName: "smart catalog",
    });
  }

  private async getCustomerInfo(
    customerId: string,
  ): Promise<AsaasCustomerResponse> {
    return this.asaasHttpClient.get<AsaasCustomerResponse>(
      `/customers/${customerId}`,
    );
  }

  private async getCustomerInfoByExternalReference(
    userId: string | number,
  ): Promise<AsaasCustomerResponse | null> {
    const response = await this.asaasHttpClient.get<AsaasCustomerListResponse>(
      `/customers?externalReference=${encodeURIComponent(String(userId))}`,
    );

    return response.data[0] ?? null;
  }

  private async resolveCustomer(
    data: {
      customer?: string;
      userId: string | number;
      customerData?: AsaasCustomerRequest;
    },
    fallbackCustomerData?: AsaasCustomerRequest,
  ): Promise<AsaasCustomerResponse> {
    const customerByUserId = await this.getCustomerInfoByExternalReference(
      data.userId,
    );

    if (customerByUserId) {
      return customerByUserId;
    }

    if (data.customer) {
      try {
        return await this.getCustomerInfo(data.customer);
      } catch (error) {
        if (!this.isCustomerNotFoundError(error)) {
          throw error;
        }
      }
    }

    const customerData = data.customerData ?? fallbackCustomerData;

    if (!customerData) {
      throw new AppError(
        "Dados do cliente são obrigatórios para cadastrar no Asaas.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    return this.addCustomer({
      ...customerData,
      externalReference: String(data.userId),
    });
  }

  private getCustomerDataFromCreditCardHolder(
    data: CreateCreditCardPaymentDTO,
  ): AsaasCustomerRequest | undefined {
    const holderInfo = data.creditCardHolderInfo;

    if (!holderInfo) {
      return undefined;
    }

    return {
      name: holderInfo.name,
      cpfCnpj: holderInfo.cpfCnpj,
    };
  }

  private isCustomerNotFoundError(error: unknown): boolean {
    return (
      error instanceof AppError && error.statusCode === HttpStatusCode.NOT_FOUND
    );
  }
}
