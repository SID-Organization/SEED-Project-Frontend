//Translation
import TranslationJson from "../../API/Translate/components/subHeaderPautas.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { useContext, useEffect, useState } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";
import { Box, Modal, Tooltip } from "@mui/material";

//MUI
import { Button, TextField, InputAdornment, Autocomplete } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";
import DateUtils from "../../utils/Date-Utils";

import DatePicker from "../Date-picker";
import VoiceSpeech from "../VoiceSpeech";

import PautaService from "../../service/Pauta-Service";

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

export default function ModalPauta(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [pauta, setPauta] = useState([]);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [searchTitle, setSearchTitle] = useState("");
  const [searchByTitleSpeech, setSearchByTitleSpeech] = useState("");

  useEffect(() => {
    if (!props.pautaId) return;
    PautaService.getPautaById(props.pautaId).then((data) => {
      if (!data || typeof data !== "object") {
        setPauta(null);
        return;
      }
      setPauta(data);
    });
    console.log("PAUTA DATA: ", pauta);
  }, [props.pautaId]);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const convertDateToInput = (date) => {
    const [day, month, year] = date.split("/");
    return year + "-" + month + "-" + day;
  };

  return (
    <Modal
      style={{ zIndex: 1 }}
      open={props.isModalOpen}
      onClose={() => props.setIsModalOpen(false)}
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
                searchValue={convertDateToInput(
                  DateUtils.formatDate(pauta.dataReuniaoPauta)
                )}
                viewOnly={true}
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
                  value={pauta.horarioInicioPauta}
                  disabled
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
                  value={pauta.horarioTerminoPauta}
                  disabled
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  sx={{
                    width: "10rem",
                    height: "3rem",
                  }}
                />
                <Tooltip
                  title={pauta?.forumPauta?.comissaoForum?.nomeComissao}
                  placement="top"
                >
                  <TextField
                    id="outlined-basic"
                    label={translate["Comissão"]?.[language] ?? "Comissão"}
                    variant="outlined"
                    type="text"
                    value={pauta?.forumPauta?.comissaoForum?.nomeComissao}
                    disabled
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                    sx={{
                      width: "10rem",
                      height: "3rem",
                    }}
                  />
                </Tooltip>
              </div>
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
                  <VoiceSpeech setTexto={setSearchByTitleSpeech} speechId={1} />
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
                  {translate["Propostas da pauta"]?.[language] ??
                    "Propostas da pauta"}
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
  );
}
