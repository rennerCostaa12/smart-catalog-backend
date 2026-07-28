import { PaymentReversalWebhookEventName } from "./types";

export const paymentReversalEvents = new Set([
  PaymentReversalWebhookEventName.PAYMENT_REFUND_IN_PROGRESS,
  PaymentReversalWebhookEventName.PAYMENT_REFUND_DENIED,
  PaymentReversalWebhookEventName.PAYMENT_REFUNDED,
]);
