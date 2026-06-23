export enum StatusOrderNameEnum {
  PENDENTE = "PENDENTE",
  CONFIRMADO = "CONFIRMADO",
  PREPARANDO = "PREPARANDO",
  PRONTO_PARA_ENTREGA = "PRONTO PARA ENTREGA",
  PRONTO_PARA_RETIRADA = "PRONTO PARA RETIRADA",
  ENTREGUE = "ENTREGUE",
}

type ProductItem = {
  name: string;
  description: string | null;
  value: number;
  imageUrl: string | null;
  catalogClient: {
    name: string;
    description: string | null;
  };
  category: {
    name: string;
    description: string | null;
  };
};

type OrdersItems = {
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: ProductItem;
};

export type OrderResponse = {
  id: string;
  userId: number;
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  statusOrder: {
    name: StatusOrderNameEnum;
  };
  items?: OrdersItems[];
  createdAt: Date;
  updatedAt: Date;
};
