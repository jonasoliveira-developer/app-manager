import { Container } from "@/components/container";
import { ReportCreate} from "@/components/form/reportCreate";
import { use } from "react";

export default function ReportCreatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <Container>
               <main className="flex flex-col mt-6 mb-1 items-center">
                <h1 className="text-3xl font-medium mb-5">Criar evolução de paciente</h1>
               </main>
            <ReportCreate id={id} />
        </Container>
    )
}