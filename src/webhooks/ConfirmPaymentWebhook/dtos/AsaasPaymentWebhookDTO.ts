import { PaymentConfirmWebhookEventName } from "../types";

export interface AsaasPaymentWebhookDTO {
  id: string;
  event: PaymentConfirmWebhookEventName;
  dateCreated?: string;
  payment: {
    id: string;
    status?: string;
    paymentDate?: string | null;
    clientPaymentDate?: string | null;
    confirmedDate?: string | null;
  };
}
