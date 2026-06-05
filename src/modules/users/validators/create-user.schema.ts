import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup.string().required("O campo name é obrigatório."),
  email: yup
    .string()
    .required("O campo email é obrigatório.")
    .email("O campo email deve conter um e-mail válido."),
  phone: yup.string().required("O campo phone é obrigatório."),
});
