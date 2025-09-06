'use client';

import { Container } from '@/components/container';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { showCustomToast } from "@/utils/toast"

import { useAuth } from "@/context/AuthContext";
import { api } from '@/lib/api';
import Link from 'next/link';
import { ImageUploader } from '@/components/ImageUploader';
import { Header } from '@/components/header';

interface UserType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  accountStatus: string;
  councilRegistrationNumber?: string;
  subscriptionType?: string;
  imageUrl?: string

}



export default function UserProfile() {

  const router = useRouter();
  const { logout, user } = useAuth();

  const [dataUser, setDataUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
  if (!user?.id) return;

  async function fetchUser() {
    try {
      const response = await api.get(`/users/${user?.id}`);
      setDataUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchUser();
}, [user]);


  const handleDelete = () => {
    const confirm = window.confirm('Tem certeza que deseja deletar esta conta?');
    if (confirm) {
      alert('Conta deletada com sucesso!');
      router.push('/');
    }
  };


  const handleLogout = () => {
    logout();
    showCustomToast("Até já! Te vejo em breve!", "info")
    router.push('/');
  };



  return (
    <>
    <Header />
       <Container>
      <div className="flex justify-end items-center mb-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-defaultFlagGreen border-2 rounded border-defaultGreen mt-2"
        >
          Sair
          <FiLogOut size={20} className='text-defaultFlagGreen' />

        </button>
      </div>

      <div className="h-auto border-2 border-defaultMutedGreen px-10 py-10 rounded">
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-2 text-defaultDarkGreen">Informações do Usuario</h3>
        </div>
        <div className="rounded-full overflow-hidden" >
          <ImageUploader
            userId={user?.id ?? ''}
            username={user?.name ?? "Usuario"}
          />
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700 text-lg">
          <div>
            <p className='whitespace-nowrap break-keep'><strong>id:</strong> <span className="text-sm">{dataUser?.id}</span></p>
            <p className=""><strong>Status da conta:</strong> {dataUser?.accountStatus}</p>
            <p><strong>Email:</strong> {dataUser?.email}</p>
            <p><strong>Telefone:</strong> {dataUser?.phoneNumber}</p>
            <p><strong>Registro no Conselho:</strong> {dataUser?.councilRegistrationNumber}</p>
            <p><strong>Plano de Assinatura:</strong> {dataUser?.subscriptionType}</p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Deletar Conta
          </button>
          <Link
            href="/user/profile/update"
            className="px-6 py-2 bg-defaultGreen text-white rounded hover:bg-defaultGreenHover transition-colors"
          >
            Editar Perfil
          </Link>
        </div>
      </div>
    </Container>
    </>
   
  );
}