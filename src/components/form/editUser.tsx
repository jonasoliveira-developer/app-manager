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
import { useEffect } from "react";
import { ImageUploader } from "../ImageUploader";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

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

  biography: z.string().max(500, "Máximo de 500 caracteres").optional(),

  aboutMe: z.string().max(1000, "Máximo de 1000 caracteres").optional(),
});

type FormData = z.infer<typeof userSchema>;

export function EditUser() {
  const router = useRouter();
  const { userData, fetchUser } = useUserContext();
  const { user } = useAuth();

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
    async function loadUser() {
      if (!user?.id) return;

      try {
        const response = await api.get(`/users/${user.id}`);
        const userFetched = response.data;

        reset({
          name: userFetched.name,
          phoneNumber: userFetched.phoneNumber,
          councilRegistrationNumber: userFetched.councilRegistrationNumber,
          subscriptionType: userFetched.subscriptionType,
          biography: userFetched.biography,
          aboutMe: userFetched.aboutMe,
        });
      } catch (error) {
        showCustomToast("Erro ao carregar dados do usuário", "error");
      }
    }

    loadUser();
  }, [user?.id, reset]);

  async function handlerRegisterCustomer(data: FormData) {
    try {
      await api.put(`/users/${userData?.id}`, {
        name: data.name,
        phoneNumber: data.phoneNumber,
        councilRegistrationNumber: data.councilRegistrationNumber,
        subscriptionType: data.subscriptionType,
        biography: data.biography,
        aboutMe: data.aboutMe,
      });

      if (!user?.id) return;
      await fetchUser(user.id);

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
    <>
    <ImageUploader />
    <form
      className="flex flex-col gap-4 w-full max-w-3xl mt-3"
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

      <div className="flex flex-col gap-1">
        <textarea
          id="biography"
          {...register("biography")}
          maxLength={500}
          placeholder="Descreva brevemente sua experiência ou formação"
          className={`resize-none border rounded px-3 py-2 text-sm ${errors.biography ? "border-red-500" : "border-gray-300"
            }`}
          rows={4}
        />
        <span className="text-xs text-gray-500">Máximo de 500 caracteres</span>
        {errors.biography && <span className="text-red-500 text-sm">{errors.biography.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          id="aboutMe"
          {...register("aboutMe")}
          maxLength={1000}
          placeholder="Fale sobre seus interesses, estilo de trabalho ou visão profissional"
          className={`resize-none border rounded px-3 py-2 text-sm ${errors.aboutMe ? "border-red-500" : "border-gray-300"
            }`}
          rows={6}
        />
        <span className="text-xs text-gray-500">Máximo de 1000 caracteres</span>
        {errors.aboutMe && <span className="text-red-500 text-sm">{errors.aboutMe.message}</span>}
      </div>

      <button
        className="bg-defaultGreen text-lg my-4 px-4 h-11 rounded text-defaultWhite font-bold hover:bg-green-600 transition-colors"
        type="submit"
      >
        Atualizar Dados
      </button>
    </form>
      
    </>
  );
}