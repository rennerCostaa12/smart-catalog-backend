import { MethodPayment } from "../../../method-payments/models/MethodPayment";
import { StatusPayment } from "../../../status-payments/models/StatusPayment";
import { AsaasPaymentResponse } from "../AsaasPaymentsService/types";

export type PaymentReferences = {
  methodPayment: MethodPayment;
  statusPaymentByName: Map<string, StatusPayment>;
};

export type CreatedPaymentResponse = AsaasPaymentResponse & {
  paymentId: number;
};
