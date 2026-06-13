import * as yup from "yup";

export const createProductSchema = yup.object({
  name: yup.string().trim().required("O campo name é obrigatório."),
  description: yup.string().trim().nullable().optional(),
  value: yup
    .number()
    .positive("O campo value deve ser maior que zero.")
    .required("O campo value é obrigatório."),
  imageUrl: yup
    .string()
    .trim()
    .url("O campo imageUrl deve conter uma URL válida.")
    .nullable()
    .optional(),
  categoriesId: yup
    .number()
    .integer("O campo categoriesId deve ser um número inteiro.")
    .positive("O campo categoriesId deve ser maior que zero.")
    .required("O campo categoriesId é obrigatório."),
  catalogClientId: yup
    .number()
    .integer("O campo catalogClientId deve ser um número inteiro.")
    .positive("O campo catalogClientId deve ser maior que zero.")
    .required("O campo catalogClientId é obrigatório."),
});
