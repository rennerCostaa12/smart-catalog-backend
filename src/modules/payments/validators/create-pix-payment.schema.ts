import * as yup from "yup";

const customerDataSchema = yup
  .object({
    name: yup.string().required("O campo customerData.name é obrigatório."),
    cpfCnpj: yup
      .string()
      .required("O campo customerData.cpfCnpj é obrigatório."),
  })
  .default(undefined);

export const createPixPaymentSchema = yup
  .object({
    customer: yup.string(),
    userId: yup
      .mixed<string | number>()
      .required("O campo userId é obrigatório."),
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
    customerData: customerDataSchema,
  })
  .test(
    "customer-or-customer-data",
    "Envie customer ou customerData para identificar o cliente.",
    (value) => Boolean(value?.customer || value?.customerData),
  );
