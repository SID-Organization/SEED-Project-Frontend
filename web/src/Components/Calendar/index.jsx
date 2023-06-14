import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

//Translation
import TranslationJson from "../../API/Translate/components/calendar.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

//MUI
import {
  Box,
  Button,
  Modal,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";
import DatePicker from "../Date-picker";
import VoiceSpeech from "../VoiceSpeech";

const modalStyled = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1250,
  height: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

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
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

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
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

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
        locale={language}
      />
      {isModalOpen && (
        <Modal
          style={{ zIndex: 1 }}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyled}>
            <div className="grid w-full gap-10 font-roboto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <h1 style={{ fontSize: fonts.base }} className="font-bold">
                    {translate["Data da reunião"]?.[language]}:{" "}
                  </h1>
                  <DatePicker
                    searchValue={meetingDate}
                    setSearchValue={setMeetingDate}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-12">
                <div className="flex items-center gap-20">
                  <div className="flex items-center gap-5">
                    <h1 style={{ fontSize: fonts.base }} className="font-bold">
                      {translate["Horário:"]?.[language] ?? "Horário:"}
                    </h1>
                    <TextField
                      id="outlined-basic"
                      label={translate["Início"]?.[language] ?? "Início"}
                      variant="outlined"
                      type="time"
                      value={meetingStartTime}
                      onChange={(e) => setMeetingStartTime(e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      sx={{
                        width: "10rem",
                        height: "3rem",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label={translate["Término"]?.[language] ?? "Término"}
                      variant="outlined"
                      type="time"
                      value={meetingEndTime}
                      onChange={(e) => setMeetingEndTime(e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      sx={{
                        width: "10rem",
                        height: "3rem",
                      }}
                    />
                  </div>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={comissoes}
                    value={selectedForum}
                    onChange={(event, newValue) => {
                      setSelectedForum(newValue);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={translate["Comissão"]?.[language] ?? "Comissão"}
                      />
                    )}
                  />
                </div>
                <TextField
                  id="outlined-basic"
                  label={
                    translate["Procurar por título"]?.[language] ??
                    "Procurar por título"
                  }
                  variant="outlined"
                  value={searchTitle}
                  InputProps={{
                    endAdornment: (
                      <VoiceSpeech
                        setTexto={setSearchByTitleSpeech}
                        speechId={1}
                      />
                    ),
                  }}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-center gap-5">
                  <div className="flex items-center justify-center gap-5">
                    <div className="h-[1.5px] w-10 rounded-full bg-light-blue-weg" />
                    <h1 style={{ fontSize: fonts.xl }}>
                      {translate["Selecione as propostas"]?.[language] ??
                        "Selecione as propostas"}
                    </h1>
                    <div className="h-[1.5px] w-10 rounded-full bg-light-blue-weg" />
                  </div>
                </div>
                <div
                  className="grid max-h-[21rem] gap-5 overflow-y-scroll scrollbar-thin
                  scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full scrollbar-w-2"
                >
                  {/* {readyProposals.length > 0 &&
                    readyProposals
                      .filter((item) => {
                        if (!searchTitle || searchTitle.length < 3) return true;
                        return item.demandaPropostaTitulo
                          .toLowerCase()
                          .includes(searchTitle.toLowerCase());
                      })
                      .map((item, i) => (
                        <NewPautaProposalCard
                          key={i}
                          selectedProposals={selectedProposals}
                          setSelectedProposals={setSelectedProposals}
                          proposal={item}
                        />
                      ))} */}
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
