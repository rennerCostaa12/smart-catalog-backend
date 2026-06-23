import * as yup from "yup";

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
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
