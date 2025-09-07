"use client"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function LogoAndLoginButton() {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated) return null
    return (
        <div className="w-full max-w-7xl mx-auto px-4">

            <div className="w-full flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-3xl font-bold text-defaultSnow">
                        Fisio<span className="text-defaultBlack">Admin</span>
                    </h1>
                </Link>

                <Link href="/login">
                    <button className="border-2 border-defaultSnow p-1 h-11 rounded-lg font-bold text-defaultSnow w-28 hover:bg-defaultSnow hover:text-defaultGreen transition-all">
                        LOGIN
                    </button>
                </Link>

            </div>

        </div>
    )
}