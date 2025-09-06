import { Container } from "@/components/container";
import { EditUser } from "@/components/form/editUser";
import Link from "next/link";

export default function UpdateUserPage() {
  return (
    <Container>
      <main
        className="w-full flex flex-col items-center justify-center mb-1 px-4 text-center"
        style={{ height: "calc(100vh - 8.5rem)" }}
      >
        {/* Logo estilizado */}
        <Link href="/">
          <h1 className="text-3xl font-bold text-defaultGreen mb-6">
            Fisio<span className="text-defaultBlack">Admin</span>
          </h1>
        </Link>


        {/* Subtítulo */}
        <p className="text-gray-600 text-base mb-6 max-w-xl">
          Mantenha suas informações sempre atualizadas para garantir uma comunicação eficiente e segura com seus pacientes.
        </p>

        {/* Formulário */}
        <EditUser />
      </main>
    </Container>
  );
}