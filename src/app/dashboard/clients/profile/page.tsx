'use client';

import { Container } from '@/components/container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { GoArrowLeft } from "react-icons/go";


export default function ProfilePage() {
  const router = useRouter();

  const [paciente, setPaciente] = useState({
  nome: 'Fulano de  Souza',
  email: 'fulano.souza@example.com',
  telefone: '+55 71 98888-1234',
  idade: '28',
  peso: '82kg',
  altura: '1.75m',
  local: 'Lauro de Freitas - BA',
  foto: 'https://i.pravatar.cc/150?img=3',
  userId: '46533971-a68f-47c0-8f90-bc4fd882da8e',
});

  const handleDelete = () => {
    const confirm = window.confirm('Tem certeza que deseja deletar este perfil?');
    if (confirm) {
      alert('Perfil deletado com sucesso!');
      router.push('/dashboard/clients');
    }
  };

  return (
    <Container>
       <h1 className="text-3xl font-bold my-3">Prontuario</h1>
    <div className="h-auto border-2 border-defaultMutedGreen px-10 py-10 rounded mt-3">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <img
          src={paciente.foto}
          alt="Foto do paciente"
          className="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{paciente.nome}</h1>
          <p className="text-gray-600 text-lg">{paciente.local}</p>
        </div>
      </div>

      {/* Seções de informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700 text-lg">
        {/* Contato */}
     <div>
  <h2 className="text-xl font-semibold mb-2 text-defaultDarkGreen">Contato</h2>
  <p><strong>Email:</strong> fulano.souza@example.com</p>
  <p><strong>Telefone:</strong> +55 71 98888-1234</p>
  <p><strong>Idade:</strong> 28</p>
  <p><strong>Peso:</strong> 82kg</p>
  <p><strong>Altura:</strong> 1.75m</p>
</div>
        
      </div>

      {/* Botões de ação */}
      <div className="mt-12 flex gap-4">
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Deletar
        </button>
        <button
          onClick={() => alert('Função de edição ainda não implementada')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Editar 
        </button>
      </div>
    </div>
      </Container>
  );
}