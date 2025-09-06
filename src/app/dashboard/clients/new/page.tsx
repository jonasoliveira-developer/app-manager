import { Container } from "@/components/container";
import { NewClient } from "@/components/form/newClient";

export default function CreateClient() {
  return (
    <Container>
      <main className="flex flex-col items-center justify-center mt-10 mb-6 px-4 text-center">
        <h1 className="text-4xl font-semibold text-defaultDarkGreen mb-6 leading-tight">
          Cadastrar paciente
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Preencha os dados do paciente para iniciar o acompanhamento. Você poderá editar ou complementar as informações a qualquer momento.
        </p>
        <NewClient />
      </main>
    </Container>
  );
}