import { Container } from "@/components/container";
import { ReportUpdateForm} from "@/components/form/ReportUpdateForm";
import { use } from "react";

export default function ReportUpdatePage({ params }: { params: Promise<{ evaluate: string }> }) {
    const { evaluate } = use(params);
    return (
        <Container>
               <main className="flex flex-col mt-6 mb-1 items-center">
                <h1 className="text-3xl font-medium mb-5">Atualizar evolução de paciente</h1>
               </main>
            <ReportUpdateForm evaluate={evaluate} />
        </Container>
    )
}