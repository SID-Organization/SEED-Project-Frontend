import Box from "@mui/material/Box";
import { Button, IconButton, InputAdornment, Tooltip } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import UploadIcon from "@mui/icons-material/Upload";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import * as React from "react";

import NewBenefitInsertion from "../../../Components/New-benefit-insert";

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

const TextField = styled(MuiTextField)({
  width: "700px",
  height: "3.5rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #0075B1",
    },
    "&:hover fieldset": {
      borderColor: "#0075B1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0075B1",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "4px solid #0075B1",
  },

  "& .MuiOutlinedInput-input": {
    padding: "5px 5px",
  },
});

const progressSteps = ["Dados gerais", "Benefícios", "Arquivos"];

export default function CreateDemand() {
  const [title, setTitle] = useState("");
  const [currentProblem, setCurrentProblem] = useState("");
  const [proposal, setProposal] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [openModalConfirmationDemand, setOpenModalConfirmationDemand] =
    useState(false);

  const handleClickOpenModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(true);
  };

  const handleCloseModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(false);
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === 2) {
      handleClickOpenModalConfirmationDemand();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const firstStep = () => {
    return (
      <div className="grid justify-start items-center gap-20">
        <div className="grid gap-1">
          <div className="flex justify-center items-center mb-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg mr-12" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434] flex justify-center items-center">
              Título
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg ml-12" />
          </div>
          <TextField
            id="outlined-textarea"
            variant="outlined"
            type="text"
            multiline
            maxRows={3}
            value={title}
            onChange={(e) => setTitle(e.target.value as string)}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </div>
        <div className="grid gap-1">
          <div className="flex justify-center items-center mb-5 gap-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg mr-3" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434] flex justify-center items-center">
              Situação atual
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg ml-3" />
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            multiline
            maxRows={3}
            value={currentProblem}
            onChange={(e) => setCurrentProblem(e.target.value as string)}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </div>
        <div className="grid gap-1">
          <div className="flex justify-center items-center mb-5 gap-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434] flex justify-center items-center">
              Proposta de melhoria
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            multiline
            maxRows={3}
            value={proposal}
            helperText="*Descreva sua proposta e o que ela irá melhorar."
            onChange={(e) => setProposal(e.target.value as string)}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </div>
      </div>
    );
  };

  const [realBenefits, setRealBenefits] = useState<JSX.Element[]>([
    <NewBenefitInsertion />,
  ]);
  const [potentialBenefits, setPotentialBenefits] = useState([
    <NewBenefitInsertion />,
  ]);

  const secondStep = () => {
    return (
      <div className="grid gap-3">
        <div className="flex justify-center items-center gap-10 mb-5">
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefícios reais
          </h1>
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          <Tooltip title="Adicionar mais benefícios reais">
            <IconButton>
              <AddBoxRoundedIcon
                sx={{
                  color: "#00579D",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setRealBenefits([...realBenefits, <NewBenefitInsertion />]);
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        {realBenefits.map((item, i) => (
          <div className="flex items-center justify-center">
            {item}
            {i !== 0 ? (
              <Tooltip title="Remover benefício real">
                <IconButton
                  sx={{
                    marginLeft: "1rem",
                  }}
                  onClick={() => {
                    setRealBenefits(
                      realBenefits.filter((_, index) => index !== i)
                    );
                  }}
                >
                  <DeleteRoundedIcon
                    style={{
                      color: "#00579D",
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <div className="mr-16" />
            )}
          </div>
        ))}
        <div className="flex justify-center items-center gap-10 mb-5 mt-10">
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefícios potenciais
          </h1>
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          <Tooltip title="Adicionar mais benefícios potenciais">
            <IconButton>
              <AddBoxRoundedIcon
                sx={{
                  color: "#00579D",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPotentialBenefits([
                    ...potentialBenefits,
                    <NewBenefitInsertion />,
                  ]);
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        {potentialBenefits.map((item, i) => (
          <div className="flex items-center justify-center">
            {item}
            {i !== 0 ? (
              <Tooltip title="Remover benefício potencial">
                <IconButton
                  sx={{
                    marginLeft: "1rem",
                  }}
                  onClick={() => {
                    setPotentialBenefits(
                      potentialBenefits.filter((_, index) => index !== i)
                    );
                  }}
                >
                  <DeleteRoundedIcon
                    style={{
                      color: "#00579D",
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <div className="mr-16" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const thirdStep = () => {
    return (
      <div>
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
    );
  };

  const demandCreationConfirmation = () => {
    return (
      <div>
        <Dialog
          open={openModalConfirmationDemand}
          onClose={handleCloseModalConfirmationDemand}
          PaperComponent={PaperComponent}
        >
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
              onClick={handleCloseModalConfirmationDemand}
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
              onClick={handleCloseModalConfirmationDemand}
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
      </div>
    );
  };

  return (
    <div>
      <div className="mb-7">
        <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
          <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
            Criar nova demanda
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center mb-10">
        {/* <StepperDemandProgress /> */}

        <Box sx={{ width: "50%" }}>
          <Stepper activeStep={activeStep}>
            {progressSteps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === progressSteps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Todos os passos foram completados!
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Resetar</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Passo {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Voltar
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Pular
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === progressSteps.length - 1
                    ? "Finalizar"
                    : "Próximo"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
      <div className="grid justify-center items-center gap-14">
        <div className="grid">
          {activeStep === 0 && firstStep()}
          {activeStep === 1 && secondStep()}
          {activeStep === 2 && thirdStep()}
          {activeStep === 3 && demandCreationConfirmation()}
          <div />
        </div>
      </div>
    </div>
  );
}
