"use client";

import { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { SignatureField } from "@/components/assign";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";

// Interface do relatório
interface Report {
  id: string;
  title: string;
  councilRegistrationNumber: string;
  date: string;
  text: string;
  clientId: string;
  userId: string;
}

// Função para formatar data
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function ReportPage() {
  const { evaluate, id, unique } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [client, setClient] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const reportRes = await api.get(`/reports/${evaluate}`);
        const reportData = reportRes.data;
        setReport(reportData);

        const clientRes = await api.get(`/clients/${reportData.clientId}`);
        setClient(clientRes.data);

        const userRes = await api.get(`/users/${reportData.userId}`);
        setUser(userRes.data);
      } catch (error) {
        showCustomToast("Erro ao carregar dados do relatório", "error");
      } finally {
        setLoading(false);
      }
    };

    if (evaluate) fetchAll();
  }, [evaluate]);

  if (loading) return <p className="text-center text-sm">Carregando relatório...</p>;
  if (!report) return <p className="text-center text-red-500 text-sm">Relatório não encontrado.</p>;

  return (
    <main className="max-w-screen-lg w-full mx-auto p-4 sm:p-6 print:p-2 bg-white border border-gray-300 shadow-sm rounded-lg overflow-auto print:shadow-none print:border-none">
      <div className="w-full  flex items-center justify-between mb-10 print:hidden">
        <Link href={`/dashboard/clients/profile/${id}/appointment/${unique}`}>
          <SlArrowLeft className="hover:cursor-pointer text-defaultGreen" />
        </Link>
        <FaPrint
          className="text-defaultGreen text-lg cursor-pointer"
          onClick={() => window.print()}
        />
      </div>

      {/* Título centralizado */}
      <header className="mb-6 print:mb-4">
        <h1 className="text-xl font-semibold text-defaultDarkGreen text-center print:text-base">
          {report.title}
        </h1>
      </header>

      {/* Informações principais */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4 print:gap-2 print:mb-2">
        <div>
          <p className="text-sm print:text-xs">
            <strong>Data:</strong> {formatDate(report.date)}
          </p>
        </div>
        <div>
          <p className="text-sm text-right print:text-xs">
            <strong>Registro profissional:</strong> {user?.councilRegistrationNumber}
          </p>
        </div>
      </section>

      {/* Conteúdo do relatório */}
      <section className="relative p-4 rounded-lg border border-defaultCeladonGreen mb-6 print:p-2 print:mb-2">
        {/* Texto do relatório */}
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words print:text-xs print:leading-normal">
          {report.text}
        </p>

        {/* Marca d'água expandida e centralizada */}
        <div className="absolute inset-0  items-center justify-center w-full h-full pointer-events-none print:opacity-10 opacity-0 print:flex hidden">
          <p className="text-[6vw] font-bold text-gray-300 rotate-[315deg] select-none print:text-[3vw] text-center w-full">
            {user.name}
          </p>
        </div>
      </section>

      {/* Assinaturas */}
      <section className="w-full flex flex-col gap-4 print:gap-2">
        <SignatureField type="assignUser" name={user.name} reportId={report.id} />
        <SignatureField type="assignClient" name={client.name} reportId={report.id} />
      </section>

      {/* Marca d'água para impressão */}
    </main>
  );
}