export interface CreatePixPaymentDTO {
  customer: string;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
}
