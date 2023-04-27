import React, { createRef } from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import StepperDemandProgress from "../../../Components/Stepper-demand-progress";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

// MUI
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
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import Draggable from "react-draggable";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import MuiTextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DescriptionIcon from "@mui/icons-material/Description";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

// Components
import Notification from "../../../Components/Notification";
import NewBenefitInsertion from "../../../Components/New-benefit-insert";

// Services
import DemandService from "../../../service/Demand-Service";
import PdfDemandService from "../../../service/PdfDemand-Service";

// Utils
import UserUtils from "../../../utils/User-Utils";
import ReactQuillUtils from "../../../utils/ReactQuill-Utils";

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

export default function CreateDemand() {
  const params = useParams();
  const [demandUpdateId, setDemandUpdateId] = useState("");

  useEffect(() => {
    if (params.id) {
      setDemandUpdateId(params.id);
      continueDemand();
    } else {
      setDemandUpdateId("");
    }
  }, []);

  // setDemandUpdateId("");

  const [title, setTitle] = useState("");

  const currentProblemRef = useRef(null);
  const [currentProblemHTML, setCurrentProblemHTML] = useState("");
  const [currentProblem, setCurrentProblem] = useState("");

  const proposalRef = useRef(null);
  const [proposalHTML, setProposalHTML] = useState("");
  const [proposal, setProposal] = useState("");

  const frequencyOfUseRef = useRef(null);
  const [frequencyOfUseHTML, setFrequencyOfUseHTML] = useState("");
  const [frequencyOfUse, setFrequencyOfUse] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [buttonNotification, setButtonNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  const [realBenefits, setRealBenefits] = useState([
    {
      coin: "",
      value: 0,
      descriptionHTML: "",
      description: "",
      ref: useRef(null),
    },
  ]);

  const [potentialBenefits, setPotentialBenefits] = useState([
    {
      coin: "",
      value: 0,
      descriptionHTML: "",
      description: "",
      ref: useRef(null),
    },
  ]);

  const [qualitativeBenefit, setQualitativeBenefit] = useState("");

  const [anyEmptyField, setAnyEmptyField] = useState(true);

  useEffect(() => {
    if (
      !title ||
      !currentProblem ||
      !proposal ||
      !frequencyOfUse ||
      !qualitativeBenefit
    ) {
      // console.log("CURRENT PROB", currentProblem);
      setAnyEmptyField(true);
    } else {
      setAnyEmptyField(false);
    }
  }, [title, currentProblem, proposal, frequencyOfUse, qualitativeBenefit]);

  useEffect(() => {
    console.log("-------------------------");
    console.log("TITLE: ", title);
    console.log("PROPOSAL: ", proposal);
    console.log("CURRENT PROBLEM: ", currentProblem);
    console.log("FREQUENCY OF USE: ", frequencyOfUse);
    console.log("QUALITATIVE BENEFIT: ", qualitativeBenefit);
    console.log("-------------------------");
    console.log("EMPTY FIELDS?", anyEmptyField);
  }, [
    title,
    currentProblem,
    proposal,
    frequencyOfUse,
    qualitativeBenefit,
    anyEmptyField,
  ]);

  useEffect(() => {
    console.log("REAL BENEFITS", realBenefits);
  }, [realBenefits]);

  function continueDemand() {
    DemandService.getDemandById(params.id).then((response) => {
      console.log("DEMAND RESPONSE", response);
      PdfDemandService.getPdfDemandByDemandId(params.id).then((pdfResponse) => {
        console.log("PDF RESPONSE", pdfResponse);
        setProposalHTML(
          pdfResponse[pdfResponse.length - 1].propostaMelhoriaDemandaHTML
        );
        setCurrentProblemHTML(
          pdfResponse[pdfResponse.length - 1].situacaoAtualDemandaHTML
        );
        setFrequencyOfUseHTML(
          pdfResponse[pdfResponse.length - 1].frequenciaUsoDemandaHTML
        );
      });
      setTitle(response.tituloDemanda);
      // setProposal(response.propostaMelhoriaDemanda);
      // setCurrentProblem(response.situacaoAtualDemanda);
      // setFrequencyOfUse(response.frequenciaUsoDemanda);
      setRealBenefits(() => {
        const filteredRealBenefs = response.beneficiosDemanda.filter(
          (benefit) => benefit.tipoBeneficio == "REAL"
        );
        return filteredRealBenefs.map((benefit) => {
          return {
            benefitId: benefit.idBeneficio,
            description: benefit.memoriaCalculoBeneficio,
            value: benefit.valorBeneficio,
            coin: getBenefitCoin(benefit.moedaBeneficio),
            descriptionHTML: benefit.memoriaCalculoBeneficioHTML,
            ref: createRef(),
          };
        });
      });
      // setPotentialBenefits(
      //   response.beneficiosDemanda.map((benefit) => {
      //     if (benefit.tipoBeneficio === "POTENCIAL") {
      //       return {
      //         id: benefit.idBeneficio,
      //         description: benefit.descricaoBeneficio,
      //         value: benefit.valorBeneficio,
      //         coin: benefit.moedaBeneficio,
      //         descriptionHTML: benefit.descricaoBeneficioHTML,
      //         ref: useRef(null),
      //       };
      //     }
      //   })
      // );
      // setQualitativeBenefit(response.descricaoQualitativoDemanda);
      // setSelectedFiles(
      //   response.arquivosDemandas.map((attachment) => {
      //     return {
      //       type: attachment.type,
      //       name: attachment.name,
      //       size: attachment.size,
      //     };
      //   })
      // );
    });
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["image", "link"],
    ],
  };

  const quillStyle = { maxWidth: "43rem" };
  // Usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

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

  function getBenefitCoin(coin) {
    switch (coin) {
      case "REAL":
        return "R$";
      case "DOLAR":
        return "$";
      case "EURO":
        return "€";
    }

    switch (coin) {
      case "R$":
        return "REAL";
      case "$":
        return "DOLAR";
      case "€":
        return "EURO";
      default:
        return "REAL";
    }
  }
  const handleCreateDemand = async (finish = false) => {
    const benefitsToSave = realBenefits.map((benefit) => {
      let strBenef = ReactQuillUtils.formatQuillText(benefit.description);

      const benefToSave = {
        moedaBeneficio: getBenefitCoin(benefit.coin),
        memoriaCalculoBeneficio: strBenef,
        memoriaCalculoBeneficioHTML: benefit.descriptionHTML,
        valorBeneficio: benefit.value,
        tipoBeneficio: "REAL",
      };

      if (benefit.benefitId) {
        benefToSave["idBeneficio"] = benefit.benefitId;
      }

      return benefToSave;
    });

    for (let benefit of potentialBenefits) {
      let strBenef = ReactQuillUtils.formatQuillText(benefit.description);

      const benefToSave = {
        moedaBeneficio: getBenefitCoin(benefit.coin),
        memoriaCalculoBeneficio: strBenef,
        memoriaCalculoBeneficioHTML: benefit.descriptionHTML,
        valorBeneficio: benefit.value,
        tipoBeneficio: "POTENCIAL",
      };

      if (benefit.benefitId) {
        benefToSave["idBeneficio"] = benefit.benefitId;
      }

      benefitsToSave.push(benefToSave);
    }

    const proposalToSave = ReactQuillUtils.formatQuillText(proposal);
    const currentProblemToSave =
      ReactQuillUtils.formatQuillText(currentProblem);
    const frequencyOfUseToSave =
      ReactQuillUtils.formatQuillText(frequencyOfUse);

    const demandToSave = {
      tituloDemanda: title,
      propostaMelhoriaDemanda: proposalToSave,
      situacaoAtualDemanda: currentProblemToSave,
      frequenciaUsoDemanda: frequencyOfUseToSave,
      descricaoQualitativoDemanda: qualitativeBenefit,
      solicitanteDemanda: { numeroCadastroUsuario: user.numeroCadastroUsuario },
      analistaResponsavelDemanda: { numeroCadastroUsuario: 72131 },
      gerenteDaAreaDemanda: { numeroCadastroUsuario: 72132 },
      gestorResponsavelDemanda: { numeroCadastroUsuario: 72133 },
      beneficiosDemanda: benefitsToSave,
    };

    const formDemandPDF = {
      propostaMelhoriaDemandaHTML: proposalHTML,
      situacaoAtualDemandaHTML: currentProblemHTML,
      frequenciaUsoDemandaHTML: frequencyOfUseHTML,
    };

    console.log("DEMAND TO SAVE", demandToSave);
    const formData = new FormData();

    formData.append("demandaForm", JSON.stringify(demandToSave));
    formData.append("pdfDemandaForm", JSON.stringify(formDemandPDF));

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("arquivosDemanda", selectedFiles[i]);
    }

    if (!demandUpdateId && title !== "") {
      DemandService.createDemand(formData).then((res) => {
        console.log("CREATE DEMAND", res);
        setDemandUpdateId(res.idDemanda);
      });
    } else {
      DemandService.updateDemand(demandUpdateId, formData).then((res) => {
        console.log("UPDATING DEMAND", res);
        if (res.status === 200 && finish) {
          DemandService.updateDemandStatus(demandUpdateId, "ABERTA");
          navigate("/demandas");
        }
      });
    }
    // try {
    //   const res = await DemandService.createDemand(formData);
    //   console.log("RES", res);
    //   navigate("/demandas");
    // } catch (error) {
    //   console.error(error);
    //   alert("Erro ao criar demanda. Por favor, tente novamente.");
    // }
  };

  function handleFileInput(event) {
    if (event.target.files.length === 0) return;
    if (event.target.files[0] === undefined) return;
    setSelectedFiles([...selectedFiles, event.target.files[0]]);
  }

  function addRealBenefit() {
    setRealBenefits([
      ...realBenefits,
      { coin: "", value: 0, descriptionHTML: "", ref: createRef() },
    ]);
    setButtonNotification(true);
  }

  function addPotentialBenefit() {
    setPotentialBenefits([
      ...potentialBenefits,
      { coin: "", value: 0, description: "", ref: createRef() },
    ]);
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
      <div className="grid items-center justify-start gap-20">
        <div className="grid gap-1">
          <div className="mb-5 flex items-center justify-center">
            <div className="mr-12 h-[5px] w-40 rounded-full bg-blue-weg" />
            <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
              Título
            </h1>
            <div className="ml-12 h-[5px] w-40 rounded-full bg-blue-weg" />
          </div>
          <TextField
            id="outlined-textarea"
            variant="outlined"
            type="text"
            multiline
            maxRows={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleCreateDemand}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
            helperText={
              title.length == 0 ? "O título é obrigatório" : title.length > 100
            }
            error={title.length == 0 || title.length > 100}
          />
        </div>
        <div className="grid gap-1">
          <div className="mb-5 flex items-center justify-center gap-5">
            <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
            <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
              Objetivo
            </h1>
            <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          </div>
          <ReactQuill
            value={proposalHTML}
            onChange={(e) => {
              setProposalHTML(e);
              setProposal(proposalRef.current?.getEditor().getText());
            }}
            placeholder="Escreva a visão do negócio que vai resolver"
            modules={quillModules}
            ref={proposalRef}
            style={quillStyle}
            onBlur={handleCreateDemand}
          />
        </div>
        <div className="grid gap-1">
          <div className="mb-5 flex items-center justify-center gap-5">
            <div className="mr-3 h-[5px] w-40 rounded-full bg-blue-weg" />
            <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
              Situação atual
            </h1>
            <div className="ml-3 h-[5px] w-40 rounded-full bg-blue-weg" />
          </div>
          <ReactQuill
            value={currentProblemHTML}
            onChange={(e) => {
              setCurrentProblemHTML(e);
              setCurrentProblem(
                currentProblemRef.current?.getEditor().getText()
              );
            }}
            placeholder="Descreva a situação atual da demanda."
            modules={quillModules}
            ref={currentProblemRef}
            style={quillStyle}
          />
        </div>

        <div className="mb-20 grid gap-1">
          <div className="mb-5 flex items-center justify-center gap-5">
            <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
            <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
              Frequência de uso
            </h1>
            <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          </div>
          <ReactQuill
            value={frequencyOfUseHTML}
            onChange={(e) => {
              setFrequencyOfUseHTML(e);
              setFrequencyOfUse(
                frequencyOfUseRef.current?.getEditor().getText()
              );
            }}
            placeholder="Descreva a frequência de uso da demanda."
            modules={quillModules}
            ref={frequencyOfUseRef}
            style={quillStyle}
          />
        </div>
      </div>
    );
  };

  // Segundo passo - Benefícios
  const secondStep = () => {
    return (
      <div className="grid gap-3">
        <div className="mb-5 flex items-center justify-center gap-10">
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefícios reais
          </h1>
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />

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
        {realBenefits &&
          realBenefits.map((item, i) => (
            <div className="flex items-center justify-center" key={i}>
              <NewBenefitInsertion
                coin={item.coin}
                value={item.value}
                description={item.descriptionHTML}
                benefitStates={{ realBenefits, setRealBenefits }}
                benefitIndex={i}
              >
                <ReactQuill
                  value={item.descriptionHTML}
                  onBlur={handleCreateDemand}
                  onChange={(e) => {
                    const newRealBenefits = [...realBenefits];
                    newRealBenefits[i].descriptionHTML = e;
                    newRealBenefits[i].description = item.ref.current
                      ?.getEditor()
                      .getText();
                    setRealBenefits(newRealBenefits);
                  }}
                  placeholder="Descreva o benefício."
                  modules={quillModules}
                  ref={item.ref}
                />
              </NewBenefitInsertion>
              {(i < realBenefits.length - 1 || i === 0) && (
                <div className="mr-16" />
              )}
            </div>
          ))}
        <div className="mb-5 mt-10 flex items-center justify-center gap-10">
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefícios potenciais
          </h1>
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <Tooltip title="Adicionar mais benefícios potenciais">
            <IconButton onClick={addPotentialBenefit}>
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
          <div className="flex items-center justify-center" key={i}>
            <NewBenefitInsertion
              coin={item.coin}
              value={item.value}
              description={item.descriptionHTML}
              benefitStates={{
                realBenefits: potentialBenefits,
                setRealBenefits: setPotentialBenefits,
              }}
              benefitIndex={i}
            >
              <ReactQuill
                theme="snow"
                modules={quillModules}
                value={item.descriptionHTML}
                onChange={(e) => {
                  const newPotentialBenefits = [...potentialBenefits];
                  newPotentialBenefits[i].descriptionHTML = e;
                  newPotentialBenefits[i].description = item.ref.current
                    ?.getEditor()
                    .getText();
                  setPotentialBenefits(newPotentialBenefits);
                }}
                ref={item.ref}
                onBlur={handleCreateDemand}
                placeholder="Descreva o benefício."
              />
            </NewBenefitInsertion>
            {(i < potentialBenefits.length - 1 || i === 0) && (
              <div className="mr-16" />
            )}
          </div>
        ))}
        {/* BENEFICIO QUALITATIVO */}
        <div className="mb-5 mt-10 flex items-center justify-center gap-10">
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
            Benefício qualitativo
          </h1>
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        </div>
        <div className="flex items-center justify-center">
          <TextField
            sx={{
              marginBottom: "5rem",
            }}
            id="ined-basic"
            label="Descrição"
            variant="outlined"
            type="text"
            multiline
            maxRows={4}
            value={qualitativeBenefit}
            onBlur={handleCreateDemand}
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
        selectedFiles.map((file) => createFileRowData(file.name, file.size))
      );
      if (selectedFiles.length > 0) {
        handleCreateDemand();
      }
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
        <div className="mb-10 grid">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl text-light-blue-weg">UPLOAD DE ARQUIVOS</h1>
          </div>
          <div className="grid h-[380px] w-[830px] shadow-2xl">
            <div className="flex items-center justify-center">
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
                            <div className="flex items-center justify-center">
                              <Tooltip title="Baixar arquivo">
                                <DescriptionIcon className="mr-5 flex cursor-pointer items-center justify-center text-light-blue-weg" />
                              </Tooltip>
                              <h1
                                className="
                            font-roboto
                            text-[17px]
                            text-[#000]
                            "
                              >
                                {row.name}
                              </h1>
                            </div>
                          </StyledTableCell>
                          <div className="flex items-center justify-center">
                            <StyledTableCell align="center">
                              <h1
                                className="
                            font-roboto
                            text-[17px]
                            text-[#000]
                            
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
                                className="ml-5 flex cursor-pointer items-center justify-center text-light-blue-weg"
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
                  <div className="mb-10 flex items-center justify-center">
                    <UploadIcon
                      sx={{
                        fontSize: "5rem",
                        color: "#0075B1",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold">
                      Escolha um arquivo ou arraste aqui
                    </h1>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
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
              {anyEmptyField ? (
                <>
                  <span>Existem campos vazios!</span>
                  <br />
                  <span className="flex items-center justify-center">
                    Deseja prosseguir?
                  </span>
                </>
              ) : (
                <>
                  Têm certeza que deseja <br />
                  <span>criar uma nova demanda?</span>
                </>
              )}
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
                onClick={() => handleCreateDemand(true)}
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
              >
                {
                  <span className="flex items-center justify-center">
                    {anyEmptyField ? "Prosseguir" : "Criar demanda"}
                  </span>
                }
              </Button>
              {/* </Link> */}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const steps = ["Dados gerais", "Benefícios", "Arquivos"];

  return (
    <div>
      <div className="mb-7">
        <div className="flex h-[5rem] items-center justify-around shadow-page-title-shadow">
          <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
            Criar nova demanda
          </h1>
        </div>
      </div>
      <div className="mb-10 flex items-center justify-center">
        <StepperDemandProgress
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
          title={title}
        />
      </div>
      <div className="grid items-center justify-center ">
        <div className="grid">
          {activeStep === 0 && firstStep()}
          {activeStep === 1 && secondStep()}
          {activeStep === 2 && thirdStep()}
          {activeStep === 3 && demandCreationConfirmation()}
        </div>
        <div className="mb-10 flex items-center justify-between">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Button onClick={handleNext} disabled={title.length == 0}>
            {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
