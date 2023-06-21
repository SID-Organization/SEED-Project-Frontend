import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

//Translation
import TranslationJson from "../../API/Translate/components/calendar.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

export default function Calendar(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [meetings, setMeetings] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [comissoes, setComissoes] = useState([]);
  const [selectedForum, setSelectedForum] = useState("");
  const [foruns, setForuns] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchByTitleSpeech, setSearchByTitleSpeech] = useState({
    id: 1,
    text: "",
  });

  const { pautas } = props;

  useEffect(() => {
    if (foruns.length > 0) {
      setComissoes(
        foruns.map((forum) => ({
          id: forum.idForum,
          label:
            forum.comissaoForum.siglaComissao +
            " - " +
            forum.comissaoForum.nomeComissao,
        }))
      );
    }
  }, [foruns]);

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

  // Updates the variable when the speech is used
  useEffect(() => {
    if (searchByTitleSpeech.text != "") {
      setSearchTitle((ps) => ps + searchByTitleSpeech.text);
      setSearchByTitleSpeech({ ...searchByTitleSpeech, text: "" });
    }
  }, [searchByTitleSpeech]);

  const handleEventClick = (info) => {
    const { pautaId } = info.event.extendedProps;
    setSelectedEvent(pautaId);
    setIsModalOpen(true); // Open the modal when an event is clicked
    console.log("PAUTA ID: ", pautaId);
    props.setPautaId(pautaId);
    props.setIsModalOpen(false);
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
        weekends={true}
        events={meetings}
        dayMaxEventRows={3}
        eventClick={handleEventClick}
        locale={language}
        eventMouseEnter={(info) => {
          info.el.style.cursor = "pointer";
        }}
      />
    </div>
  );
}
