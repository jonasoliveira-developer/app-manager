"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { api } from "@/lib/api"
import { showCustomToast } from "@/utils/toast"

export const userSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string()
    .email("Digite um e-mail válido")
    .min(1, "O e-mail é obrigatório"),
  phoneNumber: z.string().regex(
    /^(\(?\d{2}\)?\s?\d{4,5}-?\d{4})$/,
    {
      message: "Formato inválido. Use (99) 99999-9999 ou variações sem parênteses/espaços",
    }
  ),

  councilRegistrationNumber: z.string().regex(
  /^\d+(F|TO)$/,
  {
    message: "Formato inválido. Deve conter apenas números seguidos de 'F' ou 'TO' (ex: 123456F ou 7890TO)",
  }
)

});


type FormData = z.infer<typeof userSchema>

export function NewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange"
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handlerRegisterCustomer(data: FormData) {
    setIsLoading(true)
    showCustomToast("Estamos realizando seu cadastro...", "info")
    try {
      await api.post("/users/create", {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        councilRegistrationNumber: data.councilRegistrationNumber,
      });

      router.replace("/login");
      showCustomToast("Sua senha de acesso foi enviada para o e-mail cadastrado!", "warning");
    } catch (error: any) {
      if (error?.response?.status == 409) {
        showCustomToast(`O e-mail ${data.email} já está cadastrado. Tente recuperar a senha ou use outro e-mail.`, "error");
      } else {
        showCustomToast("Desculpe, não conseguimos te cadastrar. Tente novamente mais tarde!", "info");
      }
    } finally {
      setIsLoading(false);
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
        className={`bg-defaultGreen text-lg my-4 px-2 h-11 rounded text-defaultWhite font-bold transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  )
}