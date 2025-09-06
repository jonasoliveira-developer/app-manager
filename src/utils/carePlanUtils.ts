import moment from "moment";

export interface CalendarEvent {
  title: string;
  subtitle: string;
  time: string;
  start: Date;
  end: Date;
  color: string;
}

const diasSemana: Record<string, number> = {
  domingo: 0,
  segunda: 1,
  terça: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sábado: 6,
};

/**
 * Gera eventos recorrentes com base no plano de cuidado
 */
export function generateEventsFromCarePlan(plan: {
  title: string; // nome do cliente
  subtitle: string; // nome do plano
  startDate: string;
  endDate: string;
  schedule: { dayOfWeek: string; sessionTime: string; color: string }[];
}): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const start = moment(plan.startDate);
  const end = moment(plan.endDate);

  for (const sched of plan.schedule) {
    const targetDay = Object.entries(diasSemana).find(([key]) =>
      sched.dayOfWeek.toLowerCase().includes(key)
    )?.[1];
    if (targetDay === undefined) continue;

    let current = start.clone();
    while (current.isSameOrBefore(end, "day")) {
      if (current.day() === targetDay) {
        const startTime = moment(`${current.format("YYYY-MM-DD")}T${sched.sessionTime}`);
        const endTime = startTime.clone().add(60, "minutes");

        events.push({
          title: plan.title,
          subtitle: plan.subtitle,
          time: sched.sessionTime,
          start: startTime.toDate(),
          end: endTime.toDate(),
          color: sched.color, // cor individual por sessão
        });
      }
      current.add(1, "day");
    }
  }

  return events;
}