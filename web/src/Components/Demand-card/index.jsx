import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import MuiTextField from "@mui/material/TextField";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { DialogTitle, IconButton, Radio, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

// Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import ProposalService from "../../service/Proposal-Service";

// Utils
import DemandUtils from "../../utils/Demand-Utils";
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";
import CreateOrAccessProposal from "./CreateOrAccessProposal";
import CurrencyUtils from "../../utils/Currency-Utils";

<<<<<<< HEAD
=======

>>>>>>> 8c3286f6a51637ac0b08d056e40d5617d8f8fe83
//Translations
import TranslationJson from "../../API/Translate/components/demandCard.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";
import JoyriderTutorial from "../Joyrider-tutorial";

const TextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const styleModalReasonOfCancellation = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 405,
  bgcolor: "background.paper",
  borderTop: "8px solid #0075B1",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const styleModalDeleteDraft = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "23rem",
  height: "15rem",
  backgroundColor: "#fff",
  boxShadow: 0,
  borderRadius: 2,
};

export default function DemandCard(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [isDemandLoading, setIsDemandLoading] = useState(false);
  const [openReasonOfCancellation, setOpenReasonOfCancellation] =
    useState(false);
  const [openGenerateProposal, setOpenGenerateProposal] = useState(false);
  const [isDraftSelected, setIsDraftSelected] = useState(false);

  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  // Busca o usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Busca o primeiro registro da demanda
  const [firstLog, setFirstLog] = useState();
  const [demandLogs, setDemandLogs] = useState([]);

  //Modal delete draft
  const [openModalDeleteDraft, setOpen] = useState(false);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());


  const handleOpenModalDeleteDraft = () => setOpen(true);
  const handleCloseModalDeleteDraft = (event) => {
    event.preventDefault();
    setOpen(false);
  }

  const getLogs = async () => {
    DemandLogService.getDemandLogs(props.demand.idDemanda).then((res) => {
      if (res.data) {
        setDemandLogs(res.data);

        let firstLog = new Date(
          res.data[0].recebimentoHistorico
        ).toLocaleDateString();
        setFirstLog(firstLog);
      }
    });
  };

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const handleOpenReasonOfCancellation = () =>
    setOpenReasonOfCancellation(true);
  const handleCloseReasonOfCancellation = () =>
    setOpenReasonOfCancellation(false);

  const handleOpenGenerateProposal = () => setOpenGenerateProposal(true);
  const handleCloseGenerateProposal = () => setOpenGenerateProposal(false);

  const [ppmCode, setPpmCode] = useState(0);
  const [startDevDate, setStartDevDate] = useState("");
  const [deadLineDate, setDeadLineDate] = useState("");
  const [jiraLink, setJiraLink] = useState("");

  function handleDeleteDraft() {
    DemandService.deleteDemand(props.demand.idDemanda).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  }

  const handleCreateProposal = async () => {
    handleCloseGenerateProposal();
    const proposal = {
      codigoPPMProposta: ppmCode,
      periodoExecucaoInicioProposta: startDevDate,
      periodoExecucaoFimProposta: deadLineDate,
      linkJiraProposta: jiraLink,
      responsaveisNegocio: demandLogs
        .filter((logs, index) => {
          return (
            index ===
            demandLogs.findIndex(
              (obj) =>
                obj.numeroCadastroResponsavel === logs.numeroCadastroResponsavel
            )
          );
        })
        .map((log) => ({
          numeroCadastroUsuario: log.numeroCadastroResponsavel,
        })),
      demandaProposta: { idDemanda: props.demand.idDemanda },
    };

    console.log(proposal);

    ProposalService.createProposal(proposal).then((response) => {
      console.log("RESPONSE CREATE PROPOSAL", response);
      if (response.status === 201) {
        DemandService.updateDemandStatus(
          props.demand.idDemanda,
          "PROPOSTA_EM_ELABORACAO"
        ).then((response) => {
          if (response.status === 200) {
            navigate(`/propostas/gerar-proposta/${props.demand.idDemanda}`);
          }
        });
      }
    });
  };

  const handleAccessProposal = () => {
    navigate(`/propostas/gerar-proposta/${props.demand.idDemanda}`);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  function formatDemandStatus(tooltip = false) {
    const statusByRole = DemandUtils.getDemandStatusByRole(
      props.demand.statusDemanda,
      user.cargoUsuario
    );
    // If the status is too long, cuts it
    if (!tooltip)
      if (statusByRole.length > 15) {
        return statusByRole.substr(0, 15) + "...";
      }
    return statusByRole;
  }

  function getPercents() {
    const percent = DemandUtils.getPercentageByStatus(
      props.demand.statusDemanda
    );
    return percent;
  }


  const getData = async () => {
    setIsDemandLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    setIsDemandLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  function handleSelectDrafts() {
    if (props.setSelectedDrafts) {
      setIsDraftSelected(!isDraftSelected);
      if (!isDraftSelected) {
        props.setSelectedDrafts((prevState) => [
          ...prevState,
          props.demand.idDemanda,
        ]);
      } else {
        props.setSelectedDrafts((prevState) =>
          prevState.filter((item) => item !== props.demand.idDemanda)
        );
      }
    }
  }

  //Classname modificada para o card para quando a fonte aumenta ou diminui
  let classNameGap = "grid p-2";

  if (fonts.base < 15) {
    classNameGap += " gap-12";
  } else if (fonts.base > 18) {
    classNameGap += " gap-3";
  } else {
    classNameGap += " gap-7";
  }

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div className="mb-7 grid items-center justify-center">
      {isDemandLoading ? (
        <Skeleton
          variant="rectangular"
          width={430}
          height={180}
          animation="pulse"
        />
      ) : (
        <div id={props.firstDemand === true && "tutorial-demandCard"}>
          <Link to={`/demandas/${props.demand.idDemanda}`}>
            <Card
              sx={{ width: fonts.sm > 14 ? 590 : 520, height: 180 }}
              style={{
                boxShadow: "1px 1px 5px 0px #808080db",
                borderLeft:
                  "7px solid " +
                  DemandUtils.getDemandStatusColorByRole(
                    props.demand.statusDemanda,
                    user.cargoUsuario
                  ),
                transform: hovered ? "translateY(-5px)" : "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className={classNameGap}>
                <div>
                  <div className="flex items-center justify-between">
                    <Tooltip
                      title={
                        props.demand.tituloDemanda.length > 20
                          ? props.demand.tituloDemanda
                          : ""
                      }
                      placement="right"
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#023A67",
                          fontWeight: "bold",
                        }}
                      >
                        <span style={{ fontSize: fonts.base }}>
                          {props.demand.tituloDemanda.length > 20
                            ? props.demand.tituloDemanda.slice(0, 20) + "..."
                            : props.demand.tituloDemanda}
                        </span>
                      </Typography>
                    </Tooltip>

                    <Typography
                      sx={{ mt: 1 }}
                      color="#675E5E"
                      fontWeight="bold"
                      className="flex"
                    >
                      <span style={{ fontSize: fonts.sm }} className="mr-1 ">
                        {translate["Status"]?.[language] ?? "Status"}:
                      </span>
                      <Tooltip title={formatDemandStatus(true)}>
                        <span
                          style={{ fontSize: fonts.sm }}
                          className="font-medium text-black"
                        >
                          {formatDemandStatus()}
                        </span>
                      </Tooltip>
                      {/* Select */}
                      {props.demand.statusDemanda === "RASCUNHO" && (
                        <div className="ml-5 flex items-center justify-center" onClick={
                          (event) => {
                            event.preventDefault();
                          }
                        }>
                          <Radio
                            checked={isDraftSelected}
                            onClick={handleSelectDrafts}
                            sx={{
                              color: "#0075B1",
                              padding: 0,
                              "&.Mui-checked": {
                                color: "#0075B1",
                              },
                            }}
                          />
                        </div>
                      )}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="grid">
                      <Typography
                        sx={{ mt: 1 }}
                        color="#675E5E"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span style={{ fontSize: fonts.sm }} className="mr-1 ">
                          {translate["Score"]?.[language] ?? "Score"}:
                        </span>
                        <span
                          style={{ fontSize: fonts.sm }}
                          className="font-medium text-black"
                        >
                          {props.demand.scoreDemanda ?? "Indefinido"}
                        </span>
                      </Typography>
                      <Typography
                        sx={{ mb: 1.5 }}
                        color="#675E5E"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span style={{ fontSize: fonts.sm }} className="mr-1">
                          {translate["Valor:"]?.[language] ?? "Valor:"}
                        </span>
                        <span
                          style={{ fontSize: fonts.sm }}
                          className="font-medium text-black"
                        >
                          {CurrencyUtils.formatCurrency(
                            props.demand.custoTotalDemanda
                          ) ?? "Indefinido"}
                        </span>
                      </Typography>
                    </div>
                    <div className="flex items-center justify-center">
                      <Typography
                        sx={{ mb: 1.5 }}
                        color="#675E5E"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span
                          style={{ fontSize: fonts.sm }}
                          className="mr-1 flex items-center justify-center  text-black"
                        >
                          {translate["Progresso:"]?.[language] ?? "Progresso:"}
                        </span>
                        <span className="grid">
                          <Box className="flex items-center justify-center ">
                            <Slider
                              aria-label="Temperature"
                              value={getPercents()}
                              getAriaValueText={valuetext}
                              disabled
                              style={{
                                color: DemandUtils.getDemandStatusColorByRole(
                                  props.demand.statusDemanda,
                                  user.cargoUsuario
                                ),
                              }}
                              sx={{
                                height: 16,
                                width: 120,
                                color: DemandUtils.getDemandStatusColorByRole(
                                  props.demand.statusDemanda,
                                  user.cargoUsuario
                                ),
                                "& .MuiSlider-thumb": {
                                  display: "none",
                                },
                              }}
                            />
                          </Box>
                        </span>
                        <span
                          style={{ fontSize: fonts.xs }}
                          className="ml-1 flex items-center justify-end  text-black"
                        >
                          {getPercents() + "%"}
                        </span>
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="ml-1 mr-1 flex items-center justify-start gap-2">
                    <div className="flex">
                      <Typography
                        color="#675E5E"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span style={{ fontSize: fonts.sm }}>
                          {translate["De:"]?.[language] ?? "De:"}{" "}
                        </span>
                      </Typography>
                      <Typography
                        color="black"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span style={{ fontSize: fonts.sm }} className="ml-1">
                          {firstLog ? firstLog : "- - - -"}
                        </span>
                      </Typography>
                    </div>
                    <div className="flex">
                      <Typography
                        color="#675E5E"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span style={{ fontSize: fonts.sm }}>
                          {translate["Até:"]?.[language] ?? "Até:"}{" "}
                        </span>
                      </Typography>
                      <Typography
                        color="black"
                        fontWeight="bold"
                        className="flex"
                      >
                        <span style={{ fontSize: fonts.sm }} className="ml-1">
                          02/06/2023
                          {/* HERE */}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <div className="mr-2 flex items-center justify-center gap-3">
                    {[
                      "APROVADO_PELO_GERENTE_DA_AREA",
                      "PROPOSTA_EM_ELABORACAO",
                    ].includes(props.demand.statusDemanda) &&
                      user.cargoUsuario == "ANALISTA" &&
                      user.nomeUsuario != props.demand.nomeSolicitante && (
                        <div onClick={
                          (event) => {
                            event.preventDefault();
                          }
                        }>
                          <CreateOrAccessProposal
                          cargoUsuario={user.cargoUsuario}
                          statusDemanda={props.demand.statusDemanda}
                          openGenerateProposal={openGenerateProposal}
                          handleOpenGenerateProposal={handleOpenGenerateProposal}
                          handleCloseGenerateProposal={
                            handleCloseGenerateProposal
                          }
                          fonts={fonts}
                          startDevDate={startDevDate}
                          setStartDevDate={setStartDevDate}
                          deadLineDate={deadLineDate}
                          setDeadLineDate={setDeadLineDate}
                          ppmCode={ppmCode}
                          setPpmCode={setPpmCode}
                          jiraLink={jiraLink}
                          setJiraLink={setJiraLink}
                          handleCreateProposal={handleCreateProposal}
                          handleAccessProposal={handleAccessProposal}
                        />
                        </div>
                      )}

                    {props.demand.statusDemanda === "CANCELADA" && (
                      <div onClick={
                        (event) => {
                          event.preventDefault();
                        }
                      }>
                        <Tooltip
                          title={
                            translate["Motivo da reprovação"]?.[language] ??
                            "Motivo da reprovação"
                          }
                        >
                          <Button
                            onClick={handleOpenReasonOfCancellation}
                            variant="contained"
                            style={{ fontSize: fonts.xs }}
                            sx={{
                              backgroundColor: "#FFF",
                              color: "#0075B1",
                              fontWeight: "bold",
                              border: "#0075B1 solid 1px",
                              width: 85,

                              "&:hover": {
                                backgroundColor: "#f3f3f3",
                              },
                            }}
                          >
                            {translate["Motivo"]?.[language] ?? "Motivo"}
                          </Button>
                        </Tooltip>
                        <Modal
                          open={openReasonOfCancellation}
                          onClose={handleCloseReasonOfCancellation}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={styleModalReasonOfCancellation}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              sx={{
                                color: "#0075B1",
                                fontWeight: "bold",
                                fontSize: 30,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {translate["Motivo da reprovação da demanda"]?.[
                                language
                              ] ?? "Motivo da reprovação da demanda"}
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              style={{ fontSize: fonts.lg }}
                              sx={{
                                mt: 5,
                                fontWeight: 700,
                                color: "#000000",
                                display: "flex",
                                columnGap: 0.5,
                              }}
                            >
                              {translate["Motivo"]?.[language] ?? "Motivo"}
                              <span style={{ color: "#AD0D0D", fontWeight: 500 }}>
                                *
                              </span>
                            </Typography>
                            <TextField
                              id="outlined-multiline-static"
                              multiline
                              disabled
                              rows={4}
                              value={props.demand.motivoRecusaDemanda}
                              variant="outlined"
                              sx={{
                                width: 500,
                                height: 100,
                                mt: 2,
                                mb: 5,
                                borderRadius: 5,
                                borderColor: "#0075B1",
                              }}
                            />
                            <span className="flex items-center justify-center gap-4">
                              <Button
                                onClick={handleCloseReasonOfCancellation}
                                variant="contained"
                                style={{
                                  backgroundColor: "#0075B1",
                                  color: "#FFFFFF",
                                  width: 100,
                                }}
                              >
                                OK
                              </Button>
                            </span>
                          </Box>
                        </Modal>
                      </div>
                    )}
                    {props.demand.statusDemanda === "RASCUNHO" && (
                      <div onClick={
                        (event) => {
                          event.preventDefault();
                        }
                      }>
                        <Tooltip title="Deletar rascunho">
                          <IconButton onClick={handleOpenModalDeleteDraft}>
                            <DeleteRoundedIcon
                              sx={{
                                color: "#C31700",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                    <Modal
                      open={openModalDeleteDraft}
                      onClose={handleCloseModalDeleteDraft}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleModalDeleteDraft}>
                        <div className="grid h-full items-center justify-center">
                          <div className="grid items-center justify-center">
                            <div className="flex items-center justify-center">
                              <WarningAmberRoundedIcon
                                sx={{
                                  fontSize: "5rem",
                                  color: "#0075B1",
                                }}
                              />
                            </div>
                            <DialogTitle style={{ color: "#0075B1" }}>
                              <p className="text-center">
                                {translate[
                                  "Têm certeza que deseja deletar esse rascunho?"
                                ]?.[language] ??
                                  "Têm certeza que deseja deletar esse rascunho?"}
                              </p>
                            </DialogTitle>
                            <div className="flex items-center justify-center gap-5" onClick={
                              (event) => {
                                event.preventDefault();
                              }
                            }>
                              <Button
                                onClick={handleCloseModalDeleteDraft}
                                autoFocus
                                sx={{
                                  backgroundColor: "#C2BEBE",
                                  color: "#fff",
                                  "&:hover": {
                                    backgroundColor: "#C2BEBE",
                                  },
                                }}
                              >
                                {translate["Cancelar"]?.[language] ?? "Cancelar"}
                              </Button>
                              <div onClick={
                                (event) => {
                                  event.preventDefault();
                                }
                              }>
                                <Button
                                  onClick={handleDeleteDraft}
                                  sx={{
                                    backgroundColor: "#0075B1",
                                    color: "#fff",
                                    "&:hover": {
                                      backgroundColor: "#0075B1",
                                    },
                                  }}
                                >
                                  {translate["Deletar"]?.[language] ?? "Deletar"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                    {props.demand.statusDemanda === "RASCUNHO" && (
                      <div onClick={
                        (event) => {
                          event.preventDefault();
                        }
                      }>
                        <Tooltip title="Continuar rascunho">
                        <Link to={`/rascunhos/${props.demand.idDemanda}`}>
                          <Button
                            variant="contained"
                            style={{ fontSize: fonts.xs }}
                            sx={{
                              backgroundColor: "#0075B1",
                              width: 90,
                            }}
                          >
                            {translate["Continuar"]?.[language] ?? "Continuar"}
                          </Button>
                        </Link>
                      </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
