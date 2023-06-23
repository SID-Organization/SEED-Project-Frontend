import { useContext, useEffect, useState } from "react";

// MUI
import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import MuiAddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MuiAddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { Divider, InputAdornment, InputBase, Paper } from "@mui/material";

// Components
import DatePicker from "../Date-picker";
import NewPautaProposalCard from "../New-pauta-proposal-card";

// Services
import ProposalService from "../../service/Proposal-Service";
import ForumService from "../../service/Forum-Service";
import DemandService from "../../service/Demand-Service";
import PautaService from "../../service/Pauta-Service";

// Utils
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";
import VoiceSpeech from "../VoiceSpeech";
import Notification from "../Notification";

//Translation
import TranslationJson from "../../API/Translate/components/createNewPauta.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

const TextField = styled(MuiTextField)({
  width: "14rem",
  marginBottom: "1rem",
  height: "3rem",
});

const AddBoxIcon = styled(MuiAddBoxIcon)(({ theme }) => ({
  fontSize: "35px",
  color: "#023A67",
  // Adicione a regra de estilo para ajustar o tamanho do ícone
  "& svg": {
    fontSize: "35px",
  },
}));

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

const ButtonIsPauta = styled(MuiButton)(() => ({
  color: "#0075B1",
  fontWeight: "bold",
}));

const Button = styled(MuiButton)({
  backgroundColor: "#0075B1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  columnGap: "10px",

  "&:hover": {
    backgroundColor: "#0075B1",
  },
});

const AddRoundedIcon = styled(MuiAddRoundedIcon)({
  color: "#fff",
  height: "1.5rem",
  width: "1.5rem",
});

export default function CreateNewPauta(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [user, setUser] = useState(UserUtils.getLoggedUser());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifyCreation, setNotifyCreation] = useState(false);

  const [foruns, setForuns] = useState([]);
  const [selectedForum, setSelectedForum] = useState("");
  const [comissoes, setComissoes] = useState([]);
  const [readyProposals, setReadyProposals] = useState([]);
  const [selectedProposals, setSelectedProposals] = useState([]);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");

  // Search for title in create pauta
  const [searchTitle, setSearchTitle] = useState("");
  const [searchByTitleSpeech, setSearchByTitleSpeech] = useState({
    id: 1,
    text: "",
  });

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [fillAllFieldsNotification, setFillAllFieldsNotification] =
    useState(false);

  const [timerNotification, setTimerNotification] = useState(false);
  const [selectProposalNotification, setSelectProposalNotification] =
    useState(false);
  const [errorCreatePautaNotification, setErrorCreatePautaNotification] =
    useState(false);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  // Updates the variable when the speech is used
  useEffect(() => {
    if (searchByTitleSpeech.text != "") {
      setSearchTitle((ps) => ps + searchByTitleSpeech.text);
      setSearchByTitleSpeech({ ...searchByTitleSpeech, text: "" });
    }
  }, [searchByTitleSpeech]);

  useEffect(() => {
    ProposalService.getReadyProposals().then((data) => {
      if (!data) return;
      setReadyProposals(data);
    });

    ForumService.getForuns().then((data) => {
      if (!data) return;
      setForuns(data);
    });
  }, []);

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

  const handleCreatePauta = () => {
    if (!meetingDate || !meetingStartTime || !meetingEndTime) {
      setFillAllFieldsNotification(true);
      const timer = setTimeout(() => {
        setFillAllFieldsNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (meetingEndTime < meetingStartTime) {
      setTimerNotification(true);
      const timer = setTimeout(() => {
        setTimerNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (selectedProposals.length === 0) {
      setSelectProposalNotification(true);
      const timer = setTimeout(() => {
        setSelectProposalNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    const pautaJson = {
      dataReuniaoPauta: meetingDate,
      forumPauta: {
        idForum: selectedForum.id,
      },
      propostasPauta: selectedProposals.map(({ idProposta, ...rest }) => ({
        idProposta,
      })),
      horarioInicioPauta: meetingStartTime,
      horarioTerminoPauta: meetingEndTime,
      analistaResponsavelPauta: {
        numeroCadastroUsuario: user.numeroCadastroUsuario,
      },
    };

    console.log("PAUTA JSON", pautaJson);

    console.warn("Selected proposals", selectedProposals);

    PautaService.createPauta(pautaJson).then((res) => {
      if (res.error) {
        setErrorCreatePautaNotification(true);
        const timer = setTimeout(() => {
          setErrorCreatePautaNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setNotifyCreation(true);
        setIsModalOpen(false);
        selectedProposals.forEach((proposal) => {
          console.log("ProposalIdDemanda", proposal);
          DemandService.updateDemandStatus(proposal.idDemanda, "EM_PAUTA");
        });
      }
    });
  };

  useEffect(() => {
    if (notifyCreation) {
      const timeout = setTimeout(() => {
        setNotifyCreation(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [notifyCreation]);

  useEffect(() => {
    console.warn("Selected proposals", selectedProposals);
  }, [selectedProposals]);

  const getTranslate = (text) => {
    return translate[text]?.[language] ?? text;
  };

  return (
    <div>
      {errorCreatePautaNotification && (
        <Notification
          message={
            translate["Erro ao criar pauta"]?.[language] + "\n" + res.error
          }
          severity={"error"}
        />
      )}
      {selectProposalNotification && (
        <Notification
          message={
            translate["Selecione pelo menos uma proposta"][language] ??
            "Selecione pelo menos uma proposta"
          }
          severity={"warning"}
        />
      )}
      {timerNotification && (
        <Notification
          message={
            translate[
              "O horário de término deve ser maior que o horário de início"
            ][language] ??
            "O horário de término deve ser maior que o horário de início"
          }
          severity={"warning"}
        />
      )}
      {fillAllFieldsNotification && (
        <Notification
          message={
            translate["Preencha todos os campos!"]?.[language] ??
            "Preencha todos os campos"
          }
          severity={"warning"}
        />
      )}
      {props.isPauta ? (
        <ButtonIsPauta
          style={{ fontSize: fonts.sm }}
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          {translate["Crie uma pauta"]?.[language] ?? "Crie uma pauta"}
        </ButtonIsPauta>
      ) : (
        <Button
          style={{ fontSize: fonts.sm }}
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          <AddRoundedIcon />
          {translate["Criar nova pauta"]?.[language] ?? "Criar nova pauta"}
        </Button>
      )}
      {notifyCreation && (
        <Notification
          message={translate["Pauta criada com sucesso"]?.[language]}
          severity={"success"}
        />
      )}
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
              <Button
                style={{ fontSize: fonts.sm }}
                disabled={false}
                variant="contained"
                endIcon={<CheckRoundedIcon />}
                onClick={handleCreatePauta}
              >
                {translate["Criar pauta"]?.[language] ?? "Criar pauta"}
              </Button>
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
                    <TextField {...params} label={getTranslate("Comissão")} />
                  )}
                />
              </div>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 240,
                  height: 40,
                }}
                style={{
                  boxShadow: "#bdbdbd 0px 1px 5px 1px",
                }}
              >
                <SearchIcon
                  sx={{
                    color: "#919191",
                    fontSize: "20px",
                    width: "25px",
                  }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                  type={props.type}
                  sx={{ ml: 1, flex: 1, fontSize: "13px" }}
                  placeholder={translate["Procurar por título"]?.[language]}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  value={searchTitle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  endAdornment={
                    <>
                      <VoiceSpeech
                        setTexto={setSearchByTitleSpeech}
                        speechId={1}
                      />
                    </>
                  }
                />
              </Paper>
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
                {readyProposals.length > 0 &&
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
                    ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
