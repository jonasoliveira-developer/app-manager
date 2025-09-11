'use client';

import { Container } from '@/components/container';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { api } from '@/lib/api';
import Package from '@/app/dashboard/components/packege';
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { showCustomToast } from '@/utils/toast';

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

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [dataClient, setDataClient] = useState<ClientFormData | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { logout } = useAuth();
  const { id } = use(params);


  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await api.get(`/clients/${id}`);
        setDataClient(response.data);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        showCustomToast('Erro ao carregar dados do paciente.', 'error');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchClient();
  }, [id]);

  const handleDelete = async () => {
    if (!dataClient?.id) return;

    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar o perfil de ${dataClient.name}? Essa ação não pode ser desfeita.`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/clients/${id}`);
      showCustomToast('Perfil deletado com sucesso!', 'success');
      router.push('/dashboard/clients');
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      showCustomToast('Erro ao deletar o perfil. Tente novamente.', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    showCustomToast('Até já! Te vejo em breve!', 'info');
    router.push('/');
  };

  if (loading) {
    return (
      <Container>
        <p className="text-center text-gray-500 mt-10">Carregando dados do paciente...</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="h-auto border border-defaultMutedGreen py-10 px-4 rounded mt-4 flex flex-col gap-6 md:flex-row bg-white shadow-sm">
        <section className="w-full text-gray-700 text-lg">
          <h1 className="text-3xl mb-4 font-bold text-defaultDarkGreen">{dataClient?.name}</h1>

          <h2 className="text-xl font-semibold mb-2 text-defaultDarkGreen">Informações de Contato</h2>
          <p><strong>Email:</strong> {dataClient?.email}</p>
          <p><strong>Telefone:</strong> {dataClient?.phoneNumber}</p>
          <p><strong>Idade:</strong> {dataClient?.age}</p>
          <p><strong>Peso:</strong> {dataClient?.weight}</p>
          <p><strong>Altura:</strong> {dataClient?.height}</p>
          <p className="mt-2"><strong>Endereço:</strong></p>
          <p className="text-gray-600 text-lg">– {dataClient?.local}</p>

          <div className="mt-10 flex gap-4 w-full">
            <button
              onClick={handleDelete}
              className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              disabled={!dataClient?.id}
            >
              Deletar
            </button>
            <Link
              href={`/dashboard/clients/profile/${dataClient?.id}/update`}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
            >
              Editar
            </Link>
          </div>
        </section>

        <Package params={{ id }} />
      </div>
    </Container>
  );
}