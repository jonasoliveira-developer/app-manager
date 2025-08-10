import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/logo-copia.png"

export function Header() {
    return (
        <header className="w-full flex items-center py-2 bg-defaultWhite h-30">
            <div className="w-full flex items-baseline justify-between max-w-7xl mx-auto px-4 ">
                <Link href="/" >
                    <h1 className="text-3xl font-bold text-defaultGreen">Fisio<span className="text-defaultBlack">Admin</span></h1>
                </Link>  

                <div className="flex items-baseline gap-5">
                    <Link href="/login">
                     <button className="bg-defaultGreen p-1 h-11 rounded-lg font-bold text-defaultWhite w-28 hover:bg-defaultSoftGreen">
                            LOGIN
                   </button>
                     </Link>
                </div>
            </div>
        </header>
    )
}