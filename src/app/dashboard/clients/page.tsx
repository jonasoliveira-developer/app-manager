
import {Container} from "@/components/container"
import { TicketItem } from "@/app/dashboard/components/ticket";
import Link from "next/link";



export default function Clients() {


    return (
        <Container>
          <main className="mt-6 mb-2">
               <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Pacientes</h1>
                  <Link href="/dashboard/clients/new" className="bg-defaultFlagGreen px-4 py-1 rounded text-defaultWhite ">
                    Novo paciente
                  </Link>
               </div>
               <div className="overflow-x-auto mt-5">
                    <table className="min-w-full bg-defaultWhite text-sm text-left rounded-lg shadow-md">
                      <thead className="bg-defaultBlack text-defaultWhite">
                        <tr>
                          <th className="p-2">Nome</th>
                          <th className="p-2 hidden sm:block">telefone</th>
                          <th className="p-2">local</th>
                          <th className="p-2 text-center">Prontuario</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TicketItem />
                      </tbody>
                    </table>
                 </div>
            </main>
         </Container>
  );

}

