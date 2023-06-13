import { useState } from "react";

//Translation
import TranslationJson from "../../API/Translate/components/subHeaderPautas.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";

//MUI
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";

//Components
import Calendar from "../../Components/Calendar";
import Search from "../Search";
import CreateNewPauta from "../Create-new-pauta";
import { useEffect } from "react";
import PautaService from "../../service/Pauta-Service";
import DateUtils from "../../utils/Date-Utils";

//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

export default function SubHeaderPautas(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pautas, setPautas] = useState([]);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    PautaService.getPautas().then((data) => {
      if (!data || typeof data !== "object") {
        setPautas([]);
        return;
      }

      if (!data) return;
      let pautas = data.map((pauta) => ({
        ...pauta,
        dataReuniao: DateUtils.formatDate(pauta.dataReuniao),
      }));

      setPautas(pautas);
    });
  }, []);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate["Pautas"]?.[language] ?? "Pautas"}
        </h1>
        <div className="mr-10 flex gap-16">
          <div className="flex items-center justify-start">
            <Button
              onClick={handleModalOpen}
              style={{ fontSize: fonts.sm }}
              sx={{
                backgroundColor: "#0075B1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                columnGap: "10px",
                color: "#FFF",

                "&:hover": {
                  backgroundColor: "#0075B1",
                },
              }}
            >
              <EventRoundedIcon
                sx={{
                  color: "#FFF",
                  fontSize: "20px",
                  "&:hover": {
                    color: "#FFF",
                  },
                }}
              />
              Ver reuniões
            </Button>
          </div>
          <CreateNewPauta />
          <Search filters={props.filters} setFilters={props.setFilters} />
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
