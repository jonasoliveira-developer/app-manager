import { Container } from "@/components/container";
import {NewCustomForm} from "@/app/dashboard/components/form"

export default function NewClient() {
    return (
        <Container>
            <main className="flex flex-col mt-6 mb-1 items-center">
                <h1 className="text-3xl font-medium">Cadastrar paciente</h1>
                <NewCustomForm />
            </main>           
        </Container>
    )

}