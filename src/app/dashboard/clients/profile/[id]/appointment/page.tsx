"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export interface CarePlanResponseDTO {
    title: string;
    id: string;
    userId: string;
    clientId: string;
    startDate: string; // ISO format
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

const exampleCarePlan: CarePlanResponseDTO = {
    title: "Plano de Cuidados - João Silva",
    id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    userId: "user-uuid",
    clientId: "client-uuid",
    startDate: "2025-08-01",
    expectedEndDate: "2025-09-01",
    actualEndDate: "2025-08-28",
    payment: {
        value: 350.0,
    },
    schedule: [
        { date: "2025-08-05", description: "Consulta inicial" },
        { date: "2025-08-12", description: "Sessão de acompanhamento" },
        { date: "2025-08-19", description: "Avaliação nutricional" },
    ],
};

export default function CarePlanPage() {

    const { user } = useAuth()

    const [carePlan, setCarePlan] = useState<CarePlanResponseDTO | null>(null);

    useEffect(() => {
        async function fetchCarePlan() {
            try {
                const response = await api.get("/care-plans", {
                    params: { id: user?.id },
                });

                setCarePlan(response.data);
            } catch (error) {
                console.error("Erro ao buscar plano de cuidados:", error);
            }
        }

        if (user?.id) fetchCarePlan();
    }, [user?.id]);

    if (!carePlan) return <p>Carregando plano de cuidados...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{carePlan.title}</h1>

            <div className="space-y-2 text-gray-700">
                <p><strong>Início:</strong> {carePlan.startDate}</p>
                <p><strong>Previsão de término:</strong> {carePlan.expectedEndDate}</p>
                <p><strong>Término real:</strong> {carePlan.actualEndDate}</p>
                <p><strong>Valor do pagamento:</strong> R$ {carePlan.payment.value.toFixed(2)}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Agenda</h2>
            <ul className="list-disc list-inside space-y-1">
                {carePlan.schedule.map((item, index) => (
                    <li key={index}>
                        {item.date} – {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}