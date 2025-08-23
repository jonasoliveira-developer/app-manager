"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { showCustomToast } from "@/utils/toast";
import { useRouter } from "next/navigation";

const carePlanSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    startDay: z.string().min(1),
    startMonth: z.string().min(1),
    startYear: z.string().min(4),
    expectedEndDay: z.string().min(1),
    expectedEndMonth: z.string().min(1),
    expectedEndYear: z.string().min(4),
});

type CarePlanFormData = z.infer<typeof carePlanSchema>;

export function CarePlanCreate({ params }: { params: { id: string } }) {
    const { user } = useAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CarePlanFormData>({
        resolver: zodResolver(carePlanSchema),
        mode: "onChange",
    });

    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
    const years = Array.from({ length: 10 }, (_, i) => String(2025 + i));

    async function handlerRegister(data: CarePlanFormData) {
        const startDate = `${data.startYear}-${data.startMonth}-${data.startDay}`;
        const expectedEndDate = `${data.expectedEndYear}-${data.expectedEndMonth}-${data.expectedEndDay}`;

        try {
            await api.post("/care-plans", {
                title: data.title,
                userId: user?.id,
                clientId:params.id,
                startDate: startDate,
                expectedEndDate: expectedEndDate,

            });
            showCustomToast("Plano de atendimento criado com sucesso!", "success");
            router.replace(`/dashboard/clients/profile/${params.id}`);
        } catch (error) {
            showCustomToast("Erro ao cadastrar plano de atendimento", "error");
        }
    }

    return (
        <form onSubmit={handleSubmit(handlerRegister)} className="flex flex-col gap-4 max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <Input
                type="text"
                name="title"
                placeholder="Título do plano"
                error={errors.title?.message}
                register={register}
            />
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dia início</label>
                    <select {...register("startDay")} className="w-full border rounded px-3 py-2">
                        {days.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mês início</label>
                    <select {...register("startMonth")} className="w-full border rounded px-3 py-2">
                        {months.map(month => <option key={month} value={month}>{month}</option>)}
                    </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ano início</label>
                    <select {...register("startYear")} className="w-full border rounded px-3 py-2">
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dia fim</label>
                    <select {...register("expectedEndDay")} className="w-full border rounded px-3 py-2">
                        {days.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mês fim</label>
                    <select {...register("expectedEndMonth")} className="w-full border rounded px-3 py-2">
                        {months.map(month => <option key={month} value={month}>{month}</option>)}
                    </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ano fim</label>
                    <select {...register("expectedEndYear")} className="w-full border rounded px-3 py-2">
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="bg-defaultGreen text-white px-4 py-2 rounded hover:bg-defaultGreenHover transition-colors"
            >
                Criar Plano de Cuidados
            </button>
        </form>
    );
}