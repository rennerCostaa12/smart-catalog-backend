import * as yup from "yup";

export const createOrderItemSchema = yup.object({
  productId: yup
    .number()
    .integer("O campo productId deve ser um número inteiro.")
    .positive("O campo productId deve ser maior que zero.")
    .required("O campo productId é obrigatório."),
  quantity: yup
    .number()
    .integer("O campo quantity deve ser um número inteiro.")
    .positive("O campo quantity deve ser maior que zero.")
    .required("O campo quantity é obrigatório."),
  unitPrice: yup
    .number()
    .positive("O campo unitPrice deve ser maior que zero.")
    .required("O campo unitPrice é obrigatório."),
  subtotal: yup
    .number()
    .positive("O campo subtotal deve ser maior que zero.")
    .required("O campo subtotal é obrigatório."),
});
