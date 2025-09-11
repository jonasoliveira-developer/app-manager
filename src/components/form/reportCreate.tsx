"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
import { showCustomToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { Textarea } from "../textarea";

const evolutionSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  day: z.string().min(1, "Dia é obrigatório"),
  month: z.string().min(1, "Mês é obrigatório"),
  year: z.string().min(4, "Ano é obrigatório"),
  text: z.string().min(1, "O texto é obrigatório"),
});

type EvolutionFormData = z.infer<typeof evolutionSchema>;

export function ReportCreate({ id }: { id: string }) {


  const { user } = useAuth();
  const {userData} = useUserContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EvolutionFormData>({
    resolver: zodResolver(evolutionSchema),
    mode: "onChange",
  });

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 10 }, (_, i) => String(2025 + i));

  async function handleRegister(data: EvolutionFormData) {
    const date = `${data.year}-${data.month}-${data.day}`;

    try {
      await api.post("/reports", {
        title: data.title,
        councilRegistrationNumber: userData?.councilRegistrationNumber,
        date,
        text: data.text,
        userId: user?.id,
        clientId: id,
      });

      showCustomToast("Evolução registrada com sucesso!", "success");
      router.back();
    } catch (error) {
      showCustomToast("Erro ao registrar evolução", "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-4 max-w-3xl mx-auto p-6 bg-white rounded shadow"
    >
      <Input
        type="text"
        name="title"
        placeholder="Título da evolução"
        error={errors.title?.message}
        register={register}
      />

      {/* Data */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dia</label>
          <select {...register("day")} className="w-full border rounded px-3 py-2">
            {days.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
          <select {...register("month")} className="w-full border rounded px-3 py-2">
            {months.map(month => <option key={month} value={month}>{month}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
          <select {...register("year")} className="w-full border rounded px-3 py-2">
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>

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
        Registrar Evolução
      </button>
    </form>
  );
}