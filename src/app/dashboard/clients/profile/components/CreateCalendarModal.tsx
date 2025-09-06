"use client";

import { FaTimes } from "react-icons/fa";
import { CreateCalendarForm } from "@/components/form/CreateCalendarForm";

interface Props {
  onClose: () => void;
  carePlanId: string;
  onCreated: () => void;
}

export function CreateCalendarModal({ onClose, carePlanId, onCreated }: Props) {
  const handleSuccess = () => {
    onCreated(); // qualquer lógica externa (ex: recarregar lista)
    onClose();   // fecha o modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Criar Sessão</h2>

        <CreateCalendarForm carePlanId={carePlanId} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}