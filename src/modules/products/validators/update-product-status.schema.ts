import * as yup from "yup";

export const updateProductStatusSchema = yup.object({
  isActive: yup.boolean().required("O campo isActive é obrigatório."),
});
