import { Container } from "@/components/container"
import { CareCalendar } from "@/app/dashboard/components/calendar"
import PrivateRoute from "@/components/private"

export default function Dashboard() {
    return (
        <Container>
                <CareCalendar />
        </Container>
    )
}