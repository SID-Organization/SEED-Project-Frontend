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

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Divider, IconButton, InputAdornment, Tooltip } from "@mui/material";

interface DemandCardProps {
  status: string;
}

export default function DemandCard(props: DemandCardProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isDemandLoading, setIsDemandLoading] = useState(false);
  const [openReasonOfCancellation, setOpenReasonOfCancellation] =
    useState(false);

  const [openGenerateProposal, setOpenGenerateProposal] = useState(false);

  const handleOpenReasonOfCancellation = () =>
    setOpenReasonOfCancellation(true);
  const handleCloseReasonOfCancellation = () =>
    setOpenReasonOfCancellation(false);

  const handleOpenGenerateProposal = () => setOpenGenerateProposal(true);
  const handleCloseGenerateProposal = () => setOpenGenerateProposal(false);

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const TextField = styled(MuiTextField)({
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderLeft: "3px solid #0075B1",
    },
  });

  const styleModalReasonOfCancellation = {
    position: "absolute" as "absolute",
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
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 580,
    height: 405,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
  };

  const reasonOfCancellation = {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sollicitudin erat. Phasellus nec eleifend metus. Nulla sed semper leo. Fusce non enim nunc. In cursus purus eget aliquet consectetur. In pellentesque venenatis elit, eu ultrices arcu sodales.",
  };

  const statusColor: any = {
    Cancelado: "#C31700",
    AprovadoPelaComissao: "#7EB61C",
    AprovadoPeloAnalistaTi: "#64C3D5",
    Aberto: "#00579D",
    Rascunho: "#D9D9D9",
  };

  const progressInputColor: any = {
    Cancelado: "#C31700",
    AprovadoPelaComissao: "#7EB61C",
    AprovadoPeloAnalistaTi: "#7EB61C",
    Rascunho: "#d9d9d937",
    Aberto: "#00579D",
  };

  const score = 2143;
  const value = "R$ 10.000,00";

  const getData = async () => {
    setIsDemandLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log("AAAA:", response);
    const data = await response.json();
    setData(data);
    setIsDemandLoading(false);
  };

  useEffect(() => {
    getData();
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
            borderLeft: "7px solid " + statusColor[props.status],
          }}
        >
          <CardContent>
            <div className="flex justify-between items-center">
              <Typography
                variant="h5"
                sx={{
                  color: "#023A67",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                LOREM IPSUM
              </Typography>
              <Typography
                sx={{ mt: 1 }}
                color="#675E5E"
                fontWeight="bold"
                className="flex"
              >
                <span className="mr-1 text-[0.95rem]">Status:</span>
                <span className="font-medium text-black text-[0.95rem]">
                  {props.status}
                </span>
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
                    {score}
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
                    {value}
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
                          color: progressInputColor[props.status],
                        }}
                        sx={{
                          height: 16,
                          width: 120,
                          color: progressInputColor[props.status],
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
                  <span className="text-[0.85rem]">10/05/2022</span>
                </Typography>
              </div>
              <div className="flex">
                <Typography color="#675E5E" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem]">Até: </span>
                </Typography>
                <Typography color="black" fontWeight="bold" className="flex">
                  <span className="text-[0.85rem]">14/05/2022</span>
                </Typography>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3 mr-4">
              {props.status === "Aberto" && (
                <div>
                  <Tooltip
                    title="Gerar proposta"
                    enterDelay={820}
                    leaveDelay={200}
                  >
                    <Button
                      onClick={handleOpenGenerateProposal}
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
                                onClick={handleCloseGenerateProposal}
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

              {props.status === "Cancelado" && (
                <div>
                  <Tooltip
                    title="Motivo da reprovação"
                    enterDelay={820}
                    leaveDelay={200}
                  >
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
                        value={reasonOfCancellation.message}
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
              {props.status === "Rascunho" && (
                <div>
                  <Tooltip
                    title="Deletar rascunho"
                    enterDelay={820}
                    leaveDelay={200}
                  >
                    <IconButton>
                      <DeleteRoundedIcon
                        sx={
                          {
                            // color: "#C31700",
                          }
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {props.status === "Rascunho" && (
                <Tooltip
                  title="Continuar rascunho"
                  enterDelay={820}
                  leaveDelay={200}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#0075B1", fontSize: 12, width: 90 }}
                  >
                    Continuar
                  </Button>
                </Tooltip>
              )}
              {props.status !== "Rascunho" && (
                <Link to="/demanda-aberta">
                  <Tooltip
                    title="Visualizar demanda"
                    enterDelay={820}
                    leaveDelay={200}
                  >
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
