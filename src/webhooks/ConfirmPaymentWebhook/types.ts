export enum PaymentConfirmWebhookEventName {
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
}

export type ConfirmPaymentWebhookResult = {
  updated: boolean;
  ignored: boolean;
  paymentId?: number;
};
