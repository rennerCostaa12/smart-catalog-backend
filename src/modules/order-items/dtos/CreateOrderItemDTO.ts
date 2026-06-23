export interface CreateOrderItemDTO {
  orderId: string;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
