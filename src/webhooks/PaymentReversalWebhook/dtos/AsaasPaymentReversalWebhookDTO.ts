import { PaymentReversalWebhookEventName } from "../types";

export interface AsaasPaymentReversalWebhookDTO {
  id: string;
  event: PaymentReversalWebhookEventName;
  dateCreated?: string;
  payment: {
    id: string;
    status?: string;
  };
}
