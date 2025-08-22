import { Container } from "@/components/container";
import { NewClient } from "@/components/form/newClient";

export default function CreateClient() {
    return (
        <Container>
            <main className="flex flex-col mt-6 mb-1 items-center">
                <h1 className="text-3xl font-medium mb-5">Cadastrar paciente</h1>
                <NewClient />
            </main>           
        </Container>
    )

}