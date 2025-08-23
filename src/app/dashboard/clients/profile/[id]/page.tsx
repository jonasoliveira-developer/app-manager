'use client';

import { Container } from '@/components/container';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { api } from "@/lib/api"
import Package from '@/app/dashboard/components/packege';
import Link from 'next/link';



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

  const { id } = use(params);

  async function fetchClient() {
    try {
      const response = await api.get(`/clients/${id}`);
      setDataClient(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClient();
  }, [id]);


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
      <div className="h-auto border-2 border-defaultMutedGreen py-10 px-2 rounded mt-3 flex  flex-col gap-5 md:flex-row">
        <section className='w-full '>
          <div className="text-gray-700 text-lg">
            <div className='w-full'>
              <h1 className="text-3xl mb-5 font-bold text-defaultDarkGreen">{dataClient?.name}</h1>
              <h2 className="text-xl font-semibold mb-2 text-defaultDarkGreen">Informações de Contato:</h2>
              <p><strong>Email: </strong>{dataClient?.email}</p>
              <p><strong>Telefone: </strong>{dataClient?.phoneNumber}</p>
              <p><strong>Idade: </strong>{dataClient?.age}</p>
              <p><strong>Peso: </strong>{dataClient?.weight}</p>
              <p><strong>Altura: </strong>{dataClient?.height}</p>
              <h4><strong>Endereço: </strong></h4>
              <p className="text-gray-600 text-lg"> - {dataClient?.local}</p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="mt-12 flex gap-4 w-full">
            <button
              onClick={handleDelete}
              className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Deletar
            </button>
            <Link href={`/dashboard/clients/profile/${dataClient?.id}/update`}

              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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