import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useState } from "react";

interface DemandCardProps {
  status: string;
}

export default function DemandCard(props: DemandCardProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const style = {
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

  const reasonOfCancellation = {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sollicitudin erat. Phasellus nec eleifend metus. Nulla sed semper leo. Fusce non enim nunc. In cursus purus eget aliquet consectetur. In pellentesque venenatis elit, eu ultrices arcu sodales.",
  };

  const statusColor: any = {
    Cancelado: "#C31700",
    AprovadoPelaComissao: "#7EB61C",
    AprovadoPeloAnalistaTi: "#64C3D5",
  };

  const progressInputColor: any = {
    Cancelado: "#707070",
    AprovadoPelaComissao: "#7EB61C",
    AprovadoPeloAnalistaTi: "#7EB61C",
    Rascunho: "#d9d9d937",
  };

  const score = 2143;
  const value = "R$ 10.000,00";

  return (
    <div className="grid justify-center items-center mt-9">
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
              component="div"
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
              <h1 className="mr-1 text-[0.95rem]">Status:</h1>
              <h1 className="font-medium text-black text-[0.95rem]">
                {props.status}
              </h1>
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
                <h1 className="mr-1 text-[0.95rem]">Score:</h1>
                <h1 className="font-medium text-black text-[0.95rem]">
                  {score}
                </h1>
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="#675E5E"
                fontWeight="bold"
                className="flex"
              >
                <h1 className="mr-1 text-[0.95rem]">Valor:</h1>
                <h1 className="font-medium text-black text-[0.95rem]">
                  {value}
                </h1>
              </Typography>
            </div>
            <div className="flex justify-center items-center">
              <Typography
                sx={{ mb: 1.5 }}
                color="#675E5E"
                fontWeight="bold"
                className="flex"
              >
                <h1 className="mr-1 flex justify-center text-[0.95rem] items-center text-black">
                  Progresso:
                </h1>
                <div className="grid">
                  <Box className="flex justify-center items-center ">
                    <Slider
                      aria-label="Temperature"
                      defaultValue={30}
                      getAriaValueText={valuetext}
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
                </div>
                <h1 className="text-xs flex justify-end items-center text-black ml-1">
                  15%
                </h1>
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardActions className="flex justify-between">
          <div className="flex justify-start items-center gap-2 ml-1 mr-1">
            <div className="flex">
              <Typography color="#675E5E" fontWeight="bold" className="flex">
                <h1 className="text-[0.85rem]">De: </h1>
              </Typography>
              <Typography color="black" fontWeight="bold" className="flex">
                <h1 className="text-[0.85rem]">10/05/2022</h1>
              </Typography>
            </div>
            <div className="flex">
              <Typography color="#675E5E" fontWeight="bold" className="flex">
                <h1 className="text-[0.85rem]">Até: </h1>
              </Typography>
              <Typography color="black" fontWeight="bold" className="flex">
                <h1 className="text-[0.85rem]">14/05/2022</h1>
              </Typography>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 mr-4">
            {props.status === "Cancelado" && (
              <div>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  style={{
                    backgroundColor: "#C2BEBE",
                    color: "#707070",
                    width: 85,
                    fontSize: 12,
                  }}
                >
                  Motivo
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
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
                      <Typography sx={{ color: "#AD0D0D", fontWeight: 500 }}>
                        *
                      </Typography>
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
                    <div className="flex justify-center items-center gap-4">
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        style={{
                          backgroundColor: "#0075B1",
                          color: "#FFFFFF",
                          width: 100,
                        }}
                      >
                        OK
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            )}
            {props.status === "Rascunho" && (
              <div>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  style={{
                    backgroundColor: "#C2BEBE",
                    color: "#707070",
                    width: 100,
                  }}
                >
                  Deletar
                </Button>
              </div>
            )}
            {props.status === "Rascunho" && (
              <Button variant="contained" sx={{ backgroundColor: "#0075B1" }}>
                Continuar
              </Button>
            )}
            {props.status !== "Rascunho" && (
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
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
