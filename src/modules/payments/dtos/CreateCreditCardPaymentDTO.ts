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
  customer: string;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  creditCard?: CreditCardDTO;
  creditCardHolderInfo?: CreditCardHolderInfoDTO;
  creditCardToken?: string;
  authorizeOnly?: boolean;
  remoteIp: string;
}
