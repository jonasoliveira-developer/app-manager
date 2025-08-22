"use client";

import { FaFolderOpen } from "react-icons/fa";

export default function Package() {
  const items = [
    "Dor na Lombar",
    "Dificuldade para andar",
    "Massagem",
    "RPG para melhorar postura",
    "Dor na lombar - 2",
  ];

  return (
    <div className="w-full h-full p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Atendimentos</h1>

      <ul className="list-disc list-inside space-y-2">
        {items.map((title, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50">
            <FaFolderOpen className="text-blue-500" />
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}