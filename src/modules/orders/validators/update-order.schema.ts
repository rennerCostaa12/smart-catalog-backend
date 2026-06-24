import * as yup from "yup";
import { DeliveryMethodEnum } from "../constants";

export const updateOrderSchema = yup
  .object({
    catalogClientId: yup
      .number()
      .integer("O campo catalogClientId deve ser um número inteiro.")
      .positive("O campo catalogClientId deve ser maior que zero.")
      .optional(),
    total: yup
      .number()
      .min(0, "O campo total deve ser maior ou igual a zero.")
      .optional(),
    statusOrderId: yup
      .number()
      .integer("O campo statusOrderId deve ser um número inteiro.")
      .positive("O campo statusOrderId deve ser maior que zero.")
      .optional(),
    methodPaymentId: yup
      .number()
      .integer("O campo methodPaymentId deve ser um número inteiro.")
      .positive("O campo methodPaymentId deve ser maior que zero.")
      .optional(),
    deliveryMethod: yup
      .mixed<DeliveryMethodEnum>()
      .oneOf(
        Object.values(DeliveryMethodEnum),
        "O campo deliveryMethod deve ser RETIRADA ou ENTREGA.",
      )
      .optional(),
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
