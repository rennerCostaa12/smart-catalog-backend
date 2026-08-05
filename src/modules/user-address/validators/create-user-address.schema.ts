import * as yup from "yup";

export const createUserAddressSchema = yup.object({
  label: yup.string().trim().required("O campo label é obrigatório."),
  address: yup.string().trim().required("O campo address é obrigatório."),
  neighborhood: yup
    .string()
    .trim()
    .required("O campo neighborhood é obrigatório."),
  complement: yup.string().trim().nullable().optional(),
  city: yup.string().trim().required("O campo city é obrigatório."),
  state: yup.string().trim().required("O campo state é obrigatório."),
  number: yup.number().required("O campo number é obrigatório."),
  postalCode: yup.string().trim().required("O campo postalCode é obrigatório."),
  userId: yup
    .number()
    .integer("O campo userId deve ser um número inteiro.")
    .positive("O campo userId deve ser maior que zero.")
    .required("O campo userId é obrigatório."),
});
