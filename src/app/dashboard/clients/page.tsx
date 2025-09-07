import { Container } from "@/components/container";
import { TicketItem } from "@/app/dashboard/components/ticket";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";

export default function Clients() {
  return (
    <Container>
        <main className="w-full px-6 py-8 bg-slate-300 rounded-lg">
          {/* Cabeçalho */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ">
            <h1 className="text-3xl font-bold text-defaultDarkGreen">Pacientes</h1>

            <Link
              href="/dashboard/clients/new"
              className="inline-flex items-center gap-2 bg-defaultFlagGreen hover:bg-defaultGreenHover text-defaultWhite font-semibold px-5 py-2 rounded-lg transition-all duration-200"
            >
              <FaUserPlus size={16} />
              Novo paciente
            </Link>
          </div>

          {/* Lista de pacientes em cards */}
          <section className="w-full">
            <TicketItem />
          </section>
        </main>
    </Container>
  );
}