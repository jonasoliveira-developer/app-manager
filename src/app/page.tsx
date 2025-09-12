"use client";

import Link from "next/link";
import Image from "next/image";
import Hero from "@/assets/hero.svg";
import Finance from "@/assets/finance.png"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { useEffect } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/form/ContactForm";

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
        <div className="w-full px-4 py-10 lg:px-20 lg:py-24 bg-defaultWhite text-center">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug text-defaultDarkGreen lg:max-w-4xl">
              Automatize sua rotina com a nossa gestão inteligente e conquiste mais tempo para o que importa.
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-defaultGreen max-w-3xl">
              Transforme a forma como você gerencia seus atendimentos com uma solução ágil, intuitiva e feita para facilitar sua rotina.
            </p>

            {/* Botão */}
            <Link href="/user/create" className="w-full max-w-sm">
              <button className="w-full h-14 sm:h-16 bg-defaultDarkGreen text-defaultWhite text-lg sm:text-xl font-semibold rounded-lg hover:opacity-90 transition-all">
                Teste gratuitamente por 30 dias.
              </button>
            </Link>

            {/* Aviso */}
            <p className="text-sm sm:text-base lg:text-lg text-red-400 font-medium">
              E fique tranquilo — NÃO pedimos seu cartão para testar.
            </p>

          </div>
        </div>
        {/* Benefícios */}
        <div className="w-full px-4 py-16 bg-defaultWhite">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

            {/* Texto */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug">
                <span className="font-extrabold text-defaultDarkGreen block">
                  Otimize seu tempo,
                </span>
                atenda melhor seus pacientes e tenha mais qualidade de vida.
              </h2>
            </div>

            {/* Imagem */}
            <div className="flex-1">
              <Image
                src={Hero}
                alt="Imagem de um gerenciamento online"
                className="w-full h-auto max-w-md lg:max-w-full mx-auto"
              />
            </div>

          </div>
        </div>

        {/* Funcionalidades - Verde */}
        <div className="w-full min-h-[80vh] mt-20 p-4 bg-defaultGreen rounded-3xl text-center flex items-center justify-center flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-defaultWhite mb-8 lg:mb-12 leading-tight text-center max-w-4xl mx-auto">
            Tudo que você precisa em um só lugar
          </h1>

          <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 animate-fade-in">
            {/* Card 1 - Agendamentos */}
            <ul className="flex-1 min-h-[300px] p-5 bg-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
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

            {/* Card 2 - Recibos */}
            <ul className="flex-1 min-h-[300px] p-5 bg-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
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

            {/* Card 3 - Relatórios */}
            <ul className="flex-1 min-h-[300px] p-5 bg-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
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
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

            {/* Texto */}
            <div className="flex-1 text-center lg:text-left bg-defaultSnow p-6 rounded-xl shadow-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-defaultDarkGreen mb-4">
                Financeiro
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Tenha controle total sobre suas finanças com metas salariais, projeções de receita,
                categorização de despesas e relatórios inteligentes. Organize seu fluxo de caixa com
                clareza e tome decisões com confiança.
              </p>
            </div>

            {/* Imagem */}
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-lg">
              <Image
                src={Finance}
                alt="Ilustração de controle financeiro"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* Funcionalidades - Branco */}
        <div className="w-full min-h-[80vh] mt-20 p-4 bg-defaultWhite rounded-3xl text-center flex items-center justify-center flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-defaultBlack mb-8 lg:mb-12 leading-tight text-center max-w-4xl mx-auto">
            E nós vamos além do trivial
          </h1>

          <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8">
            {/* Card 1 */}
            <ul className="flex-1 min-h-[340px] p-5 bg-defaultGreenHover text-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-yellow-300">Autônomos</h2>
              <li className="text-base leading-relaxed">Agendamento rápido e intuitivo.</li>
              <li className="text-base leading-relaxed">Controle centralizado de pacientes.</li>
              <li className="text-base leading-relaxed">Organização visual da agenda.</li>
              <li className="text-base leading-relaxed">Histórico completo de atendimentos.</li>
            </ul>

            {/* Card 2 */}
            <ul className="flex-1 min-h-[340px] p-5 bg-defaultGreenHover text-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-blue-600">Inovação</h2>
              <li className="text-base leading-relaxed">Acesso via web, celular e desktop, onde você estiver.</li>
              <li className="text-base leading-relaxed">Funcionalidades offline para continuar trabalhando mesmo sem internet.</li>
              <li className="text-base leading-relaxed">Sincronização automática dos dados assim que a conexão for restabelecida.</li>
            </ul>

            {/* Card 3 */}
            <ul className="flex-1 min-h-[340px] p-5 bg-defaultGreenHover text-defaultWhite text-left rounded-3xl list-disc list-inside shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-xl mb-3 text-center text-gray-400">Blog & Perfil Profissional</h2>
              <li className="text-base leading-relaxed">Perfil social com foto, biografia e competências clínicas</li>
              <li className="text-base leading-relaxed">Postagens sobre estudos, ideias, novidades e rotina profissional</li>
              <li className="text-base leading-relaxed">Captação de pacientes por meio de conteúdo relevante e educativo</li>
              <li className="text-base leading-relaxed">Engajamento através de comentários e reações</li>
            </ul>
          </div>
        </div>

        {/* Formulário de contato */}
        <div className="w-full mt-20 p-4 bg-defaultGreen rounded-3xl text-center flex items-center justify-center flex-col text-defaultSnow">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 lg:mb-8 leading-tight text-center text-defaultSnow">
            Fale com a gente
          </h2>
          <p className="text-lg mb-6 max-w-2xl">
            Quer saber mais ou tirar dúvidas? Envie sua mensagem e entraremos em contato.
          </p>

          <ContactForm />
        </div>

      </main>
      {/* Footer */}
      <footer className="bg-defaultDarkGreen text-white px-6 py-10 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 w-full max-w-6xl mx-auto">

          {/* Coluna 1 - Contato */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold mb-2">Contato</h2>
            <p>Email: contato@seudominio.com</p>
            <p>Telefone: (XX) XXXX-XXXX</p>
            <a href="#fale-com-a-gente" className="text-white underline hover:text-gray-300">
              Fale com a gente
            </a>
          </div>

          {/* Coluna 2 - Páginas */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-xl font-bold mb-2">Páginas</h2>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/cadastro" className="hover:underline">Cadastro</a>
            <a href="/sobre" className="hover:underline">Sobre</a>
          </div>

          {/* Coluna 3 - Redes Sociais */}
          <div className="flex flex-col gap-4 items-center md:items-end">
            <h2 className="text-xl font-bold mb-2">Redes sociais</h2>
            <div className="flex gap-4 text-white text-2xl">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé final */}
        <div className="mt-10 text-center text-sm border-t border-white/20 pt-4">
          Created by <span className="font-semibold">Refactor Solutions</span>
        </div>
      </footer>
    </>
  );
}