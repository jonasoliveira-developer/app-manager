"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { showCustomToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { Textarea } from "../textarea";

const evolutionSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  councilRegistrationNumber: z.string().min(1, "O registro é obrigatório"),
  day: z.string().min(1, "Dia é obrigatório"),
  month: z.string().min(1, "Mês é obrigatório"),
  year: z.string().min(4, "Ano é obrigatório"),
  text: z.string().min(1, "O texto é obrigatório"),
});

type EvolutionFormData = z.infer<typeof evolutionSchema>;

export function ReportUpdateForm({ evaluate }: { evaluate: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EvolutionFormData>({
    resolver: zodResolver(evolutionSchema),
    mode: "onChange",
  });

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 10 }, (_, i) => String(2025 + i));

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/${evaluate}`);
        const report = res.data;

        const [year, month, day] = report.date.split("-");

        const defaultValues: EvolutionFormData = {
          title: report.title,
          councilRegistrationNumber: report.councilRegistrationNumber,
          day,
          month,
          year,
          text: report.text,
        };

        reset(defaultValues);
      } catch (error) {
        showCustomToast("Erro ao carregar relatório", "error");
      } finally {
        setLoading(false);
      }
    };

    if (evaluate) fetchReport();
  }, [evaluate, reset]);

  async function handleUpdate(data: EvolutionFormData) {
    const date = `${data.year}-${data.month}-${data.day}`;

    try {
      await api.put(`/reports/${evaluate}`, {
        title: data.title,
        councilRegistrationNumber: data.councilRegistrationNumber,
        date,
        text: data.text,
        userId: user?.id,
      });

      reset(data); // limpa o estado do formulário com os dados atualizados
      showCustomToast("Relatório atualizado com sucesso!", "success");
      router.back();
    } catch (error) {
      showCustomToast("Erro ao atualizar relatório", "error");
    }
  }

  if (loading) return <p className="text-center">Carregando...</p>;

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="flex flex-col gap-4 max-w-3xl mx-auto p-6 bg-white rounded shadow"
    >
      <Input
        type="text"
        name="title"
        placeholder="Título da evolução"
        error={errors.title?.message}
        register={register}
      />

      <Textarea
        name="text"
        placeholder="Descrição da evolução"
        error={errors.text?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-defaultGreen text-white px-4 py-2 rounded hover:bg-defaultGreenHover transition-colors"
      >
        Atualizar evolução
      </button>
    </form>
  );
}