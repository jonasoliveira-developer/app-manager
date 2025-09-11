'use client';

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
  const [signedByClient, setSignedByClient] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EvolutionFormData>({
    resolver: zodResolver(evolutionSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/${evaluate}`);
        const report = res.data;

        if (report.assignUrlClient) {
          setSignedByClient(true);
        }

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
        setLoadError(true);
        showCustomToast("Erro ao carregar relatório", "error");
      } finally {
        setLoading(false);
      }
    };

    if (evaluate) fetchReport();
  }, [evaluate, reset]);

  async function handleUpdate(data: EvolutionFormData) {
    setIsSubmitting(true);
    const date = `${data.year}-${data.month}-${data.day}`;

    try {
      await api.put(`/reports/${evaluate}`, {
        title: data.title,
        councilRegistrationNumber: data.councilRegistrationNumber,
        date,
        text: data.text,
        userId: user?.id,
      });

      reset(data);
      showCustomToast("Relatório atualizado com sucesso!", "success");
      router.back();
    } catch (error) {
      showCustomToast("Erro ao atualizar relatório", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <p className="text-center">Carregando...</p>;

  if (loadError)
    return (
      <p className="text-center text-red-400">
        Erro ao carregar relatório. Por segurança, exclua e faça novamente.
      </p>
    );

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
        disabled={signedByClient}
      />

      <Input
        type="text"
        name="councilRegistrationNumber"
        placeholder="Registro do profissional"
        error={errors.councilRegistrationNumber?.message}
        register={register}
        disabled={signedByClient}
      />

      <div className="flex gap-4">
        <Input
          type="text"
          name="day"
          placeholder="Dia"
          error={errors.day?.message}
          register={register}
          disabled={signedByClient}
        />
        <Input
          type="text"
          name="month"
          placeholder="Mês"
          error={errors.month?.message}
          register={register}
          disabled={signedByClient}
        />
        <Input
          type="text"
          name="year"
          placeholder="Ano"
          error={errors.year?.message}
          register={register}
          disabled={signedByClient}
        />
      </div>

      <Textarea
        name="text"
        placeholder="Descrição da evolução"
        error={errors.text?.message}
        register={register}
        disabled={signedByClient}
      />

      {signedByClient && (
        <p className="text-center text-red-400">
          Relatórios assinados pelo cliente são bloqueados para edição.
          Para garantir a integridade das informações, recomendamos excluí-lo e gerar um novo, se necessário.
        </p>
      )}

      <button
        type="submit"
        className={`bg-defaultGreen text-white px-4 py-2 rounded transition-colors ${signedByClient || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-defaultGreenHover"
          }`}
        disabled={signedByClient || isSubmitting}
      >
        {isSubmitting ? "Atualizando..." : "Atualizar evolução"}
      </button>
    </form>
  );
}