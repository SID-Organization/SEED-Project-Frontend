import * as React from "react";
// import axios from "axios";

import Box from "@mui/material/Box";
import {
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import UploadIcon from "@mui/icons-material/Upload";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useState, useEffect } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Notification from "../../../Components/Notification";
import NewBenefitInsertion from "../../../Components/New-benefit-insert";

import { useNavigate } from "react-router-dom";

// interface INewBenefit {
//   coin: string;
//   value: number;
//   description: string;
// }

import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

// Import de interfaces
// import LoggedUserInterface from "../../../Interfaces/user/LoggedUserInterface";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const progressSteps = ["Dados gerais", "Benefícios", "Arquivos"];

export default function CreateDemand() {
  const [title, setTitle] = useState("");
  const [currentProblem, setCurrentProblem] = useState("");
  const [proposal, setProposal] = useState("");
  const [frequencyOfUse, setFrequencyOfUse] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [buttonNotification, setButtonNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  // Usuário logado
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Navegador de página pela função
  const navigate = useNavigate();

  const [openModalConfirmationDemand, setOpenModalConfirmationDemand] =
    useState(false);

  const handleClickOpenModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(true);
  };

  const handleCloseModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateDemand = async () => {
    function getBenefitCoin(coin) {
      if (coin === "R$") {
        return "REAL";
      } else if (coin === "$") {
        return "DOLAR";
      } else if (coin === "€") {
        return "EURO";
      } else {
        return "REAL";
      }
    }

    const benefitsToBeSent = realBenefits.map((benefit) => {
      return {
        moedaBeneficio: getBenefitCoin(benefit.coin),
        memoriaCalculoBeneficio: benefit.value,
        descricaoBeneficio: benefit.description,
        tipoBeneficio: "REAL",
      };
    });

    for (let benefit of potentialBenefits) {
      benefitsToBeSent.push({
        moedaBeneficio: getBenefitCoin(benefit.coin),
        memoriaCalculoBeneficio: benefit.value,
        descricaoBeneficio: benefit.description,
        tipoBeneficio: "POTENCIAL",
      });
    }

    const demandToBeSent = {
      tituloDemanda: title,
      propostaMelhoriaDemanda: proposal,
      situacaoAtualDemanda: currentProblem,
      frequenciaUsoDemanda: frequencyOfUse,
      descricaoQualitativoDemanda: qualitativeBenefit,
      solicitanteDemanda: { numeroCadastroUsuario: user.numeroCadastroUsuario },
      analistaResponsavelDemanda: { numeroCadastroUsuario: 72131 },
      gerenteDaAreaDemanda: {numeroCadastroUsuario: 72132},
      gestorResponsavelDemanda: {numeroCadastroUsuario: 72133},
      beneficiosDemanda: benefitsToBeSent,
    };

    console.log("Sending demand: ", demandToBeSent);

    const formData = new FormData();

    formData.append("demandaForm", JSON.stringify(demandToBeSent));

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("arquivosDemanda", selectedFiles[i]);
    }

    fetch("http://localhost:8080/sid/api/demanda", {
      method: "POST",
      body: formData,
    }).then((res) => {
      navigate("/demandas");
    });
  };

  function handleFileInput(event) {
    setSelectedFiles([...selectedFiles, event.target.files[0]]);
  }

  function addRealBenefit() {
    setRealBenefits([...realBenefits, { coin: "", value: 0, description: "" }]);
    setButtonNotification(true);
  }

  useEffect(() => {
    if (buttonNotification) {
      const timer = setTimeout(() => {
        setButtonNotification(false);
      }, 1900);
    }
  }, [buttonNotification]);

  useEffect(() => {
    if (deleteNotification) {
      const timer = setTimeout(() => {
        setDeleteNotification(false);
      }, 1900);
    }
  }, [deleteNotification]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
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

  // Primeiro passo - Dados gerais da demanda (titulo, problema, etc)
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setCurrentProblem(e.target.value)}
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
            onChange={(e) => setProposal(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </div>
        <div className="grid gap-1 mb-10">
          <div className="flex justify-center items-center mb-5 gap-5">
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
            <h1 className="font-roboto text-[17px] font-bold text-[#343434] flex justify-center items-center">
              Frequência de uso
            </h1>
            <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            multiline
            maxRows={3}
            value={frequencyOfUse}
            onChange={(e) => setFrequencyOfUse(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </div>
      </div>
    );
  };

  const [realBenefits, setRealBenefits] = useState([
    {
      coin: "",
      value: 0,
      description: "",
    },
  ]);

  const [potentialBenefits, setPotentialBenefits] = useState([
    {
      coin: "",
      value: 0,
      description: "",
    },
  ]);

  const [qualitativeBenefit, setQualitativeBenefit] = useState("");

  // Segundo passo - Benefícios
  const secondStep = () => {
    return (
      <div className="grid gap-3">
        <div className="flex justify-center items-center gap-10 mb-5">
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefícios reais
          </h1>
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />

          {buttonNotification && (
            <Notification message="Benefício adicionado com sucesso!" />
          )}
          {deleteNotification && (
            <Notification message="Benefício removido com sucesso!" />
          )}

          <Tooltip title="Adicionar mais benefícios reais">
            <IconButton onClick={addRealBenefit}>
              <AddBoxRoundedIcon
                sx={{
                  color: "#00579D",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        {realBenefits.map((item, i) => (
          <div className="flex items-center justify-center">
            <NewBenefitInsertion
              coin={item.coin}
              value={item.value}
              description={item.description}
              benefitStates={{ realBenefits, setRealBenefits }}
              benefitIndex={i}
            />
            {(i < realBenefits.length - 1 || i === 0) && (
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
            <IconButton
              onClick={() => {
                setPotentialBenefits([
                  ...potentialBenefits,
                  { coin: "", value: 0, description: "" },
                ]);
              }}
            >
              <AddBoxRoundedIcon
                sx={{
                  color: "#00579D",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        {potentialBenefits.map((item, i) => (
          <div className="flex items-center justify-center">
            <NewBenefitInsertion
              coin={item.coin}
              description={item.description}
              value={item.value}
              benefitStates={{
                realBenefits: potentialBenefits,
                setRealBenefits: setPotentialBenefits,
              }}
              benefitIndex={i}
            />
            {(i < potentialBenefits.length - 1 || i === 0) && (
              <div className="mr-16" />
            )}
          </div>
        ))}
        {/* BENEFICIO QUALITATIVO */}
        <div className="flex justify-center items-center gap-10 mb-5 mt-10">
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefício qualitativo
          </h1>
          <div className="w-40 h-[5px] rounded-full bg-blue-weg" />
        </div>
        <div className="flex items-center justify-center">
          <TextField
            sx={{
              marginBottom: "10rem",
            }}
            id="ined-basic"
            label="Descrição"
            variant="outlined"
            type="text"
            multiline
            maxRows={4}
            value={qualitativeBenefit}
            onChange={(e) => setQualitativeBenefit(e.target.value)}
          />
          <div className="mr-16" />
        </div>
        {/* FIM BENEFICIO QUALITATIVO */}
      </div>
    );
  };

  // Terceiro passo - Anexos
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filesTableRows, setFilesTableRows] = useState([]);

  useEffect(() => {
    if (selectedFiles) {
      setFilesTableRows(
        selectedFiles.map((file) =>
          createFileRowData(file.name, file.size)
        )
      );
    }
  }, [selectedFiles]);

  function createFileRowData(name, size) {
    const fileSize =
      size / 1000 > 1000 ? size / 1000000 + " MB" : size / 1000 + " KB";

    return { name, size: fileSize };
  }

  const thirdStep = () => {
    return (
      <div>
        <div className="grid">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl text-light-blue-weg">UPLOAD DE ARQUIVOS</h1>
          </div>
          <div className="w-[830px] h-[380px] shadow-2xl grid">
            <div className="flex justify-center items-center">
              {selectedFiles?.length > 0 ? (
                <TableContainer
                  component={Paper}
                  sx={{
                    "&:first-child": {
                      backgroundColor: "#FFF",
                    },
                  }}
                >
                  <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          sx={{
                            "&:first-child": {
                              backgroundColor: "#FFF",
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                              border: "#0075B1 solid 2px",
                            },
                          }}
                        >
                          Arquivo
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            fontSize: "1.2rem",
                            border: "#0075B1 solid 2px",
                            "&:last-child": {
                              backgroundColor: "#FFF",
                              color: "black",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          Tamanho
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filesTableRows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            <div className="flex justify-center items-center">
                              <Tooltip title="Baixar arquivo">
                                <DescriptionIcon className="text-light-blue-weg cursor-pointer flex justify-center items-center mr-5" />
                              </Tooltip>
                              <h1
                                className="
                            text-[#000]
                            font-roboto
                            text-[17px]
                            
                            "
                              >
                                {row.name}
                              </h1>
                            </div>
                          </StyledTableCell>
                          <div className="flex justify-center items-center">
                            <StyledTableCell align="center">
                              <h1
                                className="
                            text-[#000]
                            font-roboto
                            text-[17px]
                            
                            "
                              >
                                {row.size}
                              </h1>
                            </StyledTableCell>
                            <Tooltip title="Deletar arquivo">
                              <DeleteIcon
                                onClick={() => {
                                  const index = selectedFiles.findIndex(
                                    (file) => file?.name === row.name
                                  );
                                  selectedFiles.splice(index, 1);
                                  setSelectedFiles([...selectedFiles]);
                                }}
                                className="text-light-blue-weg cursor-pointer flex justify-center items-center ml-5"
                              />
                            </Tooltip>
                          </div>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div>
                  <div className="flex justify-center items-center mb-10">
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
                </div>
              )}
            </div>

            <div className="flex justify-center items-center">
              <label htmlFor="upload-photo">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0075B1",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                  component="label"
                >
                  Escolher arquivo
                  <input
                    type="file"
                    id="upload-photo"
                    hidden
                    onChange={(e) => handleFileInput(e)}
                  />
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
          sx={{
            "& .MuiDialog-paper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "23rem",
              height: "15rem",
              backgroundColor: "#fff",
              boxShadow: 0,
              borderRadius: 2,
            },
          }}
        >
          <div className="grid justify-center items-center">
            <div className="flex justify-center items-center">
              <WarningAmberRoundedIcon
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
            <div className="flex gap-5">
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
              {/* <Link to="/minhas-demandas"> */}
              <Button
                onClick={handleCreateDemand}
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
              {/* </Link> */}
            </div>
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
              const stepProps = {};
              const labelProps = {};
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
