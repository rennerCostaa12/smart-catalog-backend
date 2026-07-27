import { PAID_EVENTS_ENUM } from "../types";

export interface AsaasPaymentWebhookDTO {
  id: string;
  event: PAID_EVENTS_ENUM;
  dateCreated?: string;
  payment: {
    id: string;
    status?: string;
    paymentDate?: string | null;
    clientPaymentDate?: string | null;
    confirmedDate?: string | null;
  };
}
