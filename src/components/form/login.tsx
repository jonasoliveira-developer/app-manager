"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/input"
import { useRouter } from "next/navigation"
import { showCustomToast } from "@/utils/toast"

import { useAuth } from "@/context/AuthContext";


const userSchema = z.object({

    email: z
        .email("Digite um e-mail válido")
        .min(1, "O e-mail é obrigatório"),

    password: z.string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter ao menos um número")
        .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial"),

});

type FormData = z.infer<typeof userSchema>



export function LoginForm() {
    const { login, user } = useAuth();


    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(userSchema),
        mode: "onChange"
    });


    async function handlerAuthUser(data: FormData) {
        try {
            const loggedUser = await login(data.email, data.password);
            showCustomToast("Seja bem vindes.", "success");
            if(loggedUser?.accessLevel == "ROLE_CLIENT") router.replace(`/dashboard/clients/profile/${loggedUser.id}`);
            if(loggedUser?.accessLevel == "ROLE_USER") router.replace("/dashboard");
        } catch (error: any) {
            showCustomToast("Ops! Não foi possível fazer login. Verifique seus dados e tente novamente.", "error");
        }
    }

    return (
        <form className="flex flex-col w-full max-w-2xl" onSubmit={handleSubmit(handlerAuthUser)}>

            <div className="w-full mt-2">
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite o e-mail"
                    error={errors.email?.message}
                    register={register}
                />
            </div>

            <div className="w-full mt-2">

                <Input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha (Mín. 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 símbolo"
                    error={errors.password?.message}
                    register={register}
                />

            </div>
            <button
                type="submit"
                className="bg-defaultGreen text-lg my-4 px-2 h-11 rounded text-defaultWhite font-bold"

            >
                Entrar
            </button>

        </form>
    )
}