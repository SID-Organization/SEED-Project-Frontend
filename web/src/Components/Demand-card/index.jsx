import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  Radio,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

// Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import ProposalService from "../../service/Proposal-Service";

// Utils
import DemandUtils from "../../utils/Demand-Utils";
import UserUtils from "../../utils/User-Utils";

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

const styleModalGenerateProposal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 405,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
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
  const [data, setData] = useState(null);
  const [isDemandLoading, setIsDemandLoading] = useState(false);
  const [openReasonOfCancellation, setOpenReasonOfCancellation] =
    useState(false);
  const [openGenerateProposal, setOpenGenerateProposal] = useState(false);
  const [isDraftSelected, setIsDraftSelected] = useState(false);

  const navigate = useNavigate();

  // Busca o usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Busca o primeiro registro da demanda
  const [firstLog, setFirstLog] = useState();
  const [demandLogs, setDemandLogs] = useState([]);

  //Modal delete draft
  const [openModalDeleteDraft, setOpen] = useState(false);
  const handleOpenModalDeleteDraft = () => setOpen(true);
  const handleCloseModalDeleteDraft = () => setOpen(false);

  const getFirstLog = async () => {
    DemandLogService.getDemandLogs(props.demand.idDemanda).then((data) => {
      setDemandLogs(data);
      if (data && data.length > 0) {
        let firstLog = new Date(
          data[0].recebimentoHistorico
        ).toLocaleDateString();
        setFirstLog(firstLog);
      }
    });
  };

  useEffect(() => {
    getFirstLog();
  }, []);

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
      linkJiraProposta: "https://jira.com/sid",
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

    ProposalService.createProposal(proposal).then((response) => {
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

  function formatDemandStatus(type) {
    const statusByRole = DemandUtils.getDemandStatusByRole(
      props.demand.statusDemanda,
      user.cargoUsuario
    );
    const status =
      statusByRole[0].toLocaleUpperCase() +
      statusByRole.split("_").join(" ").toLocaleLowerCase().slice(1);

    if (type === 1) {
      if (status.length > 15) {
        return status.slice(0, 15) + "...";
      }
    }
    return status;
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
    setData(data);
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
        <Card
          sx={{ width: 430, height: 180 }}
          style={{
            boxShadow: "1px 1px 5px 0px #808080db",
            borderLeft:
              "7px solid " +
              DemandUtils.getDemandStatusColorByRole(
                props.demand.statusDemanda,
                user.cargoUsuario
              ),
          }}
        >
          <CardContent>
            <div className="flex items-center justify-between">
              <Tooltip title={props.demand.tituloDemanda}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#023A67",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {props.demand.tituloDemanda.length > 20
                    ? props.demand.tituloDemanda.slice(0, 20) + "..."
                    : props.demand.tituloDemanda}
                </Typography>
              </Tooltip>

              <Typography
                sx={{ mt: 1 }}
                color="#675E5E"
                fontWeight="bold"
                className="flex"
              >
                <span className="mr-1 text-[0.95rem]">Status:</span>
                <Tooltip title={formatDemandStatus(2)}>
                  <span className="text-[0.95rem] font-medium text-black">
                    {formatDemandStatus(1)}
                  </span>
                </Tooltip>
                {/* Select */}
                {props.demand.statusDemanda === "RASCUNHO" && (
                  <div className="ml-5 flex items-center justify-center">
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
                  <span className="mr-1 text-[0.95rem]">Score:</span>
                  <span className="text-[0.95rem] font-medium text-black">
                    {props.demand.scoreDemanda}
                  </span>
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="#675E5E"
                  fontWeight="bold"
                  className="flex"
                >
                  <span className="mr-1 text-[0.95rem]">Valor:</span>
                  <span className="text-[0.95rem] font-medium text-black">
                    {"R$10"}
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
                  <span className="mr-1 flex items-center justify-center text-[0.95rem] text-black">
                    Progresso:
                  </span>
                  <span className="grid">
                    <Box className="flex items-center justify-center ">
                      <Slider
                        aria-label="Temperature"
                        defaultValue={getPercents}
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
                  <span className="ml-1 flex items-center justify-end text-xs text-black">
                    {getPercents() + "%"}
                  </span>
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions className="flex justify-between">
            <div className="ml-1 mr-1 flex items-center justify-start gap-2">
              <div className="flex">
                <Typography color="#675E5E" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem]">De: </span>
                </Typography>
                <Typography color="black" fontWeight="bold" className="flex">
                  <span className="ml-2 text-[0.85rem]">
                    {firstLog && firstLog}
                  </span>
                </Typography>
              </div>
              <div className="flex">
                <Typography color="#675E5E" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem]">Até: </span>
                </Typography>
                <Typography color="black" fontWeight="bold" className="flex">
                  <span className="ml-2 text-[0.85rem]">- - - -</span>
                </Typography>
              </div>
            </div>
            <div className="mr-4 flex items-center justify-center gap-3">
              {(props.demand.statusDemanda ===
                "APROVADO_PELO_GERENTE_DA_AREA" ||
                props.demand.statusDemanda === "PROPOSTA_EM_ELABORACAO") &&
                user.cargoUsuario != "SOLICITANTE" && (
                  <div>
                    <Tooltip
                      title={
                        props.demand.statusDemanda ===
                        "APROVADO_PELO_GERENTE_DA_AREA"
                          ? "Gerar proposta"
                          : "Acessar proposta"
                      }
                    >
                      <Button
                        onClick={
                          props.demand.statusDemanda ===
                          "APROVADO_PELO_GERENTE_DA_AREA"
                            ? handleOpenGenerateProposal
                            : handleAccessProposal
                        }
                        variant="contained"
                        sx={{
                          backgroundColor: "#FFF",
                          color: "#0075B1",
                          fontWeight: "bold",
                          border: "#0075B1 solid 1px",
                          fontSize: 12,
                          width: 90,

                          "&:hover": {
                            backgroundColor: "#f3f3f3",
                          },
                        }}
                      >
                        Proposta
                      </Button>
                    </Tooltip>
                    <Modal
                      open={openGenerateProposal}
                      onClose={handleCloseGenerateProposal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleModalGenerateProposal}>
                        <div className="mb-5 flex h-14 w-full items-center justify-center rounded-t-lg bg-dark-blue-weg">
                          <p className="font-roboto text-xl font-bold text-[#FFF]">
                            Insira as seguintes informações
                          </p>
                        </div>
                        <div className="flex items-center justify-center font-roboto">
                          <div className="flex gap-14">
                            <div className="grid items-center justify-center gap-1">
                              <p className="font-bold text-dark-blue-weg">
                                Prazo para a elaboração da proposta
                              </p>
                              <div className="grid items-center justify-center gap-10">
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="dd/mm/aaaa"
                                  type="date"
                                  label="De:"
                                  size="small"
                                  value={startDevDate}
                                  onChange={(e) =>
                                    setStartDevDate(e.target.value)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start" />
                                    ),
                                  }}
                                />
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="dd/mm/aaaa"
                                  type="date"
                                  label="Até:"
                                  size="small"
                                  value={deadLineDate}
                                  onChange={(e) =>
                                    setDeadLineDate(e.target.value)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start" />
                                    ),
                                  }}
                                />
                              </div>
                              <div className="grid items-center justify-center gap-4">
                                <p className="font-bold text-dark-blue-weg">
                                  Link para EPIC do projeto no Jira
                                </p>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="https://jira.weg.net/browse/EPIC-123"
                                  type="text"
                                  label="Link"
                                  size="small"
                                  value={jiraLink}
                                  onChange={(e) => setJiraLink(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="h-[19rem] w-0.5 bg-dark-blue-weg" />
                            <div>
                              <div className="h-[16rem]">
                                <div className="ml-4 grid gap-4">
                                  <p className="font-bold text-dark-blue-weg">
                                    Código PPM
                                  </p>
                                  <TextField
                                    sx={{
                                      width: 100,
                                    }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="123"
                                    type="number"
                                    label="PPM"
                                    size="small"
                                    value={ppmCode}
                                    onChange={(e) => setPpmCode(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="flex items-end justify-between gap-1">
                                <Button
                                  onClick={handleCloseGenerateProposal}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#C2BEBE",
                                    color: "#505050",
                                    fontSize: 11.5,
                                    width: 80,

                                    "&:hover": {
                                      backgroundColor: "#C2BEBE",
                                    },
                                  }}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={handleCreateProposal}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#0075B1",
                                    fontSize: 11.5,
                                    width: 80,
                                    marginTop: 2,

                                    "&:hover": {
                                      backgroundColor: "#0075B1",
                                    },
                                  }}
                                >
                                  Enviar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                )}

              {props.demand.statusDemanda === "CANCELADA" && (
                <div>
                  <Tooltip title="Motivo da reprovação">
                    <Button
                      onClick={handleOpenReasonOfCancellation}
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFF",
                        color: "#0075B1",
                        fontWeight: "bold",
                        border: "#0075B1 solid 1px",
                        width: 85,
                        fontSize: 12,

                        "&:hover": {
                          backgroundColor: "#f3f3f3",
                        },
                      }}
                    >
                      Motivo
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
                        Motivo da reprovação da demanda
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{
                          mt: 5,
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#000000",
                          display: "flex",
                          columnGap: 0.5,
                        }}
                      >
                        Motivo
                        <span style={{ color: "#AD0D0D", fontWeight: 500 }}>
                          *
                        </span>
                      </Typography>
                      <TextField
                        id="outlined-multiline-static"
                        disabled
                        multiline
                        rows={4}
                        value={"Motivo da reprovação da demanda"}
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
                <div>
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
                      <p className="mb-8 flex items-center justify-center text-lg font-semibold text-light-blue-weg">
                        Têm certeza que deseja
                        <br />
                        deletar esse rascunho?
                      </p>
                      <div className="flex items-center justify-center gap-5">
                        <Button
                          autoFocus
                          sx={{
                            backgroundColor: "#C2BEBE",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#C2BEBE",
                            },
                          }}
                        >
                          Cancelar
                        </Button>
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
                          Deletar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
              {props.demand.statusDemanda === "RASCUNHO" && (
                <Tooltip title="Continuar rascunho">
                  <Link to={`/nova-demanda/${props.demand.idDemanda}`}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#0075B1",
                        fontSize: 12,
                        width: 90,
                      }}
                    >
                      Continuar
                    </Button>
                  </Link>
                </Tooltip>
              )}
              {props.demand.statusDemanda !== "RASCUNHO" && (
                <Link to={`/demandas/${props.demand.idDemanda}`}>
                  <Tooltip title="Visualizar demanda">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#0075B1",
                        fontSize: 12,
                        width: 90,
                      }}
                    >
                      Ver mais
                    </Button>
                  </Tooltip>
                </Link>
              )}
            </div>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
