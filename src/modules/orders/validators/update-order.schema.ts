import * as yup from "yup";

export const updateOrderSchema = yup
  .object({
    statusOrderId: yup
      .number()
      .integer("O campo statusOrderId deve ser um número inteiro.")
      .positive("O campo statusOrderId deve ser maior que zero.")
      .optional(),
    userAddressId: yup
      .number()
      .integer("O campo userAddressId deve ser um número inteiro.")
      .positive("O campo userAddressId deve ser maior que zero.")
      .nullable()
      .optional(),
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
