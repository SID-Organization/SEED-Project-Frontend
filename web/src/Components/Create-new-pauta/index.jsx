import { useEffect, useState } from "react";

// MUI
import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import MuiAddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MuiAddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";

// Components
import DatePicker from "../Date-picker";
import NewPautaProposalCard from "../New-pauta-proposal-card";

// Services
import ProposalService from "../../service/Proposal-Service";
import ForumService from "../../service/Forum-Service";
import PautaService from "../../service/Pauta-Service";

// Utils
import UserUtils from "../../utils/User-Utils";

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
  const [user, setUser] = useState(UserUtils.getLoggedUser());
  const [openedModal, setOpenedModal] = useState(false);
  const [foruns, setForuns] = useState([]);
  const [selectedForum, setSelectedForum] = useState("");
  const [comissoes, setComissoes] = useState([]);
  const [readyProposals, setReadyProposals] = useState([]);
  const [selectedProposals, setSelectedProposals] = useState([]);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");

  const handleOpenModal = () => setOpenedModal(true);
  const handleCloseModal = () => setOpenedModal(false);

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
      alert("Preencha todos os campos");
      return;
    }
    if (meetingEndTime < meetingStartTime) {
      alert("O horário de término deve ser maior que o horário de início");
      return;
    }
    if (selectedProposals.length === 0) {
      alert("Selecione pelo menos uma proposta");
      return;
    }
    const pautaJson = {
      dataReuniaoPauta: meetingDate,
      forumPauta: {
        idForum: selectedForum.id,
      },
      propostasPauta: selectedProposals,
      horarioInicioPauta: meetingStartTime,
      horarioTerminoPauta: meetingEndTime,
      analistaResponsavelPauta: {
        numeroCadastroUsuario: user.numeroCadastroUsuario,
      },
    };

    console.log("PAUTA JSON", pautaJson);

    PautaService.createPauta(pautaJson).then((res) => {
      if (res.error) {
        alert("Erro ao criar pauta\n" + res.error);
        return;
      } else {
        alert("Pauta criada com sucesso");
        handleCloseModal();
      }
    });
  };

  return (
    <div>
      {props.isPauta == true ? (
        <ButtonIsPauta
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={handleOpenModal}
        >
          Crie uma pauta
        </ButtonIsPauta>
      ) : (
        <Button variant="contained" onClick={handleOpenModal}>
          <AddRoundedIcon />
          Criar nova pauta
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyled}>
          <div className="grid w-full gap-10 font-roboto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <h1 className="font-bold">Data da reunião: </h1>
                <DatePicker
                  searchValue={meetingDate}
                  setSearchValue={setMeetingDate}
                />
              </div>
              <Button
                disabled={false}
                variant="contained"
                endIcon={<CheckRoundedIcon />}
                onClick={handleCreatePauta}
              >
                Criar pauta
              </Button>
            </div>
            <div className="flex items-center justify-between gap-12">
              <div className="flex items-center gap-20">
                <div className="flex items-center gap-5">
                  <h1 className="font-bold">Horário:</h1>
                  <TextField
                    id="outlined-basic"
                    label="Início"
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
                    label="Término"
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
                    <TextField {...params} label="Comissão" />
                  )}
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Procurar proposta por título"
                variant="outlined"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center justify-center gap-5">
                  <div className="h-[1.5px] w-10 rounded-full bg-light-blue-weg" />
                  <h1 className="text-xl">Selecione as propostas</h1>
                  <div className="h-[1.5px] w-10 rounded-full bg-light-blue-weg" />
                </div>
              </div>
              <div
                className="grid max-h-[21rem] gap-5 overflow-y-scroll scrollbar-thin
                scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full scrollbar-w-2"
              >
                {readyProposals.length > 0 &&
                  readyProposals.map((item, i) => (
                    <NewPautaProposalCard
                      key={i}
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
