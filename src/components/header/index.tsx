"use client";

import Link from "next/link";
import Image from "next/image";
import prifileImage from "@/assets/profile-default.png";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function Header() {
    const { isAuthenticated, user } = useAuth();
    const pathname = usePathname();

    const navLinks = [
        { name: "Agenda", href: "/dashboard", exact: true },
        { name: "Pacientes", href: "/dashboard/clients" },
        { name: "Financeiro", href: "/dashboard/finance" },
    ];

    return (
    <header className="w-full bg-defaultGreen py-4">
  <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    
    {/* Topo: Foto + Nome */}
    {isAuthenticated && user && (
      <div className="flex justify-center md:justify-start items-center gap-3">
        <Link href="/user/profile" className="flex items-center gap-3">
          <Image
            src={prifileImage}
            alt="Perfil do usuário"
            width={80}
            height={80}
            className="rounded-full object-cover hover:opacity-80 transition"
          />
          <h1 className="text-2xl md:text-3xl text-defaultSnow">{user.name}</h1>
        </Link>
      </div>
    )}

    {/* Logo deslogado */}
    {!isAuthenticated && (
      <div className="flex justify-center md:justify-start">
        <Link href="/">
          <h1 className="text-3xl font-bold text-defaultSnow">
            Fisio<span className="text-defaultBlack">Admin</span>
          </h1>
        </Link>
      </div>
    )}

    {/* Navegação logado */}
    {isAuthenticated && (
      <nav className="flex justify-center md:justify-end flex-wrap gap-5">
        {navLinks.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold text-xl ${isActive ? "text-gray-950 underline" : "text-defaultSnow"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    )}

    {/* Botão login deslogado na home */}
    {!isAuthenticated && pathname === "/" && (
      <div className="flex justify-center md:justify-end">
        <Link href="/login">
          <button className="border-2 border-defaultSnow p-1 h-11 rounded-lg font-bold text-defaultSnow w-28 hover:bg-defaultSnow hover:text-defaultGreen transition-all">
            LOGIN
          </button>
        </Link>
      </div>
    )}
  </div>
</header>
    )
}