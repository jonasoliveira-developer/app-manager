"use client"

import { Container } from "@/components/container";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function DashboardHeader () {
      const pathname = usePathname();

  const navLinks = [
    { name: "Agenda", href: "/dashboard" },
    { name: "Pacientes", href: "/dashboard/clients" },
    { name: "Financeiro", href: "/dashboard/finance" },
  ];

   return (
    <Container>
            <header className="max-w-7xl m-auto flex items-center px-4 py-4 bg-defaultGreen p-4 rounded gap-4">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`font-bold text-xl ${
              isActive ? "text-blue-950 underline" : "text-defaultWhite"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </header>
    </Container>
  );

}