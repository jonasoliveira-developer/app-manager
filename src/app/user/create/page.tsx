import { NewCustomForm } from "@/app/dashboard/components/form";
import { Container } from "@/components/container";
import { NewUseru } from "@/components/form/newUser";

export default function CreateUser() {
   return (
             <Container>
                <main className=" w-full flex flex-col mb-1  items-center justify-center" style={{ height: 'calc(100vh - 8.5rem)' }}>
                   <h1 className="text-2xl md:text-3xl font-semibold mb-5">
                     Cadastre-se gratuitamente
                  </h1>
                  <NewUseru />
                </main>           
           </Container>

      )
}