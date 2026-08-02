import { CreateOrderItemDTO } from "../../order-items/dtos/CreateOrderItemDTO";
import { DeliveryMethodEnum } from "../constants";

export interface CreateOrderDTO {
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  methodPaymentId: number;
  paymentId?: number | null;
  deliveryMethod: DeliveryMethodEnum;
  items: CreateOrderItemDTO[];
}
