"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { showCustomToast } from "@/utils/toast";

import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/api";

const schema = z.object({
    oldPassword: z.string().min(1, "Informe sua senha atual"),
    newPassword: z
        .string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/[A-Z]/, "Ao menos uma letra maiúscula")
        .regex(/[a-z]/, "Ao menos uma letra minúscula")
        .regex(/[0-9]/, "Ao menos um número")
        .regex(/[\W_]/, "Ao menos um caractere especial"),
});

type FormData = z.infer<typeof schema>;

export function UpdatePasswordForm() {
    const {userData} = useUserContext()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const newPassword = watch("newPassword") || "";

    const passwordRules = [
        { label: "Mínimo 8 caracteres", test: (val: string) => val.length >= 8 },
        { label: "Ao menos uma letra maiúscula", test: (val: string) => /[A-Z]/.test(val) },
        { label: "Ao menos uma letra minúscula", test: (val: string) => /[a-z]/.test(val) },
        { label: "Ao menos um número", test: (val: string) => /[0-9]/.test(val) },
        { label: "Ao menos um caractere especial", test: (val: string) => /[\W_]/.test(val) },
    ];

    async function handlerRegister(data: { oldPassword: string; newPassword: string }) {
        try {
            if (!userData?.id) return;

            await api.put(`/password/${userData.id}`, {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });

            showCustomToast("Senha atualizada com sucesso!", "success");
        } catch (error: any) {
            const message =
                error?.response?.data?.error || "Erro ao atualizar senha. Verifique os dados informados.";
            showCustomToast(message, "error");
        }
    }
    return (
        <form onSubmit={handleSubmit(handlerRegister)} className="mt-10">
            <h4 className="text-lg font-semibold mb-4 text-defaultDarkGreen">Atualizar Senha</h4>
            <div className="flex flex-col gap-4">
                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Senha atual"
                    register={register}
                    error={errors.oldPassword?.message}
                />

                <Input
                    type="password"
                    name="newPassword"
                    placeholder="Nova senha"
                    register={register}
                    error={errors.newPassword?.message}
                />

                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    {passwordRules.map((rule, index) =>
                        !rule.test(newPassword) ? (
                            <li key={index} className="flex items-center gap-2">
                                <span className="text-red-500">•</span> {rule.label}
                            </li>
                        ) : null
                    )}
                </ul>

                <button
                    type="submit"
                    className="px-6 py-2 bg-defaultGreen text-white rounded hover:bg-defaultGreenHover transition-colors"
                >
                    Atualizar Senha
                </button>
            </div>
        </form>
    );
}