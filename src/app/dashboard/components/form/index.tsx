"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { userSchema } from "@/schemas/user/createUserSchema"
import { Input } from "@/components/input"


type FormData = z.infer<typeof userSchema>

export function NewCustomForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(userSchema),
    });

    function handlerRegisterCustomer (data: FormData) {
        console.log(data)

    }

    return (
        <form className="flex flex-col w-full max-w-3xl" onSubmit={handleSubmit(handlerRegisterCustomer)}>
            <div className="w-full mt-2">
                <Input
                    type="text"
                    name="name"
                    placeholder="Digite o nome completo"
                    error={errors.name?.message}
                    register={register}
                />
            </div>

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
                    placeholder="Digite a senha"
                    error={errors.password?.message}
                    register={register}
                />
            </div>

            <div className="w-full mt-2">
                <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="Digite o número de telefone"
                    error={errors.phoneNumber?.message}
                    register={register}
                />
            </div>

            <div className="w-full mt-2">
                <Input
                    type="text"
                    name="age"
                    placeholder="Digite a idade"
                    error={errors.age?.message}
                    register={register}
                />
            </div>

            <div className="w-full mt-2">
                <Input
                    type="text"
                    name="weight"
                    placeholder="Digite o peso (ex: 82kg)"
                    error={errors.weight?.message}
                    register={register}
                />
            </div>

            <div className="w-full mt-2">
                <Input
                    type="text"
                    name="height"
                    placeholder="Digite a altura (ex: 1.75m)"
                    error={errors.height?.message}
                    register={register}
                />
            </div>

            <div className="w-full mt-2">
                <Input
                    type="text"
                    name="local"
                    placeholder="Digite a localização"
                    error={errors.local?.message}
                    register={register}
                />
            </div>

            <button 
            className="bg-defaultGreen text-lg my-4 px-2 h-11 rounded text-defaultWhite font-bold"
            type="submit"
            >
                Cadastrar
            </button>

        </form>
    )
}