import { Container } from "@/components/container";
import { EditClient } from "@/components/form/editClient";
import Link from "next/link";
import { use } from "react";

export default function UpdateClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Container>
      <main
        className="w-full flex flex-col items-center justify-center px-4 text-center"
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
          Atualize os dados do paciente para manter os registros sempre organizados e precisos.
        </p>

        {/* Formulário */}
        <EditClient params={{ id }} />
      </main>
    </Container>
  );
}