import { DeliveryMethodEnum } from "../constants";

export enum StatusOrderNameEnum {
  PENDENTE = "PENDENTE",
  CONFIRMADO = "CONFIRMADO",
  PREPARANDO = "PREPARANDO",
  PRONTO_PARA_ENTREGA = "PRONTO PARA ENTREGA",
  PRONTO_PARA_RETIRADA = "PRONTO PARA RETIRADA",
  ENTREGUE = "ENTREGUE",
}

type MethodPaymentItem = {
  name: string;
  description: string | null;
};

type StatusPaymentItem = {
  name: string;
};

type PaymentItem = {
  id: number;
  asaasPaymentId: string | null;
  amount: number;
  paidAt: Date | null;
  paymentReversalDate: Date | null;
  statusPayment?: StatusPaymentItem | null;
};

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
  methodPaymentId: number;
  paymentId: number | null;
  deliveryMethod: DeliveryMethodEnum;
  methodPayment?: MethodPaymentItem | null;
  payment?: PaymentItem | null;
  statusOrder: {
    name: StatusOrderNameEnum;
  };
  items?: OrdersItems[];
};

export type OrderByCatalogResponse = OrderResponse & {
  user: {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
  };
};
