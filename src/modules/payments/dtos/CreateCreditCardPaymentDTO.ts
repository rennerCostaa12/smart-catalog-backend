import { AsaasCustomerRequest } from "../services/AsaasPaymentsService/types";

export type CreditCardDTO = {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
};

export type CreditCardHolderInfoDTO = {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  addressComplement?: string;
  phone: string;
  mobilePhone?: string;
};

export interface CreateCreditCardPaymentDTO {
  customer?: string;
  userId: string | number;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  customerData?: AsaasCustomerRequest;
  creditCard?: CreditCardDTO;
  creditCardHolderInfo?: CreditCardHolderInfoDTO;
  creditCardToken?: string;
  authorizeOnly?: boolean;
  remoteIp: string;
}
