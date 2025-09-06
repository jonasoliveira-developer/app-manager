"use client";

import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { generateEventsFromCarePlan } from "@/utils/carePlanUtils";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Dia inteiro",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Não há eventos neste período",
};

export interface CarePlanResponseDTO {
  title: string;
  id: string;
  userId: string;
  clientId: string;
  startDate: string;
  expectedEndDate: string;
  actualEndDate: string;
  payment: {
    value: number;
  };
  schedule: {
    id: string;
    dayOfWeek: string;
    sessionTime: string;
    color: string;
  }[];
}

export function CareCalendar() {
  const { user } = useAuth();
  const [carePlans, setCarePlans] = useState<CarePlanResponseDTO[]>([]);
  const [clientNames, setClientNames] = useState<Record<string, string>>({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");

  useEffect(() => {
    async function fetchCarePlansAndClients() {
      try {
        const carePlanRes = await api.get("/care-plans", {
          params: { id: user?.id },
        });

        const plans: CarePlanResponseDTO[] = carePlanRes.data.content || [];
        setCarePlans(plans);

        const uniqueClientIds = Array.from(new Set(plans.map(p => p.clientId)));
        const clientFetches = uniqueClientIds.map(id =>
          api.get(`/clients/${id}`)
        );

        const clientResponses = await Promise.all(clientFetches);
        const nameMap: Record<string, string> = {};

        clientResponses.forEach((res, index) => {
          const clientId = uniqueClientIds[index];
          nameMap[clientId] = res.data.name;
        });

        setClientNames(nameMap);
      } catch (error) {
        console.error("Erro ao buscar planos ou clientes:", error);
      }
    }

    if (user?.id) fetchCarePlansAndClients();
  }, [user?.id]);

  const allEvents = carePlans
    .map(plan => {
      const clientName = clientNames[plan.clientId] || "Paciente";
      return generateEventsFromCarePlan({
        title: clientName,
        subtitle: plan.title,
        startDate: plan.startDate,
        endDate: plan.expectedEndDate,
        schedule: plan.schedule.map(s => ({
          dayOfWeek: s.dayOfWeek,
          sessionTime: s.sessionTime,
          color: s.color,
        })),
      });
    })
    .flat();

  const CustomEvent = ({ event }: { event: any }) => (
    <div className="p-[2px] leading-tight text-[11px] text-white flex justify-between items-center ">
        <div className="font-semibold">{event.title}</div>
        <div className="text-[10px]">{event.time}</div>
      <div>{event.subtitle}</div>
    </div>
  );

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.color || "#3174ad";
    const style = {
      backgroundColor,
      borderRadius: "4px",
      color: "white",
      border: "none",
      padding: "2px 4px",
      fontSize: "10px",
      lineHeight: "1.2",
    };
    return { style };
  };

  return (
    <div className="w-full px-4 py-8 bg-white rounded shadow">
      <h1 className="text-4xl mb-10 font-bold text-defaultDarkGreen text-center">
        Agenda de pacientes
      </h1>

      <Calendar
        localizer={localizer}
        messages={messages}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        onNavigate={date => setCurrentDate(date)}
        onView={view => setCurrentView(view)}
        views={["month", "week", "day", "agenda"]}
        scrollToTime={new Date()}
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        components={{ event: CustomEvent }}
      />
    </div>
  );
}