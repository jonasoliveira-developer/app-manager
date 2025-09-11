"use client";

import Link from "next/link";
import Image from "next/image";
import Hero from "@/assets/hero.svg";
import Finance from "@/assets/finance.png"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
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
          <p className="mt-3 mb-2 text-lg leading-relaxed text-red-400">
            E fique tranquilo — NÃO pedimos seu cartão para testar.
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
          <div className="w-full flex flex-col items-center justify-center gap-4 md:flex-row animate-fade-in">
            <ul className="w-full max-w-80 p-5 bg-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-blue-400">Agendamentos</h2>
              <li className="text-base leading-relaxed">
                Reduz conflitos de horário e melhora a organização da agenda
              </li>
              <li className="text-base leading-relaxed">
                Permite envio automático de lembretes e notificações aos pacientes
              </li>
              <li className="text-base leading-relaxed">
                Aumenta a taxa de comparecimento e reduz faltas
              </li>
            </ul>
            <ul className="w-full max-w-80 p-5 bg-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-green-500">Recibos de Pagamento</h2>
              <li className="text-base leading-relaxed">
                Registro formal de transações financeiras com o paciente
              </li>
              <li className="text-base leading-relaxed">
                Facilidade para contabilidade e controle fiscal
              </li>
              <li className="text-base leading-relaxed">
                Redução de erros e extravios com documentos digitais
              </li>
              <li className="text-base leading-relaxed">
                Possibilidade de assinatura digital
              </li>
            </ul>
            <ul className="w-full max-w-80 p-5 bg-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-yellow-400">Relatórios em PDF</h2>
              <li className="text-base leading-relaxed">
                Padronização profissional para prontuários e documentos clínicos
              </li>
              <li className="text-base leading-relaxed">
                Facilidade de compartilhamento por e-mail ou WhatsApp
              </li>
              <li className="text-base leading-relaxed">
                Arquivamento digital seguro e acessível
              </li>
            </ul>

          </div>
        </div>

        <section className="w-full bg-white py-12 px-6">
          <div className="max-w-5xl mx-auto text-center mb-10 bg-defaultSnow">
            <h2 className="text-4xl font-bold text-defaultDarkGreen mb-4">Financeiro</h2>
            <p className="text-lg text-gray-700 p-4">
              Tenha controle total sobre suas finanças com metas salariais, projeções de receita, categorização de despesas e relatórios inteligentes. Organize seu fluxo de caixa com clareza e tome decisões com confiança.
            </p>
          </div>

          <div className="w-full h-[75vh] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={Finance}
              alt="Ilustração de controle financeiro"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Funcionalidades - Branco */}
        <div className="w-full min-h-[80vh] mt-20 p-4 bg-defaultWhite rounded-3xl text-center flex items-center justify-center flex-col">
          <h1 className="font-semibold text-5xl text-defaultDarkGreen mb-12 leading-tight">
            E nós vamos além do trivial
          </h1>
          <div className="w-full flex flex-col items-center justify-center gap-4 md:flex-row">
            <ul className="w-full max-w-80 p-5 bg-defaultGreenHover text-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-yellow-300"> Autônomos</h2>
              <li className="text-base leading-relaxed">
                Agendamento rápido e intuitivo.
              </li>
              <li className="text-base leading-relaxed">
                Controle centralizado de pacientes.
              </li>
              <li className="text-base leading-relaxed">
                Organização visual da agenda.
              </li>
              <li className="text-base leading-relaxed">
                Histórico completo de atendimentos.
              </li>
            </ul>
            <ul className="w-full max-w-80 p-5 bg-defaultGreenHover text-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-blue-600">Inovação</h2>
              <li className="text-base leading-relaxed">
                Acesso via web, celular e desktop, onde você estiver.
              </li>
              <li className="text-base leading-relaxed">
                Funcionalidades offline para continuar trabalhando mesmo sem internet.
              </li>
              <li className="text-base leading-relaxed">
                Sincronização automática dos dados assim que a conexão for restabelecida.
              </li>
            </ul>
            <ul className="w-full max-w-80 p-5 bg-defaultGreenHover text-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-gray-400">Blog & Perfil Profissional</h2>
              <li className="text-base leading-relaxed">
                Perfil social com foto, biografia e competências clínicas
              </li>
              <li className="text-base leading-relaxed">
                Postagens sobre estudos, ideias, novidades e rotina profissional
              </li>
              <li className="text-base leading-relaxed">
                Captação de pacientes por meio de conteúdo relevante e educativo
              </li>
              <li className="text-base leading-relaxed">
                Engajamento  através de comentários e reações
              </li>

            </ul>
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