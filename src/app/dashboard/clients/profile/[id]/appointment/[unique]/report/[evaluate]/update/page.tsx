import { Container } from "@/components/container";
import { ReportUpdateForm} from "@/components/form/ReportUpdateForm";
import Link from "next/link";
import { use } from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function ReportUpdatePage({ params }: { params: Promise<{ evaluate: string, unique:string, id:  string }> }) {
    const { evaluate, unique, id } = use(params);
    return (
        <Container>
               <main className="flex flex-col mt-6 mb-1 items-center">
                   <div className="w-full max-w-3xl flex items-center justify-between mb-5">
                    <Link href={`/dashboard/clients/profile/${id}/appointment/${unique}`}>
                        <SlArrowLeft className="hover:cursor-pointer text-defaultGreen" />  
                    </Link>
                    <div className="w-full mx-auto">
                         <h1 className="text-2xl font-medium mb-5 text-center">Atualizar evolução do paciente</h1>
                    </div>
                </div>
               </main>
            <ReportUpdateForm evaluate={evaluate} />
        </Container>
    )
}