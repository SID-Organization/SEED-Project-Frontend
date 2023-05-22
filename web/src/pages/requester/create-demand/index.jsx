// React
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Styles
import "react-quill/dist/quill.snow.css";

// MUI
import { Button } from "@mui/material";

// Components
import FirstStep from "./first-step";
import SecondStep from "./second-step";
import ThirdStep from "./third-step";
import FourthStep from "./fourth-step";
import StepperDemandProgress from "../../../Components/Stepper-demand-progress";
import Notification from "../../../Components/Notification";

// Services
import DemandService from "../../../service/Demand-Service";
import PdfDemandService from "../../../service/DemandPDF-Service";

// Utils
import UserUtils from "../../../utils/User-Utils";
import ReactQuillUtils from "../../../utils/ReactQuill-Utils";
const { removeHTML } = ReactQuillUtils;

export default function CreateDemand() {
  const params = useParams();

  const [title, setTitle] = useState("");

  const [currentProblemHTML, setCurrentProblemHTML] = useState("");

  const [proposalHTML, setProposalHTML] = useState("");

  const [frequencyOfUseHTML, setFrequencyOfUseHTML] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [buttonNotification, setButtonNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filesTableRows, setFilesTableRows] = useState([]);

  const [realBenefits, setRealBenefits] = useState([
    {
      coin: "R$",
      value: 0,
      descriptionHTML: "",
      idFront: 0,
    },
  ]);

  const [potentialBenefits, setPotentialBenefits] = useState([
    {
      coin: "R$",
      value: 0,
      descriptionHTML: "",
      idFront: 0,
    },
  ]);

  const [qualitativeBenefit, setQualitativeBenefit] = useState("");

  const [anyEmptyField, setAnyEmptyField] = useState(true);

  const [demandUpdateId, setDemandUpdateId] = useState("");

  const [createDemandSucceed, setCreateDemandSucceed] = useState(true);

  
  // Usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Navegador de página pela função
  const navigate = useNavigate();

  const [confirmDemand, setConfirmDemand] = useState(false);


  useEffect(() => {
    if (params.id) {
      setDemandUpdateId(params.id);
      continueDemand();
    } else {
      setDemandUpdateId("");
    }
  }, []);

  useEffect(() => {
    if (
      !title ||
      !qualitativeBenefit
    ) {
      setAnyEmptyField(true);
    } else {
      setAnyEmptyField(false);
    }
  }, [title, qualitativeBenefit]);

  function continueDemand() {
    DemandService.getDemandById(params.id).then((response) => {
      PdfDemandService.getPdfDemandByDemandId(params.id).then((pdfResponse) => {
        setProposalHTML(
          pdfResponse.propostaMelhoriaDemandaHTML
        );
        setCurrentProblemHTML(
          pdfResponse.situacaoAtualDemandaHTML
        );
        setFrequencyOfUseHTML(
          pdfResponse.frequenciaUsoDemandaHTML
        );
      });
      setTitle(response.tituloDemanda);
      setRealBenefits(() => {
        const filteredRealBenefs = response.beneficiosDemanda.filter(
          (benefit) => benefit.tipoBeneficio == "REAL"
        );
        return filteredRealBenefs.map((benefit) =>
          formatBenefit(benefit, "REAL", true)
        );
      });
      setPotentialBenefits(() => {
        const filteredPotBenefs = response.beneficiosDemanda.filter(
          (benefit) => benefit.tipoBeneficio == "POTENCIAL"
        );
        return filteredPotBenefs.map((benefit) =>
          formatBenefit(benefit, "POTENCIAL", true)
        );
      });
      setQualitativeBenefit(response.descricaoQualitativoDemanda);
      setSelectedFiles(
        response.arquivosDemandas.map((attachment) => {
          return {
            type: attachment.type,
            name: attachment.name,
            size: attachment.size,
          };
        })
      );
    });
  }

  const handleCloseConfirm = () => {
    setConfirmDemand(false);
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
        "REAL";
    }
  }

  function formatBenefit(benefit, benefitType, formatToCode = false) {
    let tempBenefit;
    if (!formatToCode) {
      tempBenefit = {
        moedaBeneficio: getBenefitCoin(benefit.coin),
        memoriaCalculoBeneficio: removeHTML(benefit.descriptionHTML),
        memoriaCalculoBeneficioHTML: benefit.descriptionHTML,
        valorBeneficio: benefit.value,
        tipoBeneficio: benefitType,
        idFront: benefit.idFront,
      };
      if (benefit.benefitId) tempBenefit["idBeneficio"] = benefit.benefitId;
    } else if (formatToCode) {
      tempBenefit = {
        benefitId: benefit.idBeneficio,
        value: benefit.valorBeneficio,
        coin: getBenefitCoin(benefit.moedaBeneficio),
        descriptionHTML: benefit.memoriaCalculoBeneficioHTML,
        idFront: benefit.idFront,
      };
    }
    return tempBenefit;
  }

  const handleCreateDemand = async (finish = false) => {
    try {
      // Benefício real
      const benefitsToSave = realBenefits.map((benefit) => {
        const tempRBenef = formatBenefit(benefit, "REAL");
        return tempRBenef;
      });
      // Benefício potencial
      for (let benefit of potentialBenefits) {
        const benefToSave = formatBenefit(benefit, "POTENCIAL");
        benefitsToSave.push(benefToSave);
      }
      // Demanda
      const demandToSave = {
        tituloDemanda: title,
        propostaMelhoriaDemanda: removeHTML(proposalHTML),
        situacaoAtualDemanda: removeHTML(currentProblemHTML),
        frequenciaUsoDemanda: removeHTML(frequencyOfUseHTML),
        descricaoQualitativoDemanda: qualitativeBenefit,
        solicitanteDemanda: {
          numeroCadastroUsuario: user.numeroCadastroUsuario,
        },
        analistaResponsavelDemanda: { numeroCadastroUsuario: 72131 },
        gerenteDaAreaDemanda: { numeroCadastroUsuario: 72132 },
        gestorResponsavelDemanda: { numeroCadastroUsuario: 72133 },
        beneficiosDemanda: benefitsToSave,
      };
      // PDF da demanda
      const formDemandPDF = {
        propostaMelhoriaDemandaHTML: proposalHTML,
        situacaoAtualDemandaHTML: currentProblemHTML,
        frequenciaUsoDemandaHTML: frequencyOfUseHTML,
      };
      const formData = new FormData();
      // Adiciona a demanda e o PDF da deamnda ao FormData
      formData.append("demandaForm", JSON.stringify(demandToSave));
      formData.append("pdfDemandaForm", JSON.stringify(formDemandPDF));
      // Adiciona os arquivos selecionados ao FormData
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("arquivosDemanda", selectedFiles[i]);
      }

      console.log("DEMAND TO SAVE", demandToSave);
      console.log("PDF TO SAVE", formDemandPDF);

      if (!(finish === true)) {
        if (!demandUpdateId && title !== "") {
          DemandService.createDemand(formData).then((res) => {
            console.log("CREATE DEMAND", res);
            setDemandUpdateId(res.idDemanda);
            updateBenefits(res.beneficiosDemanda)
          });
        } else if (demandUpdateId && title !== "") {
          DemandService.updateDemand(demandUpdateId, formData).then((res) => {
            console.log("UPDATE DEMAND", res.data);
            updateBenefits(res.data.beneficiosDemanda)
          });
        }
      } else {
        console.log("FINISH DEMAND CALLED")
        handleFinishDemand(formData);
      }

    } catch (error) {
      console.log(error);
      setCreateDemandSucceed(false);
    }
  };


  const updateBenefits = (benefits) => {
    // Database benefits
    const DBTempRealBnfs = benefits.filter(b => b.tipoBeneficio === "REAL");
    const DBTempPotBnfs = benefits.filter(b => b.tipoBeneficio === "POTENCIAL");

    // Frontend benefits
    const tempRealBenefits = realBenefits;
    const tempPotBenefits = potentialBenefits;
    
    
    // Se o benefício não tiver um id, significa que ele foi criado agora
    // Então, é necessário atualizar o id dele
    // Para isso, compara-se o idFront do benefício do frontend com o idFront do benefício do backend
    // Se forem iguais, significa que é o mesmo benefício, então atualiza o id dele
    for (let i = 0; i < tempRealBenefits.length; i++) {
      if(tempRealBenefits[i].benefitId) continue;
      if (tempRealBenefits[i].idFront === DBTempRealBnfs[i].idFront) {
        tempRealBenefits[i]['benefitId'] = DBTempRealBnfs[i].idBeneficio;
      }
    }
    for (let i = 0; i < tempPotBenefits.length; i++) {
      if(tempPotBenefits[i].benefitId) continue;
      if (tempPotBenefits[i].idFront === DBTempPotBnfs[i].idFront) {
        tempPotBenefits[i]['benefitId'] = DBTempPotBnfs[i].idBeneficio;
      }
    }

    setRealBenefits(tempRealBenefits);
    setPotentialBenefits(tempPotBenefits);
  }

  const handleFinishDemand = (formData) => {
    DemandService.updateDemand(demandUpdateId, formData);
    DemandService.updateDemandStatus(demandUpdateId, "ABERTA");
    if (createDemandSucceed === true) {
      setTimeout(() => {
        navigate("/demandas");
      }, 1000);
    }
  };

  function handleFileInput(event) {
    if (event.target.files.length === 0) return;
    if (event.target.files[0] === undefined) return;
    setSelectedFiles([...selectedFiles, event.target.files[0]]);
  }

  function addRealBenefit() {
    setRealBenefits([
      ...realBenefits,
      {
        coin: "R$",
        value: 0,
        descriptionHTML: "",
        idFront: realBenefits.length,
      },
    ]);
    setButtonNotification(true);
  }

  function addPotentialBenefit() {
    setPotentialBenefits([
      ...potentialBenefits,
      {
        coin: "",
        value: 0,
        descriptionHTML: "",
        idFront: potentialBenefits.length,
      },
    ]);
    setButtonNotification(true);
  }

  useEffect(() => {
    if (buttonNotification) {
      const timer = setTimeout(() => {
        setButtonNotification(false);
      }, 1900);

      return () => clearTimeout(timer);
    }
  }, [buttonNotification]);

  useEffect(() => {
    if (deleteNotification) {
      const timer = setTimeout(() => {
        setDeleteNotification(false);
      }, 1900);

      return () => clearTimeout(timer);
    }
  }, [deleteNotification]);

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
      setConfirmDemand(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Adiciona os arquivos selecionados à tabela de arquivos
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

  const steps = ["Dados gerais", "Benefícios", "Arquivos"];

  const firstStepProps = {
    title,
    setTitle,
    handleCreateDemand,
    proposalHTML,
    setProposalHTML,
    currentProblemHTML,
    setCurrentProblemHTML,
    frequencyOfUseHTML,
    setFrequencyOfUseHTML,
  };

  const secondStepProps = {
    buttonNotification,
    deleteNotification,
    addRealBenefit,
    realBenefits,
    setRealBenefits,
    handleCreateDemand,
    addPotentialBenefit,
    potentialBenefits,
    setPotentialBenefits,
    qualitativeBenefit,
    setQualitativeBenefit,
  };

  const thirdStepProps = {
    selectedFiles,
    setSelectedFiles,
    handleCreateDemand,
    filesTableRows,
    handleFileInput,
  };

  const fourthStepProps = {
    confirmDemand,
    handleCloseConfirm,
    anyEmptyField,
    handleCreateDemand,
    handleFinishDemand,
  };

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
          {activeStep === 0 && <FirstStep props={firstStepProps} />}
          {activeStep === 1 && <SecondStep props={secondStepProps} />}
          {activeStep === 2 && <ThirdStep props={thirdStepProps} />}
          {activeStep === 3 && <FourthStep props={fourthStepProps} />}
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
