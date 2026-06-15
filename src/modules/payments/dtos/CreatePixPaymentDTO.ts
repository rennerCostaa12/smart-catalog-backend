import { AsaasCustomerRequest } from "../services/AsaasPaymentsService/types";

export interface CreatePixPaymentDTO {
  customer?: string;
  userId: number;
  catalogClientId: number;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  customerData?: AsaasCustomerRequest;
}
