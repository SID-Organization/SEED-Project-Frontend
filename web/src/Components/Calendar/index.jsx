import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const calendarOptions = {
    // ... outras configurações do calendário ...
    buttonText: {
      today: "<span style='color: #0075B1'>Hoje</span>",
      month: "<span style='color: #0075B1'>Mês</span>",
      week: "<span style='color: #0075B1'>Semana</span>",
      day: "<span style='color: #0075B1'>Dia</span>",
    },
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={[
        { title: "event 1", date: "2023-06-05" },
        { title: "event 2", date: "2023-06-05" },
      ]}
      {...calendarOptions}
    />
  );
}
