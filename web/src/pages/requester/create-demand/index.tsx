import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, InputAdornment } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";

import UploadIcon from "@mui/icons-material/Upload";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Notification from "../../../Components/Notification";

import TextField from "@mui/material/TextField";

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
  const [currentProblem, setCurrentProblem] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({
    openAlert: false,
    vertical: "top",
    horizontal: "center"
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const TextField = styled(MuiTextField)({
    width: "700px",
    height: "3.5rem",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000"
      },
      "&:hover fieldset": {
        borderColor: "#0075B1"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0075B1"
      }
    }
  });
  const TextFieldValue = styled(MuiTextField)({
    width: "300px",
    height: "3.5rem",

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000"
      },
      "&:hover fieldset": {
        borderColor: "#0075B1"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0075B1"
      }
    }
  });

  return (
    <div>
      <div className="mb-7">
        <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
          <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
            Criar nova demanda
          </h1>
        </div>
      </div>
      <div className="grid justify-center items-center gap-14">
        <TextField
          id="outlined-textarea"
          label="Título"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
        />
        <TextField
          id="outlined-basic"
          label="Problema a ser resolvido (Situação atual)"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
        />
        <TextField
          id="outlined-basic"
          label="Proposta"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
        />
        <TextField
          id="outlined-basic"
          label="Objetivo (O que irá melhorar com a execução desta proposta?)"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
        />
        <div className="grid">
          <div className="flex justify-center items-center gap-10 mb-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
              Benefícios reais
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          </div>
          <div className="grid mb-4">
            <div className="grid">
              <div className="flex gap-4 mb-3">
                <TextFieldValue
                  id="outlined-textarea"
                  label="Valor mensal"
                  variant="outlined"
                  type="number"
                  multiline
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {value}
                      </InputAdornment>
                    )
                  }}
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
                        height: "3.5rem"
                      }}
                    >
                      <MenuItem value={"R$"}>BRL</MenuItem>
                      <MenuItem value={"$"}>USD</MenuItem>
                      <MenuItem value={"€"}>EUR</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <TextField
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                type="text"
                multiline
                maxRows={3}
              />
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
              <div className="grid">
                <div className="flex gap-4 mb-3">
                  <TextFieldValue
                    id="outlined-textarea"
                    label="Valor mensal"
                    variant="outlined"
                    type="number"
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {value}
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <TextField
                  id="outlined-basic"
                  label="Descrição"
                  variant="outlined"
                  type="text"
                  multiline
                  maxRows={3}
                />
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="flex justify-center items-center">
              <h1 className="text-3xl text-light-blue-weg">
                UPLOAD DE ARQUIVOS
              </h1>
            </div>
            <div className="w-[830px] h-[380px] shadow-2xl grid">
              <div className="flex justify-center items-center">
                <UploadIcon
                  sx={{
                    fontSize: "5rem",
                    color: "#0075B1"
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
                        backgroundColor: "#0075B1"
                      }
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
                backgroundColor: "#0075B1"
              }
            }}
          >
            Concluir
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
        >
          <div className="grid justify-center items-center">
            <div className="flex justify-center items-center">
              <ReportProblemIcon
                sx={{
                  fontSize: "5rem",
                  color: "#0075B1"
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
                  backgroundColor: "#C2BEBE"
                }
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
                  backgroundColor: "#0075B1"
                }
              }}
            >
              Criar demanda
            </Button>
          </DialogActions>
        </Dialog>
        <div />
      </div>
    </div>
  );
}
