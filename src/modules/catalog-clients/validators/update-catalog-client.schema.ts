import * as yup from "yup";

export const updateCatalogClientSchema = yup
  .object({
    name: yup.string().trim().optional(),
    slug: yup
      .string()
      .trim()
      .lowercase()
      .matches(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "O campo slug deve conter apenas letras minúsculas, números e hífens.",
      )
      .optional(),
    description: yup.string().trim().nullable().optional(),
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
