import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/logo-copia.png"

export function Header() {
    return (
        <header className="w-full flex items-center px-4 py-4 bg-defaultWhite h-30">
            <div className="w-full flex items-center justify-between max-w-7xl m-auto ">
                <Link href="/" >
                    <Image src={logo} alt="logo marca" width={180} height={40} />
                </Link>  

                <div className="flex items-baseline gap-5">
                
                     <button className="bg-defaultGreen p-1 h-12 rounded-lg font-bold text-defaultWhite w-28 hover:bg-defaultSoftGreen">
                        <Link href="/dashboard">
                            LOGIN
                        </Link>
                   </button>
                </div>
            </div>
        </header>
    )
}