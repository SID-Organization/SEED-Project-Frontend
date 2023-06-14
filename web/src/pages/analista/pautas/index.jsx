import React, { useContext, useState } from "react";
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

//Translation
import TranslationJson from "../../../API/Translate/pages/pautas.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";

export default function Pautas() {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

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
    "01": translate["Janeiro"]?.[language],
    "02": translate["Fevereiro"]?.[language],
    "03": translate["Março"]?.[language],
    "04": translate["Abril"]?.[language],
    "05": translate["Maio"]?.[language],
    "06": translate["Junho"]?.[language],
    "07": translate["Julho"]?.[language],
    "08": translate["Agosto"]?.[language],
    "09": translate["Setembro"]?.[language],
    10: translate["Outubro"]?.[language],
    11: translate["Novembro"]?.[language],
    12: translate["Dezembro"]?.[language],
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
      <div className="grid items-center justify-center">
        <div className="mt-5 flex items-center justify-start">
          <Tooltip title="Ver reuniões agendadas" placement="right">
            <IconButton onClick={handleModalOpen}>
              <EventRoundedIcon
                sx={{
                  color: "#00579D",
                  fontSize: "30px",
                  "&:hover": {
                    color: "#00579D",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className="mb-20 mt-4 flex flex-col items-center justify-center gap-10">
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
                            pautaName={translate["ID da pauta: "]?.[language] + pauta.idPauta}
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
                <span style={{ fontSize: fonts.xl }}>{translate["Sem pautas!"]?.[language] ?? "Sem pautas!"}</span>
              </NoContent>
            </div>
          )}
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={calendarModalStyle}>
          <Calendar pautas={pautas} />
        </Box>
      </Modal>
    </div>
  );
}
