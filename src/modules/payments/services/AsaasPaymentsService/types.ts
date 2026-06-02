export enum BillingTypeEnum {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD'
}

export interface AsaasPaymentResponse {
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink?: string | null;
  value: number;
  netValue?: number;
  billingType: BillingTypeEnum;
  status: string;
  dueDate: string;
  invoiceUrl?: string;
  bankSlipUrl?: string | null;
  transactionReceiptUrl?: string | null;
  invoiceNumber?: string;
  externalReference?: string;
  creditCard?: {
    creditCardNumber?: string;
    creditCardBrand?: string;
    creditCardToken?: string;
  };
};

export interface AsaasPixQrCodeResponse {
  encodedImage: string;
  payload: string;
  expirationDate: string;
};