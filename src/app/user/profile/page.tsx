"use client"
import { Container } from "@/components/container";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { showCustomToast } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { Header } from "@/components/header";
import { UpdatePasswordForm } from "@/components/form/UpdatePasswordForm";

export default function UserProfile() {
  const router = useRouter();
  const { logout } = useAuth();
  const { userData } = useUserContext();

  const handleDelete = () => {
    const confirm = window.confirm("Tem certeza que deseja deletar esta conta?");
    if (confirm) {
      alert("Conta deletada com sucesso!");
      router.push("/");
    }
  };

  const handleLogout = () => {
    logout();
    showCustomToast("Até já! Te vejo em breve!", "info");
    router.push("/");
  };

  return (
    <>
      <Header />
      <Container>
        {/* Botão de logout */}
        <div className="flex justify-end items-center my-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4  text-defaultFlagGreen border-2 rounded border-defaultGreen"
          >
            Sair
            <FiLogOut size={20} className="text-defaultFlagGreen" />
          </button>
        </div>

        {/* Área principal do perfil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-2 border-defaultMutedGreen px-10 py-10 rounded">
          {/* Coluna da imagem e nome */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
              {userData?.imageUrl ? (
                <img
                  src={userData.imageUrl}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Sem imagem</span>
              )}
            </div>

            <h2 className="text-xl font-semibold text-defaultDarkGreen">
              {userData?.name || "Nome do Usuário"}
            </h2>

            <p className="text-sm text-gray-600 text-center px-4">
              “Sou apaixonado por tecnologia, café e resolver problemas com código.”
            </p>

            
           {/* Botões de ação */}
            <div className="mt-10 flex gap-4">
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


          {/* Coluna de dados e ações */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
              <p><strong>ID:</strong> <span className="text-sm">{userData?.id}</span></p>
              <p><strong>Status da conta:</strong> {userData?.accountStatus}</p>
              <p><strong>Email:</strong> {userData?.email}</p>
              <p><strong>Telefone:</strong> {userData?.phoneNumber}</p>
              <p><strong>Registro no Conselho:</strong> {userData?.councilRegistrationNumber}</p>
              <p><strong>Plano de Assinatura:</strong> {userData?.subscriptionType}</p>
              <p><strong>Biografia:</strong> Desenvolvedor fullstack com 5 anos de experiência em projetos web.</p>
              <p><strong>Sobre mim:</strong> Gosto de aprender coisas novas, trabalhar em equipe e criar soluções que impactam positivamente a vida das pessoas.</p>
            </div>

           
          </div>
        </div>
            {/* Formulário de senha */}
            <div className="mt-10 w-full">
              <UpdatePasswordForm />
            </div>
      </Container>
    </>
  );
}