"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/assets/hero.svg";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function Home() {
  const router = useRouter();
  const { logout, user } = useAuth();

  useEffect(() => {
    logout(); // destrói o token e limpa o contexto
  }, []);

  return (
    <>
      <Header />

      <main className="w-full bg-defaultWhite p-5">
        {/* Hero */}
        <div className="max-w-7xl m-auto mt-8 text-center py-5">
          <h1 className="font-semibold text-5xl leading-tight">
            Automatize sua rotina com a nossa gestão inteligente e conquiste mais tempo para o que importa.
          </h1>
          <p className="mt-9 text-xl font-semibold leading-relaxed">
            Transforme a forma como você gerencia seus atendimentos com uma solução ágil, intuitiva e feita para facilitar sua rotina.
          </p>
          <Link href="/user/create">
            <button className="bg-defaultDarkGreen px-5 mt-9 h-16 rounded-lg text-xl font-semibold text-defaultWhite md:text-2xl w-full max-w-2xl">
              Teste gratuitamente por 30 dias.
            </button>
          </Link>
          <p className="mt-3 mb-2 text-lg leading-relaxed">
            E fique tranquilo — não pedimos seu cartão para testar.
          </p>
        </div>

        {/* ... restante da página continua igual ... */}
      </main>
    </>
  );
}