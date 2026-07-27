import { PAID_EVENTS_ENUM } from "./types";

export const paidEvents = new Set([
  PAID_EVENTS_ENUM.PAYMENT_CONFIRMED,
  PAID_EVENTS_ENUM.PAYMENT_RECEIVED,
]);
