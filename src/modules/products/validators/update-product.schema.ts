import * as yup from "yup";
import { allowedImageTypes, maxFileSize } from "./constants";

export const updateProductSchema = yup
  .object({
    name: yup.string().trim().optional(),
    description: yup.string().trim().nullable().optional(),
    value: yup
      .number()
      .positive("O campo value deve ser maior que zero.")
      .optional(),
    image: yup
      .mixed<Express.Multer.File>()
      .optional()
      .test("fileType", "Formato inválido. Use JPG, PNG ou WEBP", (file) => {
        if (!file) return true;

        return allowedImageTypes.includes(file.mimetype);
      })
      .test("fileSize", "A imagem deve ter no máximo 2MB", (file) => {
        if (!file) return true;

        return file.size <= maxFileSize;
      }),
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
    isActive: yup.boolean().optional()
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
