import * as yup from "yup";

export const createCatalogClientSchema = yup.object({
  name: yup.string().trim().required("O campo name é obrigatório."),
  slug: yup
    .string()
    .trim()
    .lowercase()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "O campo slug deve conter apenas letras minúsculas, números e hífens.",
    )
    .required("O campo slug é obrigatório."),
  description: yup.string().trim().nullable().optional(),
});
