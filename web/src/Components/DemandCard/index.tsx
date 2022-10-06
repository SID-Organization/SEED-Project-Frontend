import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

interface DemandCardProps {
  status: string;
}

export default function DemandCard(props: DemandCardProps) {
  function valuetext(value: number) {
    return `${value}°C`;
  }

  const statusColor: any = {
    Cancelado: "#C31700",
    AprovadoPelaComissao: "#7EB61C",
    AprovadoPeloAnalistaTi: "#64C3D5",
  };

  const progressInputColor: any = {
    Cancelado: "#707070",
    AprovadoPelaComissao: "#7EB61C",
    AprovadoPeloAnalistaTi: "#7EB61C",
  };

  const score = 2143;
  const value = "R$ 10.000,00";

  return (
    <div className="grid justify-center items-center mt-9">
      <Card
        sx={{ width: 570 }}
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
                fontSize: "1.2rem",
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
              <h1 className="mr-1">Status:</h1>
              <h1 className="font-medium text-black">{props.status}</h1>
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
                <h1 className="mr-1">Score:</h1>
                <h1 className="font-medium text-black">{score}</h1>
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="#675E5E"
                fontWeight="bold"
                className="flex"
              >
                <h1 className="mr-1">Valor:</h1>
                <h1 className="font-medium text-black">{value}</h1>
              </Typography>
            </div>
            <div className="flex justify-center items-center">
              <Typography
                sx={{ mb: 1.5 }}
                color="#675E5E"
                fontWeight="bold"
                className="flex"
              >
                <h1 className="mr-1 flex justify-center items-center text-black">
                  Progresso:
                </h1>
                <div className="grid">
                  <Box className="flex justify-center items-center ">
                    <Slider
                      aria-label="Temperature"
                      defaultValue={30}
                      getAriaValueText={valuetext}
                      sx={{
                        height: 17,
                        width: 150,
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
          <div className="flex justify-start items-center gap-8 ml-2">
            <div className="flex">
              <Typography color="#675E5E" fontWeight="bold" className="flex">
                <h1>De: </h1>
              </Typography>
              <Typography color="black" fontWeight="bold" className="flex">
                <h1>10/05/2022</h1>
              </Typography>
            </div>
            <div className="flex">
              <Typography color="#675E5E" fontWeight="bold" className="flex">
                <h1>Até: </h1>
              </Typography>
              <Typography color="black" fontWeight="bold" className="flex">
                <h1>14/05/2022</h1>
              </Typography>
            </div>
          </div>
          <div className="flex justify-center items-center gap-9 mr-4">
            {props.status === "Cancelado" && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#C2BEBE",
                  color: "#707070",
                  width: 100,
                }}
              >
                Motivo
              </Button>
            )}

            <Button variant="contained" sx={{ backgroundColor: "#0075B1" }}>
              Ver mais
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
