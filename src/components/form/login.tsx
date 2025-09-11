"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";

import Cookies from "js-cookie";



const userSchema = z.object({
    email: z
        .string()
        .email("Digite um e-mail válido")
        .min(1, "O e-mail é obrigatório"),

    password: z
        .string()
        .min(8)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[0-9]/)
        .regex(/[\W_]/),
});

type FormData = z.infer<typeof userSchema>;

export function LoginForm() {
    const { fetchUser } = useUserContext();
    const { login } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(userSchema),
        mode: "onChange",
    });

    const [isLoading, setIsLoading] = useState(false);
    const password = watch("password") || "";

    const passwordRules = [
        { label: "Mínimo 8 caracteres", test: (val: string) => val.length >= 8 },
        { label: "Ao menos uma letra maiúscula", test: (val: string) => /[A-Z]/.test(val) },
        { label: "Ao menos uma letra minúscula", test: (val: string) => /[a-z]/.test(val) },
        { label: "Ao menos um número", test: (val: string) => /[0-9]/.test(val) },
        { label: "Ao menos um caractere especial", test: (val: string) => /[\W_]/.test(val) },
    ];

    async function handlerAuthUser(data: FormData) {
        setIsLoading(true);
        try {
            const loggedUser = await login(data.email, data.password);
            showCustomToast("Aguarde enquanto preparamos seu ambiente.", "info");

            


            if (loggedUser?.accessLevel === "ROLE_USER") {
                void fetchUser(loggedUser.id);
                router.replace("/dashboard");
            }
            else if (loggedUser?.accessLevel === "ROLE_CLIENT") {
                router.replace(`/dashboard/clients/profile/${loggedUser.id}`);
            }
            showCustomToast("Tudo pronto, seja bem vindo(a)!", "success");
        } catch (error) {
            showCustomToast("Erro ao autenticar. Verifique suas credenciais.", "error");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <form className="flex flex-col w-full max-w-2xl" onSubmit={handleSubmit(handlerAuthUser)}>
            <div className="w-full mt-2">
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite o e-mail"
                    register={register}
                />
            </div>

            <div className="w-full mt-2">
                <Input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    register={register}
                />

                {/* Regras de senha dinâmicas */}
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    {passwordRules.map((rule, index) =>
                        !rule.test(password) ? (
                            <li key={index} className="flex items-center gap-2">
                                <span className="text-red-500">•</span> {rule.label}
                            </li>
                        ) : null
                    )}
                </ul>
            </div>

            <div className="w-full mt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-defaultGreen text-lg h-11 rounded text-defaultWhite font-bold transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? "Entrando..." : "Entrar"}
                </button>
            </div>
        </form>
    );
}