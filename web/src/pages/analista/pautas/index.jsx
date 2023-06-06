import React, { useState } from "react";
import { useEffect } from "react";

//MUI
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Tooltip,
} from "@mui/material";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

// Components
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderPautas from "../../../Components/Sub-header-pautas";
import NoContent from "../../../Components/No-content";
import Calendar from "../../../Components/Calendar";

// Services
import PautaService from "../../../service/Pauta-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import DemandFilterUtils from "../../../utils/DemandFilter-Utils";

export default function Pautas() {
  const [pautas, setPautas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pautasMonths, setPautasMonths] = useState([]);
  const [pautasYear, setPautasYear] = useState([]);

  const [filters, setFilters] = useState(DemandFilterUtils.getEmptyFilter());

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    setIsLoading(true);
    PautaService.getPautas().then((data) => {
      if (!data || typeof data !== "object") {
        setPautas([]);
        setIsLoading(false);
        return;
      }

      if (!data) return;
      let pautas = data.map((pauta) => ({
        ...pauta,
        dataReuniao: DateUtils.formatDate(pauta.dataReuniao),
      }));

      setPautas(pautas);
      setIsLoading(false);
    });
  }, []);

  console.log("PAUTAS: ", pautas);

  useEffect(() => {
    if (pautas.length === 0) return;
    setPautasMonths(() =>
      pautas
        .map((pauta) => pauta.dataReuniao.split("/")[1])
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    setPautasYear(() =>
      pautas
        .map((pauta) => pauta.dataReuniao.split("/")[2])
        .sort()
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [pautas]);

  useEffect(() => {
    console.warn("Pautas", pautas);
  }, [pautas]);

  const getPautasInMonth = (month, year) => {
    return pautas.filter(
      (pauta) =>
        pauta.dataReuniao.split("/")[1] === month &&
        pauta.dataReuniao.split("/")[2] === year
    );
  };

  const months = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const calendarModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderLeft: "5px solid #00579D",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  return (
    <div>
      <SubHeaderPautas filters={filters} setFilters={setFilters} />

      <div className="flex items-center justify-start">
        <Tooltip title="Ver reuniões agendadas">
          <IconButton onClick={handleModalOpen}>
            <EventRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="mb-20 mt-12 flex flex-col items-center justify-center gap-10">
        {isLoading ? (
          <div className="flex h-[71vh] items-center justify-around">
            <CircularProgress />
          </div>
        ) : pautas.length > 0 ? (
          pautasYear.map((year) => (
            <>
              {pautasMonths.map((month) => (
                <>
                  {getPautasInMonth(month, year).length > 0 && (
                    <div key={`${year}-${month}`}>
                      <h1
                        style={{ fontSize: fonts.xl }}
                        className="font-bold text-dark-blue-weg"
                      >
                        {months[month] + " - " + year}
                      </h1>
                      {getPautasInMonth(month, year).map((pauta) => (
                        <PautasCard
                          key={pauta.idPauta}
                          pautaName={"ID da pauta: " + pauta.idPauta}
                          pautaId={pauta.idPauta}
                          qtyProposals={pauta.qtdPropostas}
                          meetingDate={pauta.dataReuniao}
                          meetingTime={pauta.horaReuniao.substring(0, 5)}
                          responsibleAnalyst={pauta.analistaResponsavel}
                        />
                      ))}
                    </div>
                  )}
                </>
              ))}
            </>
          ))
        ) : (
          <div className="flex h-[71vh] items-center justify-around">
            <NoContent isPauta={true}>
              <span style={{ fontSize: fonts.xl }}>Sem pautas!</span>
            </NoContent>
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={calendarModalStyle}>
          <Calendar pautas={pautas} />
        </Box>
      </Modal>
    </div>
  );
}
