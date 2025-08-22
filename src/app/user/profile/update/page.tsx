import { Container } from "@/components/container";
import { EditUser } from "@/components/form/editUser";

export default function UpdateUser() {
    return (
        <Container>
            <main className=" w-full flex flex-col mb-1  items-center justify-center" style={{ height: 'calc(100vh - 8.5rem)' }}>
                <h1 className="text-2xl md:text-3xl font-semibold mb-5">
                    Atualize seus dados
                </h1>
                <EditUser />
            </main>
        </Container>

    )
}