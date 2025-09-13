"use client";

import { Header } from "@/components/header";
import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function SobrePage() {
    return (
        <>
            <Header />

            <main className="w-full bg-defaultWhite text-defaultDarkGreen px-6 py-12">

                <div className="max-w-5xl mx-auto flex flex-col gap-12">

                    {/* Título principal */}
                    <section className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Sobre Nós
                        </h1>
                        <p className="text-lg text-defaultGreen">
                            Compromisso, excelência e tecnologia para profissionais autônomos
                        </p>
                    </section>

                    {/* Quem Somos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Quem Somos</h2>
                        <p className="text-base leading-relaxed">
                            Somos uma empresa comprometida com a valorização dos profissionais autônomos da saúde.
                            Nosso propósito é transformar o dia a dia desses especialistas, oferecendo ferramentas
                            que otimizam sua rotina, elevam o nível de profissionalismo nos atendimentos e facilitam
                            a gestão da sua empresa — seja ela composta por um único paciente ou por mil.
                        </p>
                    </section>

                    {/* Missão */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Missão</h2>
                        <p className="text-base leading-relaxed">
                            Oferecer suporte completo para que o profissional autônomo se sinta valorizado,
                            organizado e com propósito de crescimento. Nossa missão é ser o parceiro confiável
                            que impulsiona a evolução de cada atendimento, cada paciente e cada conquista.
                        </p>
                    </section>

                    {/* Visão */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Visão</h2>
                        <p className="text-base leading-relaxed">
                            Ser referência nacional em tecnologia e inovação para profissionais da saúde autônomos,
                            promovendo uma jornada de crescimento sustentável, humanizado e digitalmente eficiente.
                        </p>
                    </section>

                    {/* Valores */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Valores</h2>
                        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                            <li><strong>Profissionalismo:</strong> Respeito e seriedade em cada funcionalidade que entregamos.</li>
                            <li><strong>Inovação:</strong> Soluções modernas que acompanham a evolução do mercado.</li>
                            <li><strong>Empatia:</strong> Entendemos os desafios do dia a dia e criamos com sensibilidade.</li>
                            <li><strong>Acessibilidade:</strong> Ferramentas intuitivas e acessíveis para todos os perfis.</li>
                            <li><strong>Compromisso:</strong> Estamos ao lado do profissional em cada etapa da sua jornada.</li>
                        </ul>
                    </section>

                    {/* O que fazemos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">O Que Fazemos</h2>
                        <p className="text-base leading-relaxed mb-4">
                            Desenvolvemos uma plataforma completa para gestão de atendimentos, agendamentos,
                            prontuários, relatórios e perfis profissionais. Nossas funcionalidades incluem:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                            <li>Agendamento inteligente com lembretes automáticos</li>
                            <li>Prontuários digitais e relatórios em PDF</li>
                            <li>Perfil profissional com biografia e competências clínicas</li>
                            <li>Blog integrado para postagens e captação de pacientes</li>
                            <li>Funcionalidades offline e sincronização automática</li>
                            <li>Recibos digitais com assinatura eletrônica</li>
                        </ul>
                    </section>

                </div>

                {/* Footer */}

            </main>
            <footer className="bg-defaultDarkGreen text-white px-6 py-10 mt-20 ">
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
                        <a href="/about" className="hover:underline">Institucional</a>
                        <a href="/term" className="hover:underline">Termos & Condições</a>
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