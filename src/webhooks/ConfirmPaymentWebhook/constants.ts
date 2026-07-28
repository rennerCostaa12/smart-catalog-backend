import { PaymentConfirmWebhookEventName } from "./types";

export const paidEvents = new Set([
  PaymentConfirmWebhookEventName.PAYMENT_CONFIRMED,
  PaymentConfirmWebhookEventName.PAYMENT_RECEIVED,
]);
