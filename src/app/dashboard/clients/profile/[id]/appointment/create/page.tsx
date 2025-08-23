import { Container } from "@/components/container";
import { CarePlanCreate } from "@/components/form/caraPlanCreate";
import { use } from "react";

export default function AppointmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <Container>
               <main className="flex flex-col mt-6 mb-1 items-center">
                <h1 className="text-3xl font-medium mb-5">Criar plano de atendimento</h1>
               </main>
            <CarePlanCreate params={{id}} />
        </Container>
    )
}