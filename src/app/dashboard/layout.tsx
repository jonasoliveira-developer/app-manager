import {ReactNode} from "react"
import { DashboardHeader } from "@/app/dashboard/components/header"
export default function DashoardLyault({children}: {children: ReactNode}) {
    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}