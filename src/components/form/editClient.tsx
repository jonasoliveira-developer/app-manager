"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";


export interface ClientFormData {
  id: string;
  name: string;
  phoneNumber?: string;
  age?: string;
  weight?: string;
  height?: string;
  local?: string;
}



const userSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),

  phoneNumber: z
    .string()
    .regex(/^(\(?\d{2}\)?\s?\d{4,5}-?\d{4})$/, {
      message: "Formato inválido. Use (99) 99999-9999 ou variações sem parênteses/espaços",
    }),

  email: z.string()
    .email("Digite um e-mail válido")
    .min(1, "O e-mail é obrigatório"),

  password: z.string().optional().refine((val) => {
    if (!val || val.trim() === "") return true; // aceita vazio
    return (
      val.length >= 8 &&
      /[A-Z]/.test(val) &&
      /[a-z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[\W_]/.test(val)
    );
  }, {
    message: "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial",
  }),

  age: z.string().regex(/^\d+$/, {
    message: "Idade deve conter apenas números",
  }),

  weight: z.string().regex(/^\d{2,3}$/, {
    message: "Peso deve conter apenas números (ex: 82)",
  }).optional(),

  height: z.string().regex(/^\d\.\d{2}$/, {
    message: "Altura deve estar no formato correto (ex: 1.75)",
  }).optional(),

  local: z.string().min(1, "Localização é obrigatória").optional(),

  imageProfile: z.string().url("URL da imagem inválida").optional(),

  userId: z.string().uuid("ID do usuário inválido").optional(),
});

type FormData = z.infer<typeof userSchema>;

export function EditClient({ params }: { params: { id: string } }) {



  const router = useRouter();

  const { user } = useAuth()

  const [loading, setLoading] = useState(true);

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
    async function fetchClient() {
      try {
        const response = await api.get(`/clients/${params.id}`);

        reset({
          name: response.data.name,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
          age: response.data.age,
          weight: response.data.weight,
          height: response.data.height,
          local: response.data.local
        });
      } catch (error) {
        showCustomToast("Erro ao carregar dados do usuário", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchClient();
  }, [params.id, reset]);

  async function handlerRegister(data: FormData) {
    try {
      await api.put(`/clients/${params.id}`, {
        name: data.name,
        phoneNumber: data.phoneNumber,
        age: data.age,
        weight: data.weight,
        height: data.height,
        local: data.local,
      });


      showCustomToast("Paciente atualizado com sucesso!", "success");
      router.replace(`/dashboard/clients/profile/${params.id}`);
    } catch (error) {
      showCustomToast("Erro ao cadastrar paciente", "error");
    }
  }

  return (
    <form className="flex flex-col gap-3 w-full max-w-3xl" onSubmit={handleSubmit(handlerRegister)}>
      <Input type="text" name="name" placeholder="Nome completo" error={errors.name?.message} register={register} />
      <Input type="text" name="phoneNumber" placeholder="Telefone" error={errors.phoneNumber?.message} register={register} />
      <Input type="email" name="email" placeholder="Digite o e-mail" error={errors.email?.message} register={register} />
      <Input type="password" name="password" placeholder="Digite sua senha" error={errors.password?.message} register={register} />
      <Input type="text" name="age" placeholder="Idade" error={errors.age?.message} register={register} />
      <Input type="text" name="weight" placeholder="Peso (ex: 82)" error={errors.weight?.message} register={register} />
      <Input type="text" name="height" placeholder="Altura (ex: 1.75)" error={errors.height?.message} register={register} />
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