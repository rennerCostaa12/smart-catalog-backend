import { CreateOrderItemDTO } from "../../order-items/dtos/CreateOrderItemDTO";

export interface CreateOrderDTO {
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  items: CreateOrderItemDTO[];
}
