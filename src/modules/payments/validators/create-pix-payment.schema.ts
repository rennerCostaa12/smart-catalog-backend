import * as yup from "yup";

export const createPixPaymentSchema = yup.object({
  customer: yup.string().required("O campo customer é obrigatório."),
  value: yup
    .number()
    .required("O campo value é obrigatório.")
    .positive("O campo value deve ser um número positivo."),
  dueDate: yup.string().required("O campo dueDate é obrigatório."),
  description: yup
    .string()
    .max(500, "O campo description deve ter no máximo 500 caracteres."),
  externalReference: yup
    .string()
    .max(255, "O campo externalReference deve ter no máximo 255 caracteres."),
});
