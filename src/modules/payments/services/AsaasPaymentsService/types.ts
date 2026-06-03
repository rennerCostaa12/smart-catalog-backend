export enum BillingTypeEnum {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD'
}

export enum PersonTypeEnum {
  FISICA = "FISICA",
  JURIDICA = "JURIDICA",
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

export interface AsaasCustomerRequest {
  name: string;
  cpfCnpj: string;
  externalReference?: string;
}

export interface AsaasCustomerResponse {
  object: "customer";
  id: string;
  dateCreated: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  mobilePhone?: string | null;
  address?: string | null;
  addressNumber?: string | null;
  complement?: string | null;
  province?: string | null;
  postalCode?: string | null;
  cpfCnpj: string;
  personType?: PersonTypeEnum;
  deleted: boolean;
  additionalEmails?: string | null;
  externalReference?: string | null;
  notificationDisabled: boolean;
  observations?: string | null;
  municipalInscription?: string | null;
  stateInscription?: string | null;
  canDelete?: boolean;
  cannotBeDeletedReason?: string | null;
  canEdit?: boolean;
  cannotEditReason?: string | null;
};

export interface AsaasCustomerListResponse {
  object: "list";
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: AsaasCustomerResponse[];
}
