"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";


const userSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.email("Digite um e-mail válido").min(1, "O e-mail é obrigatório"),
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
  imageProfile: z.string().url("URL da imagem inválida").optional(),
  userId: z.string().uuid("ID do usuário inválido").optional(),
});

type FormData = z.infer<typeof userSchema>;

export function NewClient() {
  const router = useRouter();
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  async function handlerRegister(data: FormData) {
    try {
      await api.post("/clients", {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        age: data.age,
        weight: data.weight,
        height: data.height,
        local: data.local,
        userId: user?.id,


      });
      showCustomToast("Paciente realizado com sucesso!", "success");
      router.replace("/dashboard/clients");
    } catch (error) {
      showCustomToast("Erro ao cadastrar paciente", "error");
    }
  }

  return (
    <form className="flex flex-col gap-3 w-full max-w-3xl" onSubmit={handleSubmit(handlerRegister)}>
      <Input type="text" name="name" placeholder="Nome completo" error={errors.name?.message} register={register} />
      <Input type="email" name="email" placeholder="E-mail" error={errors.email?.message} register={register} />
      <Input type="password" name="password" placeholder="Senha" error={errors.password?.message} register={register} />
      <Input type="text" name="phoneNumber" placeholder="Telefone" error={errors.phoneNumber?.message} register={register} />
      <Input type="text" name="age" placeholder="Idade" error={errors.age?.message} register={register} />
      <Input type="text" name="weight" placeholder="Peso (ex: 82kg)" error={errors.weight?.message} register={register} />
      <Input type="text" name="height" placeholder="Altura (ex: 1.75m)" error={errors.height?.message} register={register} />
      <Input type="text" name="local" placeholder="Localização" error={errors.local?.message} register={register} />
      <button
        className="bg-defaultGreen text-lg my-2 px-4 h-11 rounded text-defaultWhite font-bold hover:bg-green-600 transition-colors"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}