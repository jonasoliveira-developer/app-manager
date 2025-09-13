"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/assets/logo_header.png";

export function LogoAndLoginButton() {
    const { isAuthenticated } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    if (isAuthenticated) return null;

    return (
        <header className="w-full bg-defaultGreen text-defaultSnow px-4 py-3 z-50 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="w-20">
                    <Image src={Logo} alt="Logo" />
                </Link>

                {/* Menu desktop */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/about" className="font-medium hover:underline transition-all">
                        INSTITUCIONAL
                    </Link>
                    <Link href="/term" className="font-medium hover:underline transition-all">
                        TERMOS
                    </Link>
                    <Link href="/login">
                        <button className="border-2 border-defaultSnow px-4 h-11 rounded-lg font-bold text-defaultSnow hover:bg-defaultSnow hover:text-defaultGreen transition-all">
                            LOGIN
                        </button>
                    </Link>
                </nav>

                {/* Botão hambúrguer / X */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {menuOpen ? (
                        <span className="text-3xl font-bold text-defaultSnow">&times;</span>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <span className="w-6 h-0.5 bg-defaultSnow"></span>
                            <span className="w-6 h-0.5 bg-defaultSnow"></span>
                            <span className="w-6 h-0.5 bg-defaultSnow"></span>
                        </div>
                    )}
                </button>
            </div>

            {/* Menu mobile fullscreen com transição */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-defaultDarkGreen text-defaultSnow transition-all duration-700 ease-in-out z-40 ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
                    }`}
            >
                {/* Links do menu */}
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    <Link href="/about" onClick={() => setMenuOpen(false)} className="text-xl font-medium hover:underline transition-all">
                        INSTITUCIONAL
                    </Link>
                    <Link href="/term" onClick={() => setMenuOpen(false)} className="text-xl font-medium hover:underline transition-all">
                        TERMOS
                    </Link>
                    <Link href="/login" onClick={() => setMenuOpen(false)}>
                        <button className="border-2 border-defaultSnow px-6 h-12 rounded-lg font-bold text-defaultSnow hover:bg-defaultSnow hover:text-defaultGreen transition-all">
                            LOGIN
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}