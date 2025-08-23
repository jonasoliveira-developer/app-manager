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

export default function PackegeList({ params }: { params: { id: string } }) {

    const [carePlans, setCarePlans] = useState<CarePlanResponseDTO[] | null>(null);
    const {user} = useAuth()

    useEffect(() => {
        async function fetchCarePlan() {
            try {
                const response = await api.get("/care-plans", {
                    params: { id: user?.id },
                });

                setCarePlans(response.data.content);
            } catch (error) {
                console.error("Erro ao buscar plano de cuidados:", error);
            }
        }

        if (user?.id) fetchCarePlan();
    }, [user?.id]);


    return (
        <div className="w-full h-full p-2 border-2 border-defaultDarkGreen rounded ">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Atendimentos</h1>

                <Link
                    href={`/dashboard/clients/profile/${params.id}/appointment/create`}
                    className="flex items-center gap-2 text-defaultGreen hover:text-defaultGreenHover transition-colors"
                >
                    <FaPlusCircle />
                </Link>
            </div>

            <ul className="list-disc list-inside space-y-2">
                {carePlans?.map((carePlan, index) => (

                    <li
                        key={index}
                        className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                    >
                        <FaFolderOpen className="text-defaultDarkGreen" />
                        <span>{carePlan.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}