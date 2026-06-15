import { MethodPayment } from "../../../method-payments/models/MethodPayment";
import { StatusPayment } from "../../../status-payments/models/StatusPayment";

export type PaymentReferences = {
  methodPayment: MethodPayment;
  statusPaymentByName: Map<string, StatusPayment>;
};
