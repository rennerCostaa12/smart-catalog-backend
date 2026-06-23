import * as yup from "yup";
import { createOrderItemSchema } from "../../order-items/validators/create-order-item.schema";

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
  items: yup
    .array()
    .of(createOrderItemSchema)
    .min(1, "Informe ao menos um item para o pedido.")
    .required("O campo items é obrigatório."),
});
