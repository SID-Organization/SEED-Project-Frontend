import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

//Translation
import TranslationJson from "../../API/Translate/components/calendar.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

export default function Calendar(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const [meetings, setMeetings] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { pautas } = props;

  useEffect(() => {
    const convertedMeetings = pautas.map((pauta) => ({
      title: `${translate["Pauta"]?.[language] ?? "Pauta"} - ${pauta.idPauta}`,
      start: `${convertDateFormat(pauta.dataReuniao)}T${pauta.horaReuniao}`,
      end: `${convertDateFormat(pauta.dataReuniao)}T${
        pauta.horaTerminoReuniao
      }`,
      extendedProps: {
        pautaId: pauta.idPauta,
      },
    }));

    setMeetings(convertedMeetings);
  }, [pautas]);

  useEffect(() => {
    console.log("MEETINGS NECESSARY: ", meetings);
  }, [meetings]);

  const handleEventClick = (info) => {
    const { pautaId } = info.event.extendedProps;
    setSelectedEvent(pautaId);
    console.log("PAUTA ID: ", pautaId);
  };

  const convertDateFormat = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
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
