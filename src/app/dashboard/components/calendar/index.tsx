"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configura o idioma como português do Brasil
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

const events = [
  // Hoje de manhã (28/07/2025)
  {
    title: "Fulana de tal",
    start: new Date(2025, 6, 28, 8, 0),
    end: new Date(2025, 6, 28, 9, 0),
    color: "#FF6B6B", // vermelho
  },
  {
    title: "Beltrana Não sei da Onde",
    start: new Date(2025, 6, 28, 9, 30),
    end: new Date(2025, 6, 28, 10, 30),
    color: "#4ECDC4", // verde água
  },
  {
    title: "Ciclano de Quem Sabe",
    start: new Date(2025, 6, 28, 11, 0),
    end: new Date(2025, 6, 28, 11, 45),
    color: "#FFD93D", // amarelo
  },

  // Depois de amanhã (30/07/2025)
  {
    title: "Paulo das Costas",
    start: new Date(2025, 6, 30, 14, 0),
    end: new Date(2025, 6, 30, 15, 30),
    color: "#1A535C", // azul petróleo
  },
  {
    title: "Maria José",
    start: new Date(2025, 6, 30, 16, 0),
    end: new Date(2025, 6, 30, 17, 0),
    color: "#FF9F1C", // laranja
  },
  {
    title: " Ana Paula",
    start: new Date(2025, 6, 30, 18, 0),
    end: new Date(2025, 6, 30, 19, 0),
    color: "#6A4C93", // roxo
  },
];

const eventStyleGetter = (event: any) => {
  const backgroundColor = event.color || "#3174ad"; // cor padrão se não tiver
  const style = {
    backgroundColor,
    borderRadius: "4px",
    color: "white",
    border: "none",
    padding: "2px 8px",
  };
  return { style };
};

export function CareCalendar() {
  return (
    <div className="w-full">
      <Calendar
        localizer={localizer}
        messages={messages}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}