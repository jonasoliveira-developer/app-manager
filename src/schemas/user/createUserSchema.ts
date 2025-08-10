import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),

  email: z.email("Digite um e-mail válido")
    .min(1, "O e-mail é obrigatório"),

  password: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter ao menos um número")
    .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial"),

  phoneNumber: z.string().regex(
    /^\+55\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    {
      message: 'Formato inválido. Use +55 (DD) 99999-9999 ou variações sem parênteses/espaços',
    }
  ).optional(),

  age: z.string().regex(/^\d+$/, {
    message: "Idade deve conter apenas números",
  }).optional(),

  weight: z.string().regex(/^\d{2,3}kg$/, {
    message: "Peso deve estar no formato correto (ex: 82kg)",
  }).optional(),

  height: z.string().regex(/^\d\.\d{2}m$/, {
    message: "Altura deve estar no formato correto (ex: 1.75m)",
  }).optional(),

  local: z.string().min(1, "Localização é obrigatória").optional(),

  councilRegistrationNumber: z.string().regex(
    /^[A-Z]{2}-\d{6}$/,
    {
      message: 'Formato inválido. Use UF-123456 (ex: BA-123456)',
    }
  ).optional(),

  subscriptionType: z.enum(["BASIC", "PREMIUM", "ENTERPRISE"])
    .optional(),

  imageProfile: z.string().url("URL da imagem inválida").optional(),

  userId: z.string().uuid("ID do usuário inválido").optional(),
});