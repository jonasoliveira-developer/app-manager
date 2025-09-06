"use client";


import { useAuth } from "@/context/AuthContext";
import { ImageAndNameUserWithNavLink } from "./components/logged";
import { LogoAndLoginButton } from "./components/unlogged";

export function Header() {
    const { isAuthenticated, user } = useAuth();
 

    return (
        <header className="w-full bg-defaultGreen py-1 print:hidden">
            <ImageAndNameUserWithNavLink />
            <LogoAndLoginButton />
        </header>
    )
}