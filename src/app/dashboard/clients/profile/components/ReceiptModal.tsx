"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api"; // ajuste conforme seu caminho

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  id: string;
  amount: number;
  carePlanId: string | number;
  formatCurrencyBRL: (value: number) => string;
}

export function ReceiptModal({
  isOpen,
  onClose,
  userName,
  id,
  amount,
  carePlanId,
  formatCurrencyBRL,
}: ReceiptModalProps) {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchClient() {
      try {
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClient();
  }, [isOpen, id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 border-2 border-gray-200">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-full max-w-md p-6 relative print:p-0 print:shadow-none print:border-none">

        {/* Cabeçalho */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-center text-defaultDarkGreen">Recibo de Pagamento</h2>
        </div>

        {/* Conteúdo do recibo */}
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            Eu, <strong>{userName}</strong>, recebi de <strong>{client?.name}</strong> a quantia de <strong>{formatCurrencyBRL(amount)}</strong>, referente ao pagamento pelo serviço de atendimento nº <strong>{carePlanId}</strong> devidamente realizado.
          </p>

          <div className="flex flex-col justify-between items-center text-xs text-gray-500 w-full mx-auto">  
            <span> ____________________________________________</span>
            <span>Data: {new Date().toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        {/* Ações */}
        <div className="mt-6 flex justify-between items-center print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-defaultGreen hover:bg-defaultGreenHover text-white px-4 py-2 rounded transition"
          >
            🖨️ Imprimir
          </button>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}