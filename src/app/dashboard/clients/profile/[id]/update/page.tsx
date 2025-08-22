import { Container } from "@/components/container";
import { EditClient } from "@/components/form/editClient";
import { use } from "react";


export default function UpdateClient({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <Container>
            <main className="flex flex-col mt-6 mb-1 items-center">
                <h1 className="text-3xl font-medium mb-5">Editar paciente</h1>
                <EditClient params={{id}}/>
            </main>           
        </Container>
    )

}