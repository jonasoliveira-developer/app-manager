"use client"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

import Logo from "@/assets/logo_header.png"


export function LogoAndLoginButton() {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated) return null
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="w-full flex justify-between items-center rounded-full">

                {/* Logo */}
                <Link href="/" className="w-20">
                    <Image src={Logo} alt="Logo" />
                </Link>

                {/* Navegação */}
                <div className="flex items-center gap-4">
                    <Link href="/about" className="text-defaultSnow font-medium hover:underline transition-all">
                        INSTITUCIONAL
                    </Link>
                    <Link href="/term" className="text-defaultSnow font-medium hover:underline transition-all">
                        TERMOS
                    </Link>
                    <Link href="/login">
                        <button className="border-2 border-defaultSnow p-1 h-11 rounded-lg font-bold text-defaultSnow w-28 hover:bg-defaultSnow hover:text-defaultGreen transition-all">
                            LOGIN
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    )
}