import * as React from "react";
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

import { styled } from "@mui/material/styles";

import Skeleton from "@mui/material/Skeleton";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IconButton, InputAdornment, Radio, Tooltip } from "@mui/material";

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

const statusColor = {
  CANCELADA: "#C31700",
  APROVADO_PELA_COMISSAO: "#7EB61C",
  CLASSIFICADO_PELO_ANALISTA: "#64C3D5",
  ABERTA: "#C2BEBE",
  RASCUNHO: "#D9D9D9",
  APROVADO_PELO_GERENTE_DA_AREA: "#00579D",
  PROPOSTA_EM_ELABORACAO: "#FFA500",
  PROPOSTA_EM_EXECUCAO: "#EF8300",
  PROPOSTA_EM_SUPORTE: "FFD600",
  PROPOSTA_FINALIZADA: "00612E",

  BACKLOG: "#C2BEBE",
  ASSESMENT: "#00579D",
  BUSINESS_CASE: "#8862A2",
  TO_DO: "#7EB61C",
  DESIGN_AND_BUILD: "#EF8300",
  SUPPORT: "#FFD600",
  CANCELLED: "#C31700",
  DONE: "#00612E",
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Busca o primeiro registro da demanda
  const [firstLog, setFirstLog] = useState();
  const [demandLogs, setDemandLogs] = useState([]);

  const getFirstLog = async () => {
    const response = await fetch(
      `http://localhost:8080/sid/api/historico-workflow/demanda/${props.demand.idDemanda}`
    );
    const data = await response.json();
    setDemandLogs(data);
    let firstLog = new Date(data[0].recebimentoHistorico).toLocaleDateString();
    setFirstLog(firstLog);
  }

  useEffect(() => {
    getFirstLog();
  }, [])


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


  useEffect(() => {
    console.log("Start", startDevDate)
    console.log("Dead", deadLineDate)
  }, [startDevDate, deadLineDate])


  const handleCreateProposal = async () => {
    const data = {
      codigoPPMProposta: ppmCode,
      periodoExecucaoInicioProposta: "2023-11-12",
      periodoExecucaoFimProposta: "2024-11-30",
      linkJiraProposta: "https://jira.com/sid",
      responsaveisNegocio: demandLogs.filter((logs, index) => {
        return index === demandLogs.findIndex(obj => obj.numeroCadastroResponsavel === logs.numeroCadastroResponsavel)
      }).map((log) => (
        {
          numeroCadastroUsuario: log.numeroCadastroResponsavel
        }
      )),
      demandaProposta: { idDemanda: props.demand.idDemanda },
    };

    console.log("Data", data);

    await fetch("http://localhost:8080/sid/api/proposta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          fetch(`http://localhost:8080/sid/api/demanda/status/${props.demand.idDemanda}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              statusDemanda: "PROPOSTA_EM_ELABORACAO"
            })
          })
        }
      })
  }

  const handleAccessProposal = () => {
    navigate(`/propostas/gerar-proposta/${props.demand.idDemanda}`)
  };

  function valuetext(value) {
    return `${value}°C`;
  }


  function formatDemandStatus(type) {
    const status =
      props.demand.statusDemanda[0].toLocaleUpperCase() +
      props.demand.statusDemanda
        .split("_")
        .join(" ")
        .toLocaleLowerCase()
        .slice(1);

    if (type === 1) {
      if (status.length > 15) {
        return status.slice(0, 15) + "...";
      }
    }
    return status;
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

  useEffect(() => {
    console.log("props.demand: ", props.demand);
  }, []);

  return (
    <div className="grid justify-center items-center mb-7">
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
            borderLeft: "7px solid " + statusColor[props.demand.statusDemanda],
          }}
        >
          <CardContent>
            <div className="flex justify-between items-center">
              <Tooltip title={props.demand.tituloDemanda}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#023A67",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {props.demand.tituloDemanda.length > 25
                    ? props.demand.tituloDemanda.slice(0, 25) + "..."
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
                  <span className="font-medium text-black text-[0.95rem]">
                    {formatDemandStatus(1)}
                  </span>
                </Tooltip>
                {/* Select */}
                {props.demand.statusDemanda === "RASCUNHO" && (
                  <div className="flex justify-center items-center ml-5">
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
                  <span className="font-medium text-black text-[0.95rem]">
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
                  <span className="font-medium text-black text-[0.95rem]">
                    {"R$10"}
                  </span>
                </Typography>
              </div>
              <div className="flex justify-center items-center">
                <Typography
                  sx={{ mb: 1.5 }}
                  color="#675E5E"
                  fontWeight="bold"
                  className="flex"
                >
                  <span className="mr-1 flex justify-center text-[0.95rem] items-center text-black">
                    Progresso:
                  </span>
                  <span className="grid">
                    <Box className="flex justify-center items-center ">
                      <Slider
                        aria-label="Temperature"
                        defaultValue={50}
                        getAriaValueText={valuetext}
                        disabled
                        style={{
                          color: statusColor[props.demand.statusDemanda],
                        }}
                        sx={{
                          height: 16,
                          width: 120,
                          color: statusColor[props.demand.statusDemanda],
                          "& .MuiSlider-thumb": {
                            display: "none",
                          },
                        }}
                      />
                    </Box>
                  </span>
                  <span className="text-xs flex justify-end items-center text-black ml-1">
                    15%
                  </span>
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions className="flex justify-between">
            <div className="flex justify-start items-center gap-2 ml-1 mr-1">
              <div className="flex">
                <Typography color="#675E5E" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem]">De: </span>
                </Typography>
                <Typography color="black" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem] ml-2">{firstLog && firstLog}</span>
                </Typography>
              </div>
              <div className="flex">
                <Typography color="#675E5E" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem]">Até: </span>
                </Typography>
                <Typography color="black" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem] ml-2">- - - -</span>
                </Typography>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3 mr-4">
              {(props.demand.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA"
                || props.demand.statusDemanda === "PROPOSTA_EM_ELABORACAO"
                && user.cargoUsuario != "SOLICITANTE") && (
                <div>
                  <Tooltip title={props.demand.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA" ? "Gerar proposta" : "Acessar proposta"}>
                    <Button
                      onClick={props.demand.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA" ? handleOpenGenerateProposal : handleAccessProposal}
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
                      <div className="mb-5 h-14 w-full bg-dark-blue-weg flex justify-center items-center rounded-t-lg">
                        <p className="font-roboto text-[#FFF] font-bold text-xl">
                          Insira as seguintes informações
                        </p>
                      </div>
                      <div className="flex justify-center items-center font-roboto">
                        <div className="flex gap-14">
                          <div className="grid justify-center items-center gap-1">
                            <p className="font-bold text-dark-blue-weg">
                              Prazo para a elaboração da proposta
                            </p>
                            <div className="grid justify-center items-center gap-10">
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="dd/mm/aaaa"
                                type="date"
                                label="De:"
                                size="small"
                                value={startDevDate}
                                onChange={e => setStartDevDate(e.target.value)}
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
                                onChange={e => setDeadLineDate(e.target.value)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start" />
                                  ),
                                }}
                              />
                            </div>
                            <div className="grid justify-center items-center gap-4">
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
                                onChange={e => setJiraLink(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="h-[19rem] w-0.5 bg-dark-blue-weg" />
                          <div>
                            <div className="h-[16rem]">
                              <div className="grid gap-4 ml-4">
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
                                  type="text"
                                  label="PPM"
                                  size="small"
                                  value={ppmCode}
                                  onChange={e => setPpmCode(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-end gap-1">
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
                      <span className="flex justify-center items-center gap-4">
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
                    <IconButton>
                      <DeleteRoundedIcon
                        sx={{
                          color: "#C31700",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {props.demand.statusDemanda === "RASCUNHO" && (
                <Tooltip title="Continuar rascunho">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#0075B1", fontSize: 12, width: 90 }}
                  >
                    Continuar
                  </Button>
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
