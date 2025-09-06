"use client"

import { Container } from "@/components/container"
import Footer from "@/components/footer";
import { LoginForm } from "@/components/form/login"
import Link from "next/link";

export default function LoginPage() {
    return (
        <>
            <Container>
                <main
                    className="w-full flex flex-col items-center justify-center px-4"
                    style={{ height: "calc(100vh - 8.5rem)" }}
                >
                    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-300/40 backdrop-blur-sm p-6">
                        <Link href="/" className="mb-6 block w-fit mx-auto">
                            <h1 className="text-3xl font-bold text-defaultGreen text-center">
                                Fisio<span className="text-defaultBlack">Admin</span>
                            </h1>
                        </Link>

                        <LoginForm />

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Não tem uma conta?
                            <Link
                                href="/user/create"
                                className="text-blue-500 ml-1 font-semibold"
                            >
                                cadastre-se
                            </Link>
                        </p>
                    </div>
                </main>
            </Container>

            <Footer />
        </>
    );
}