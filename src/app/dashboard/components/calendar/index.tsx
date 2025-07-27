"use client"
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br"; // importa o idioma
moment.locale("pt-br"); // define como padrão


moment.locale("pt-br"); // define como padrão
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

type ScheduleDTO = {
  dayOfWeek: string;
  sessionTime: string; // formato: "15:00"
};

export function CareCalendar() {
  const dayMap: Record<string, number> = {
    "Domingo": 0,
    "Segunda-feira": 1,
    "Terça-feira": 2,
    "Quarta-feira": 3,
    "Quinta-feira": 4,
    "Sexta-feira": 5,
    "Sábado": 6,
  };

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

  return (
    <div className="w-full pt-5">
      <h2 className="text-title text-lg font-semibold mb-4">Minha agenda</h2>
      <Calendar
        localizer={localizer}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );

}