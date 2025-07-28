"use client"

import {Container} from "@/components/container"
import { FaEye } from "react-icons/fa";


export default function Clients() {
    const pacientes = [
  { nome: "Ana Souza", local: "Barra", prontuario: "12345" },
  { nome: "Carlos Lima", local: "Ondina", prontuario: "67890" },
  { nome: "Maria Silva", local: "Itapuã", prontuario: "54321" },
  { nome: "João Almeida", local: "Pituba", prontuario: "11223" },
  { nome: "Fernanda Costa", local: "Rio Vermelho", prontuario: "33445" },
  { nome: "Lucas Ferreira", local: "Cabula", prontuario: "55667" },
  { nome: "Juliana Ramos", local: "Caminho das Árvores", prontuario: "77889" },
  { nome: "Bruno Santos", local: "São Cristóvão", prontuario: "99001" },
  { nome: "Patrícia Gomes", local: "Liberdade", prontuario: "13579" },
  { nome: "Felipe Andrade", local: "Bonfim", prontuario: "24680" },
];

      const handleRowClick = (index: number) => {
    
  };


    return (
        <Container>
               <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-defaultWhite text-sm text-left rounded-lg shadow-md">
        <thead className="bg-defaultBlack text-defaultWhite">
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Local</th>
            <th className="p-2">Prontuário</th>
            <th className="p-2 text-center">Ver</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index)}
              className="cursor-pointer hover:bg-defaultMintGreen transition-colors border-b" >
              <td className="p-2">{paciente.nome}</td>
              <td className="p-2">{paciente.local}</td>
              <td className="p-2">{paciente.prontuario}</td>
              <td className="p-2 flex justify-center">
                <FaEye className="text-defaultDarkGreen hover:text-defaultAquaGreen" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </Container>
  );

}

