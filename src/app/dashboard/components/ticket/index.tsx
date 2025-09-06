"use client";
import Link from "next/link";
import { FaFolderPlus, FaUserPlus } from "react-icons/fa";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export interface ClientFormData {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  age?: string;
  weight?: string;
  height?: string;
  local?: string;
}

export function TicketItem() {
  const { user } = useAuth();
  const [clients, setClients] = useState<ClientFormData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchUser() {
      try {
        const response = await api.get("/clients", {
          params: { userId: user?.id },
        });
        setClients(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [user]);

  if (!loading && (!clients || clients.length === 0)) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 text-center bg-defaultSnow rounded-xl shadow-sm">
        <FaUserPlus size={48} className="text-defaultGreen mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Nenhum paciente cadastrado
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Comece agora a organizar seus atendimentos. Cadastre seu primeiro paciente e aproveite todos os recursos da plataforma.
        </p>
        <Link href="/dashboard/clients/create">
          <button className="bg-defaultGreen text-white px-6 py-2 rounded-lg hover:bg-defaultDarkGreen transition">
            Cadastrar paciente
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {clients?.map((client) => (
        <div
          key={client.id}
          className="relative w-full bg-defaultSnow rounded p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
        >
          {/* Botão fixo no canto superior direito */}
          <div className="absolute top-4 right-4">
            <Link
              href={`/dashboard/clients/profile/${client.id}`}
              className="inline-flex items-center justify-center bg-white border border-defaultGreen text-defaultGreen hover:bg-defaultGreen hover:text-white rounded-full p-2 transition"
              title="Ver prontuário"
            >
              <FaFolderPlus size={18} />
            </Link>
          </div>

          {/* Informações do paciente */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full justify-between pr-20">
            <h3 className="text-lg font-semibold text-defaultDarkGreen">{client.name}</h3>
            {client.email && (
              <p className="text-sm text-gray-600">✉️ {client.email}</p>
            )}
            {client.phoneNumber && (
              <p className="text-sm text-gray-600">📞 {client.phoneNumber}</p>
            )}
            {client.local && (
              <p className="text-sm text-gray-600">📍 {client.local}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}