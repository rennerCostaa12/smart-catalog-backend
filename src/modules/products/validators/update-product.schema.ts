import * as yup from "yup";

export const updateProductSchema = yup
  .object({
    name: yup.string().trim().optional(),
    description: yup.string().trim().nullable().optional(),
    value: yup
      .number()
      .positive("O campo value deve ser maior que zero.")
      .optional(),
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
      .optional(),
    catalogClientId: yup
      .number()
      .integer("O campo catalogClientId deve ser um número inteiro.")
      .positive("O campo catalogClientId deve ser maior que zero.")
      .optional(),
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
