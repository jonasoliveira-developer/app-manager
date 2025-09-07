"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { use, useEffect } from "react";

const userSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório").optional(),

  phoneNumber: z
    .string()
    .regex(/^(\(?\d{2}\)?\s?\d{4,5}-?\d{4})$/, {
      message: "Formato inválido. Use (99) 99999-9999 ou variações sem parênteses/espaços",
    })
    .optional(),

  councilRegistrationNumber: z
    .string()
    .regex(/^\d+$/, {
      message: "Formato inválido. Deve conter apenas números (ex: 123456)",
    })
    .optional(),

  subscriptionType: z.enum(["BASIC", "PREMIUM", "FREE"]).optional(),
});

type FormData = z.infer<typeof userSchema>;

export function EditUser() {
  const router = useRouter();
  const { userData, fetchUser } = useUserContext();
  const {user} = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        councilRegistrationNumber: userData.councilRegistrationNumber,
        subscriptionType: userData.subscriptionType,
      });
    }
  }, [userData, reset]);

  async function handlerRegisterCustomer(data: FormData) {
    try {
      await api.put(`/users/${userData?.id}`, {
        name: data.name,
        phoneNumber: data.phoneNumber,
        councilRegistrationNumber: data.councilRegistrationNumber,
        subscriptionType: data.subscriptionType,
      });
      if (!user?.id) return;
      await fetchUser(user?.id); // Atualiza o contexto com os dados mais recentes

      showCustomToast("Dados atualizados com sucesso!", "success");
      router.replace("/user/profile");
    } catch (error) {
      showCustomToast("Erro ao atualizar dados", "error");
    }
  }

  if (!userData) {
    return <p className="text-gray-500">Carregando dados do usuário...</p>;
  }

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-3xl"
      onSubmit={handleSubmit(handlerRegisterCustomer)}
    >
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
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

      <Input
        type="text"
        name="subscriptionType"
        placeholder="Tipo de assinatura (BASIC, PREMIUM, FREE)"
        error={errors.subscriptionType?.message}
        register={register}
      />

      <button
        className="bg-defaultGreen text-lg my-4 px-4 h-11 rounded text-defaultWhite font-bold hover:bg-green-600 transition-colors"
        type="submit"
      >
        Atualizar Dados
      </button>
    </form>
  );
}