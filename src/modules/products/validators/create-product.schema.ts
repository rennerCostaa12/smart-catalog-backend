import * as yup from "yup";
import { allowedImageTypes, maxFileSize } from "./constants";

export const createProductSchema = yup.object({
  name: yup.string().trim().required("O campo name é obrigatório."),
  description: yup.string().trim().nullable().optional(),
  value: yup
    .number()
    .positive("O campo value deve ser maior que zero.")
    .required("O campo value é obrigatório."),
  image: yup
    .mixed<Express.Multer.File>()
    .required("O campo image é obrigatório")
    .test("fileType", "Formato inválido. Use JPG, PNG ou WEBP", (file) => {
      if (!file) return false;

      return allowedImageTypes.includes(file.mimetype);
    })
    .test("fileSize", "A imagem deve ter no máximo 2MB", (file) => {
      if (!file) return false;

      return file?.size <= maxFileSize;
    }),
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
  isActive: yup.boolean().optional()
});
