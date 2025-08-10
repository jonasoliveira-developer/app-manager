"use client"
import Link from "next/link";
import { FaFolderPlus } from "react-icons/fa";

export function TicketItem () {
   
const pacientes = [
  {
    nome: "Ana Souza",
    email: "ana.souza@example.com",
    telefone: "(71) 91234-5678",
    local: "Barra",
    prontuario: "12345"
  },
  {
    nome: "Carlos Lima",
    email: "carlos.lima@example.com",
    telefone: "(71) 99876-5432",
    local: "Pituba",
    prontuario: "67890"
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda.costa@example.com",
    telefone: "(71) 98765-4321",
    local: "Rio Vermelho",
    prontuario: "11223"
  }
];

     const handleRowClick = (index: number) => {
    
  }
    return (
  <>
  {pacientes.map((paciente, index) => (
    <tr
      key={index}
      onClick={() => handleRowClick(index)}
      className="cursor-pointer hover:bg-gray-50 transition-colors border-b"
    >
      <td className="p-2">{paciente.nome}</td>
      <td className="p-2 hidden sm:block">{paciente.telefone}</td>
      <td className="p-2">{paciente.local}</td>
      <td className="p-2 flex justify-center">
        <Link href="/dashboard/clients/profile">
            <FaFolderPlus size={20} className="text-defaultDarkGreen hover:text-defaultLightGreen" />
        </Link>
        
      </td>
    </tr>
  ))}
</>
    )
}