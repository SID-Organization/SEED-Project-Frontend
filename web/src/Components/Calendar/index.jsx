import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar(props) {
  const [meetings, setMeetings] = useState([
    {
      title: "Event 1",
      start: "2023-06-06T10:30:00",
      end: "2023-06-06T12:30:00",
      extendedProps: {
        pautaId: 1,
      },
    },
    {
      title: "Event 2",
      start: "2023-06-09T10:30:00",
      end: "2023-06-09T12:30:00",
      extendedProps: {
        pautaId: 2,
      },
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    console.log("meetings: ", meetings);
  }, [meetings]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={meetings}
        dayMaxEventRows={3}
        eventClick={handleEventClick}
      />
    </div>
  );
}
