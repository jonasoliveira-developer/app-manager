"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/input"
import { useRouter } from "next/navigation"

import { api } from "@/lib/api"

const userSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),

  email: z.string()
    .email("Digite um e-mail válido")
    .min(1, "O e-mail é obrigatório"),

  password: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter ao menos um número")
    .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial"),

  phoneNumber: z.string().regex(
    /^(\(?\d{2}\)?\s?\d{4,5}-?\d{4})$/,
    {
      message: 'Formato inválido. Use (99) 99999-9999 ou variações sem parênteses/espaços',
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
    /^\d+$/,
    {
      message: 'Formato inválido. Deve conter apenas números (ex: 123456)',
    }
  ).optional(),

  subscriptionType: z.enum(["BASIC", "PREMIUM", "ENTERPRISE"]).optional(),

  imageProfile: z.string().url("URL da imagem inválida").optional(),

  userId: z.string().uuid("ID do usuário inválido").optional(),
});

type FormData = z.infer<typeof userSchema>

export function NewUseru() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange"
  })

  const router = useRouter()

  async function handlerRegisterCustomer(data: FormData) {
    try {

     await api.post("/users/create", {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        councilRegistrationNumber: data.councilRegistrationNumber,
      })
      router.replace("/login")
    } catch (error) {
      console.error("Erro na requisição:", error);
    }



  }

  return (
    <form className="flex flex-col gap-2 w-full max-w-3xl" onSubmit={handleSubmit(handlerRegisterCustomer)}>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />

      <Input
        type="email"
        name="email"
        placeholder="Digite o e-mail"
        error={errors.email?.message}
        register={register}
      />

      <Input
        type="password"
        name="password"
        placeholder="Digite a senha"
        error={errors.password?.message}
        register={register}
      />

      <Input
        type="text"
        name="phoneNumber"
        placeholder="Digite o número de telefone"
        error={errors.phoneNumber?.message}
        register={register}
      />

      <Input
        type="text"
        name="councilRegistrationNumber"
        placeholder="Digite o número do registro no conselho"
        error={errors.councilRegistrationNumber?.message}
        register={register}
      />

      <button
        className="bg-defaultGreen text-lg my-4 px-2 h-11 rounded text-defaultWhite font-bold"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  )
}