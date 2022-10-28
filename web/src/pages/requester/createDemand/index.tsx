import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import UploadIcon from "@mui/icons-material/Upload";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import toast, { Toaster } from "react-hot-toast";

import Notification from "../../../Components/Notification";

import { useState } from "react";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export interface State extends SnackbarOrigin {
  openAlert: boolean;
}

export default function CreateDemand() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({
    openAlert: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openAlert } = state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const handleClickAlert = (newState: SnackbarOrigin) => () => {
    setState({ openAlert: true, ...newState });
    handleClose();
  };

  const handleCloseAlert = () => {
    setState({ ...state, openAlert: false });
  };

  const [notification, setNotification] = useState(false);

  return (
    <div>
      <div className="mb-7">
        <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
          <h1 className="text-[#023A67] font-bold text-3xl font-roboto">
            Criar demanda
          </h1>
        </div>
      </div>
      <div className="grid justify-center items-center">
        <div className="grid mb-4">
          <h1 className="font-roboto text-[17px] font-bold">Título</h1>
          <input
            className="w-[700px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
            type="text"
            onChange={(e) => setTitle(e.target.value.toUpperCase())}
            value={title}
          />
        </div>
        <div className="grid mb-4">
          <h1 className="font-roboto text-[17px] font-bold">
            Problema a ser resolvido (Situação atual)
          </h1>
          <input
            className="w-[700px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
            type="text"
          />
        </div>
        <div className="grid mb-4">
          <h1 className="font-roboto text-[17px] font-bold">Proposta</h1>
          <input
            className="w-[700px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
            type="text"
          />
        </div>
        <div className="grid mb-4">
          <h1 className="font-roboto text-[17px] font-bold">
            Objetivo (O que irá melhorar com a execução desta proposta?)
          </h1>
          <input
            className="w-[700px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
            type="text"
          />
        </div>
        <div className="grid">
          <div className="flex justify-center items-center gap-10 mb-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
              Benefícios reais
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          </div>
          <div className="grid mb-4">
            <h1 className="font-roboto text-[17px] font-bold">Valor mensal</h1>
            <div className="grid">
              <div className="flex gap-4 mb-3">
                <input
                  className="w-[300px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
                  type="text"
                />
                <Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Moeda</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Valor"
                      onChange={handleChange}
                      style={{
                        borderRadius: "0.5rem",
                        fontSize: "1rem",
                        height: "3.5rem",
                      }}
                    >
                      <MenuItem value={10}>BRL</MenuItem>
                      <MenuItem value={20}>USD</MenuItem>
                      <MenuItem value={30}>EUR</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <h1 className="font-roboto text-[17px] font-bold">Descrição</h1>
              <input
                className="w-[700px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="grid mb-6">
          <div className="flex justify-center items-center gap-10 mb-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
              Benefícios potenciais
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          </div>
          <div className="grid mb-4">
            <h1 className="font-roboto text-[17px] font-bold">Valor mensal</h1>
            <div className="grid">
              <div className="flex gap-4 mb-3">
                <input
                  className="w-[300px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
                  type="text"
                />
                <Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Moeda</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Valor"
                      onChange={handleChange}
                      style={{
                        borderRadius: "0.5rem",
                        fontSize: "1rem",
                        height: "3.5rem",
                      }}
                    >
                      <MenuItem value={10}>BRL</MenuItem>
                      <MenuItem value={20}>USD</MenuItem>
                      <MenuItem value={30}>EUR</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <h1 className="font-roboto text-[17px] font-bold">Descrição</h1>
              <input
                className="w-[700px] h-[3.5rem] outline-none text-base pl-4 rounded-lg border-l-4 border-[1px] border-light-blue-weg font-roboto"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl text-light-blue-weg">UPLOAD DE ARQUIVOS</h1>
          </div>
          <div className="w-[830px] h-[380px] shadow-2xl grid">
            <div className="flex justify-center items-center">
              <UploadIcon
                sx={{
                  fontSize: "5rem",
                  color: "#0075B1",
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-xl font-bold">
                Escolha um arquivo ou arraste aqui
              </h1>
            </div>
            <div className="flex justify-center items-center">
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />

                <Button
                  component="span"
                  variant="contained"
                  sx={{
                    backgroundColor: "#0075B1",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                >
                  Escolher arquivo
                </Button>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end mr-5 mb-8">
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            backgroundColor: "#0075B1",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0075B1",
            },
          }}
        >
          Concluir
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent}>
        <div className="grid justify-center items-center">
          <div className="flex justify-center items-center">
            <ReportProblemIcon
              sx={{
                fontSize: "5rem",
                color: "#0075B1",
              }}
            />
          </div>
          <DialogTitle style={{ color: "#0075B1" }}>
            Têm certeza que deseja <br />
            <span>criar uma nova demanda?</span>
          </DialogTitle>
        </div>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
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
            onClick={handleClose}
            sx={{
              backgroundColor: "#0075B1",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0075B1",
              },
            }}
          >
            Criar demanda
          </Button>
        </DialogActions>
      </Dialog>
      <div></div>
    </div>
  );
}
