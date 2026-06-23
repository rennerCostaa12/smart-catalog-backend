export type OrderItemResponse = {
  id: string;
  orderId: string;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
};
