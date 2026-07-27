export enum PAID_EVENTS_ENUM {
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED'
}

export type ConfirmPaymentWebhookResult = {
  updated: boolean;
  ignored: boolean;
  paymentId?: number;
};
