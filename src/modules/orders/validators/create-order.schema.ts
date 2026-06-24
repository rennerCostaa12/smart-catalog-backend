import * as yup from "yup";
import { createOrderItemSchema } from "../../order-items/validators/create-order-item.schema";
import { DeliveryMethodEnum } from "../constants";

export const createOrderSchema = yup.object({
  catalogClientId: yup
    .number()
    .integer("O campo catalogClientId deve ser um número inteiro.")
    .positive("O campo catalogClientId deve ser maior que zero.")
    .required("O campo catalogClientId é obrigatório."),
  total: yup
    .number()
    .min(0, "O campo total deve ser maior ou igual a zero.")
    .required("O campo total é obrigatório."),
  statusOrderId: yup
    .number()
    .integer("O campo statusOrderId deve ser um número inteiro.")
    .positive("O campo statusOrderId deve ser maior que zero.")
    .required("O campo statusOrderId é obrigatório."),
  methodPaymentId: yup
    .number()
    .integer("O campo methodPaymentId deve ser um número inteiro.")
    .positive("O campo methodPaymentId deve ser maior que zero.")
    .required("O campo methodPaymentId é obrigatório."),
  deliveryMethod: yup
    .mixed<DeliveryMethodEnum>()
    .oneOf(
      Object.values(DeliveryMethodEnum),
      "O campo deliveryMethod deve ser RETIRADA ou ENTREGA.",
    )
    .required("O campo deliveryMethod é obrigatório."),
  items: yup
    .array()
    .of(createOrderItemSchema)
    .min(1, "Informe ao menos um item para o pedido.")
    .required("O campo items é obrigatório."),
});
