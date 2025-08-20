'use client';

import { Container } from '@/components/container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from "@/context/AuthContext";

export default function UserProfile() {

  const router = useRouter();
  const { logout } = useAuth();

  const [usuario] = useState({
    id: '46533971-a68f-47c0-8f90-bc4fd882da8e',
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@example.com',
    phoneNumber: '+55 71 92345-6789',
    councilRegistrationNumber: '123456',
    subscriptionType: 'BASIC',
    accountStatus: 'ACTIVE',
  });

  const handleDelete = () => {
    const confirm = window.confirm('Tem certeza que deseja deletar esta conta?');
    if (confirm) {
      alert('Conta deletada com sucesso!');
      router.push('/');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Container>
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2"
        >
          <FiLogOut size={20} />
          <span className='text-defaultDarkGreen text-xl'>Sair</span>
        </button>
      </div>

      <div className="h-auto border-2 border-defaultMutedGreen px-10 py-10 rounded">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800">{usuario.name}</h2>
          <p className="text-gray-600 text-lg">Status da conta: {usuario.accountStatus}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700 text-lg">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-defaultDarkGreen">Informações de Contato</h3>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Telefone:</strong> {usuario.phoneNumber}</p>
            <p><strong>Registro no Conselho:</strong> {usuario.councilRegistrationNumber}</p>
            <p><strong>Plano de Assinatura:</strong> {usuario.subscriptionType}</p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Deletar Conta
          </button>
          <button
            onClick={() => alert('Função de edição ainda não implementada')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </Container>
  );
}