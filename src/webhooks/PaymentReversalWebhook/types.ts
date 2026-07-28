export enum PaymentReversalWebhookEventName {
  PAYMENT_REFUND_IN_PROGRESS = "PAYMENT_REFUND_IN_PROGRESS",
  PAYMENT_REFUND_DENIED = "PAYMENT_REFUND_DENIED",
  PAYMENT_REFUNDED = "PAYMENT_REFUNDED",
}

export type PaymentReversalWebhookResult = {
  updated: boolean;
  ignored: boolean;
  paymentId?: number;
};
