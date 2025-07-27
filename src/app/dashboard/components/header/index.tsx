import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader () {
    return (
        <Container>
            <header className="max-w-7xl m-auto  flex items-center px-4 py-4 bg-defaultGreen p-4 rounded  gap-4">
                <Link href="/dashboard" className="text-defaultWhite font-bold text-xl">
                    Agenda
                </Link>
                 <Link href="dashboard/clients" className="text-defaultWhite font-bold text-xl">
                    Pacientes
                </Link>
            </header>
        </Container>
    )
}