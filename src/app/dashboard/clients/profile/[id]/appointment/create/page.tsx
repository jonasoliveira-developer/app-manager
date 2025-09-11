import { Container } from "@/components/container";
import { CarePlanCreate } from "@/components/form/caraPlanCreate";
import Link from "next/link";
import { use } from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function AppointmentCreatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <Container>
            <main className="flex flex-col mt-6 mb-1 items-center">
                <div className="w-full max-w-3xl flex items-center justify-between mb-5">
                    <Link href={`/dashboard/clients/profile/${id}`}>
                        <SlArrowLeft className="hover:cursor-pointer text-defaultGreen" />  
                    </Link>
                    <div className="w-full mx-auto">
                         <h1 className="text-2xl font-medium mb-5 text-center">Criar plano de atendimento</h1>
                    </div>
                </div>
                
            </main>
            <CarePlanCreate params={{ id }} />
        </Container>
    )
}