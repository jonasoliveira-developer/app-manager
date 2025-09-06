"use client";

import Link from "next/link";
import Image from "next/image";
import Hero from "@/assets/hero.svg";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

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

        {/* Benefícios */}
        <div className="max-w-7xl min-h-[70vh] m-auto mt-20 flex flex-col md:flex-row justify-around text-center gap-5 items-center">
          <h2 className="font-semibold text-6xl leading-snug">
            <span className="font-extrabold text-defaultDarkGreen">Otimize seu tempo,</span> atenda melhor seus pacientes e tenha mais qualidade de vida.
          </h2>
          <Image src={Hero} alt="Imagem de um gerenciamento online" width={600} />
        </div>

        {/* Funcionalidades - Verde */}
        <div className="w-full min-h-[80vh] mt-20 p-4 bg-defaultGreen rounded-3xl text-center flex items-center justify-center flex-col">
          <h1 className="font-semibold text-5xl text-defaultWhite mb-12 leading-tight">
            Tudo que você precisa em um só lugar
          </h1>
          <div className="w-full flex flex-col items-center justify-center gap-4 md:flex-row">
            {[...Array(3)].map((_, i) => (
              <ul key={i} className="w-full max-w-80 p-5 bg-defaultWhite text-center rounded-3xl">
                <h2 className="font-bold text-xl mb-3">Agendamentos</h2>
                {[...Array(4)].map((_, j) => (
                  <li key={j} className="text-base leading-relaxed">
                    Agende seus pacientes com facilidade e envie notificações
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Funcionalidades - Branco */}
        <div className="w-full min-h-[80vh] mt-20 p-4 bg-defaultWhite rounded-3xl text-center flex items-center justify-center flex-col">
          <h1 className="font-semibold text-5xl text-defaultDarkGreen mb-12 leading-tight">
            Tudo que você precisa em um só lugar
          </h1>
          <div className="w-full flex flex-col items-center justify-center gap-4 md:flex-row">
            {[...Array(3)].map((_, i) => (
              <ul key={i} className="w-full max-w-80 p-5 bg-defaultGreen text-defaultWhite text-center rounded-3xl">
                <h2 className="font-bold text-xl mb-3">Agendamentos</h2>
                {[...Array(4)].map((_, j) => (
                  <li key={j} className="text-base leading-relaxed">
                    Agende seus pacientes com facilidade e envie notificações
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Formulário de contato */}
        <div className="w-full mt-20 p-4 bg-defaultGreen rounded-3xl text-center flex items-center justify-center flex-col text-defaultWhite">
          <h2 className="font-semibold text-5xl mb-8 leading-tight">Fale com a gente</h2>
          <p className="text-lg mb-6 max-w-2xl">
            Quer saber mais ou tirar dúvidas? Envie sua mensagem e entraremos em contato.
          </p>
          <form className="w-full max-w-2xl flex flex-col gap-4">
            <input
              type="text"
              placeholder="Título"
              className="w-full px-4 py-3 rounded-lg text-defaultDarkGreen placeholder:text-defaultDarkGreen"
            />
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-3 rounded-lg text-defaultDarkGreen placeholder:text-defaultDarkGreen"
            />
            <input
              type="tel"
              placeholder="Seu telefone"
              className="w-full px-4 py-3 rounded-lg text-defaultDarkGreen placeholder:text-defaultDarkGreen"
            />
            <textarea
              rows={5}
              placeholder="Sua mensagem"
              className="w-full px-4 py-3 rounded-lg text-defaultDarkGreen placeholder:text-defaultDarkGreen resize-none"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-defaultWhite text-defaultGreen font-semibold hover:opacity-90 transition-all"
            >
              Enviar mensagem
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="h-[600px] bg-defaultDarkGreen text-white flex flex-col items-center justify-center mt-20 rounded-xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Entre em contato</h2>
            <p className="text-lg">Email: contato@seudominio.com</p>
            <p className="text-lg">Telefone: (XX) XXXX-XXXX</p>
            <div className="mt-6 flex gap-4 justify-center">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">LinkedIn</a>
            </div>
          </div>
          <h4 className="mt-6 text-base">
            Created-by <Link href="https://www.linkedin.com/in/jonasoliveira-desenvolvedor/" className="underline">Jonas Oliveira</Link>
          </h4>
        </footer>
      </main>
    </>
  );
}