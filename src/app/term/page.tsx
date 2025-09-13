"use client";

import { Header } from "@/components/header";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function TermPage() {
    return (
        <>
            <Header />
            <main className="w-full bg-defaultWhite text-defaultDarkGreen px-6 py-12">
                <div className="max-w-5xl mx-auto flex flex-col gap-12">

                    {/* Título */}
                    <section className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Termos e Compromissos
                        </h1>
                        <p className="text-lg text-defaultGreen">
                            Transparência, responsabilidade e ética em cada funcionalidade
                        </p>
                    </section>

                    {/* Uso Responsável */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">1. Uso Responsável da Plataforma</h2>
                        <p className="text-base leading-relaxed">
                            Ao utilizar nossa plataforma, o profissional se compromete a manter conduta ética,
                            respeitosa e responsável. O uso indevido, como compartilhamento de dados sensíveis
                            sem consentimento ou práticas que violem a legislação vigente, poderá resultar em
                            suspensão ou cancelamento da conta.
                        </p>
                    </section>

                    {/* Privacidade e Proteção de Dados */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">2. Privacidade e Proteção de Dados</h2>
                        <p className="text-base leading-relaxed">
                            Levamos a privacidade dos pacientes e profissionais a sério. Todos os dados armazenados
                            são protegidos por protocolos de segurança e utilizados exclusivamente para fins operacionais
                            da plataforma. O usuário é responsável por manter a confidencialidade de suas credenciais.
                        </p>
                    </section>

                    {/* Responsabilidade do Profissional */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">3. Responsabilidade do Profissional</h2>
                        <p className="text-base leading-relaxed">
                            A plataforma é uma ferramenta de apoio à gestão e organização. O profissional é o único
                            responsável pelas informações inseridas, pela veracidade dos dados e pela condução dos
                            atendimentos clínicos. Não nos responsabilizamos por decisões clínicas ou administrativas
                            tomadas com base nas informações registradas.
                        </p>
                    </section>

                    {/* Limitações e Garantias */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">4. Limitações e Garantias</h2>
                        <p className="text-base leading-relaxed">
                            Embora nos esforcemos para manter a plataforma disponível e funcional, não garantimos
                            operação ininterrupta ou livre de erros. Eventuais falhas técnicas serão tratadas com
                            prioridade, mas não constituem responsabilidade legal por prejuízos decorrentes.
                        </p>
                    </section>

                    {/* Propriedade Intelectual */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">5. Propriedade Intelectual</h2>
                        <p className="text-base leading-relaxed">
                            Todo o conteúdo, design, funcionalidades e marca da plataforma são protegidos por direitos
                            autorais e propriedade intelectual. É proibida a reprodução, modificação ou distribuição
                            sem autorização expressa.
                        </p>
                    </section>

                    {/* Atualizações nos Termos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">6. Atualizações nos Termos</h2>
                        <p className="text-base leading-relaxed">
                            Estes termos podem ser atualizados periodicamente para refletir melhorias na plataforma
                            ou mudanças legais. Recomendamos que o usuário revise esta página regularmente. O uso
                            contínuo da plataforma implica concordância com as versões mais recentes.
                        </p>
                    </section>

                </div>
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