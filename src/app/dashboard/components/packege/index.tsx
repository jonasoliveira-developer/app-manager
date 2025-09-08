"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFolderOpen, FaPlusCircle } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export interface CarePlanResponseDTO {
    title: string;
    id: string;
    userId: string;
    clientId: string;
    startDate: string;
    expectedEndDate: string;
    actualEndDate: string;
    payment: {
        value: number;
    };
    schedule: {
        date: string;
        description: string;
    }[];
}

export default function PackegeList({ params }: { params: { id: string } }) {
    const [carePlans, setCarePlans] = useState<CarePlanResponseDTO[] | null>(null);
    const [client, setClient] = useState<any>(null);
    const { user } = useAuth();

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        async function fetchCarePlans() {
            try {
                const response = await api.get("/care-plans", {
                    params: { id:params.id },
                });

                setCarePlans(response.data.content);
            } catch (error) {
                console.error("Erro ao buscar planos de cuidado:", error);
            }
        }

        if (user?.id) fetchCarePlans();
    }, [user?.id]);

    return (
        <div className="w-full h-full p-4 border border-defaultMutedGreen rounded bg-white shadow-sm">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6 px-4">
                <h1 className="text-2xl font-bold text-defaultDarkGreen">Pacotes de atendimentos</h1>

                <Link
                    href={`/dashboard/clients/profile/${params.id}/appointment/create`}
                    className="text-defaultGreen font-medium hover:text-defaultGreenHover transition-colors"
                >
                    <FaPlusCircle />
                </Link>
            </div>

            {/* Lista ou mensagem */}
            {carePlans && carePlans.length > 0 ? (
                <ul className="space-y-4">
                    {carePlans.map((carePlan, index) => (
                        <Link href={`/dashboard/clients/profile/${params.id}/appointment/${carePlan.id}`} key={index}>
                            <li className="flex flex-col m-2 gap-2 border border-gray-200 rounded-lg p-4 hover:border-defaultGreenHover transition cursor-pointer">
                                <div>
                                    <p className="text-lg font-semibold text-defaultDarkGreen">{carePlan.title}</p>
                                    <h1 className="text-lg font-semibold text-gray-500">{client?.name}</h1>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                                    <p><strong>Início:</strong> {formatDate(carePlan.startDate)}</p>
                                    <span className="hidden sm:inline-block mx-2">|</span>
                                    <p><strong>Fim:</strong> {formatDate(carePlan.expectedEndDate)}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <div className="w-full flex flex-col items-center justify-center py-12 text-center bg-defaultSnow rounded-xl">
                    <FaFolderOpen size={48} className="text-defaultGreen mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Nenhum pacote de atendimento encontrado
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Você ainda não cadastrou nenhum plano de cuidado para este paciente. Comece agora e organize seus atendimentos com mais eficiência.
                    </p>
                    <Link href={`/dashboard/clients/profile/${params.id}/appointment/create`}>
                        <button className="bg-defaultGreen text-white px-6 py-3 rounded-lg hover:bg-defaultDarkGreen transition">
                            Criar primeiro pacote
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}