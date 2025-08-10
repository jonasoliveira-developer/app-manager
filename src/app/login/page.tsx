"use client"

import { Container } from "@/components/container"
import { LoginForm } from "@/components/form/login"
import Link from "next/link"
import { useState } from "react"

export default function Login() {
    const [loading, setLoanding] = useState<boolean>(false)

    return (
        <Container>
            <main  className=" w-full flex flex-col mb-1  items-center justify-center " style={{ height: 'calc(100vh - 8.5rem)' }}>
                <h1 className="text-2xl md:text-3xl font-semibold">
                    Bem vindo
                </h1>
                <LoginForm />
                <p>Não tem uma conta?<Link href="/user/create" className="text-blue-500 ml-1 font-semibold">cadastre-se</Link></p>
            </main>
        </Container>
    )
}