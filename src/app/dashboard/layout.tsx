import { Header } from "@/components/header"
import { ReactNode } from "react"

export default function DashoardLyault({ children }: { children: ReactNode }) {
    return (
        <>
        <Header />
            <div className="mt-8" >
                {children}
            </div>
        </>

    )
}