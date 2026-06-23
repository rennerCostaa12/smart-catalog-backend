import * as yup from "yup";

export const updateOrderItemSchema = yup
  .object({
    productId: yup
      .number()
      .integer("O campo productId deve ser um número inteiro.")
      .positive("O campo productId deve ser maior que zero.")
      .optional(),
    quantity: yup
      .number()
      .integer("O campo quantity deve ser um número inteiro.")
      .positive("O campo quantity deve ser maior que zero.")
      .optional(),
    unitPrice: yup
      .number()
      .positive("O campo unitPrice deve ser maior que zero.")
      .optional(),
    subtotal: yup
      .number()
      .positive("O campo subtotal deve ser maior que zero.")
      .optional(),
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
