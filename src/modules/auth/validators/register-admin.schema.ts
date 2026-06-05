import * as yup from "yup";

export const registerAdminSchema = yup.object({
  name: yup.string().required("O campo name é obrigatório."),
  document: yup.string().required("O campo document é obrigatório."),
  email: yup
    .string()
    .required("O campo email é obrigatório.")
    .email("O campo email deve conter um e-mail válido."),
  phone: yup.string().required("O campo phone é obrigatório."),
  catalogClientId: yup
    .number()
    .integer("O campo catalogClientId deve ser um número inteiro.")
    .required("O campo catalogClientId é obrigatório."),
  password: yup
    .string()
    .required("O campo password é obrigatório.")
    .min(6, "O campo password deve ter no mínimo 6 caracteres."),
});
