"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";
import { ColorPicker } from "@/app/dashboard/clients/profile/components/ColorPicker";

const scheduleSchema = z.object({
    dayOfWeek: z.string().min(1, "Selecione o dia da semana"),
    sessionTime: z.string().min(1, "Informe o horário"),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Selecione uma cor hexadecimal válida"),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

type Props = {
    carePlanId: string;
    onSuccess: () => void;
};

export function CreateCalendarForm({ carePlanId, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema),
        mode: "onChange",
        defaultValues: {
            dayOfWeek: "",
            sessionTime: "",
            color: "",
        },
    });

    const daysOfWeek = [
        "segunda-feira", "terça-feira", "quarta-feira",
        "quinta-feira", "sexta-feira", "sábado", "domingo",
    ];

    async function handleRegister(data: ScheduleFormData) {
        try {
            await api.post("/schedules", {
                ...data,
                carePlanId,
            });

            showCustomToast("Cronograma criado com sucesso!", "success");
            onSuccess();
        } catch (error: any) {
            const title = error?.response?.data?.title;
            showCustomToast(title || "Erro inesperado ao salvar agenda", "error");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-4 max-w-2xl mx-auto p-6 bg-white rounded shadow"
        >
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Dia da semana</label>
                <select {...register("dayOfWeek")} className="w-full border rounded px-3 py-2">
                    <option value="">Selecione</option>
                    {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </option>
                    ))}
                </select>
                {errors.dayOfWeek && (
                    <span className="text-sm text-red-500">{errors.dayOfWeek.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="sessionTime" className="text-sm font-medium text-gray-700">
                    Horário da sessão
                </label>
                <Input
                    type="time"
                    name="sessionTime"
                    placeholder="Horário da sessão"
                    error={errors.sessionTime?.message}
                    register={register}
                />
            </div>


            <ColorPicker
                value={watch("color")}
                onChange={(color) => setValue("color", color, { shouldValidate: true })}
                error={errors.color?.message}
            />

            <button
                type="submit"
                className="bg-defaultGreen text-white px-4 py-2 rounded hover:bg-defaultGreenHover transition-colors"
            >
                Adicionar Sessão
            </button>
        </form>
    );
}