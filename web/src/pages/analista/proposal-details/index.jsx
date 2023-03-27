import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/index.css";

// MUI
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

// Components
import SubHeaderOpenedDemand from "../../../Components/Sub-header-opened-demand";
import WorkflowTable from "../../../Components/Workflow-table";
import BenefitsCard from "../../../Components/Benefits-card";
import FilesTable from "../../../Components/FilesTable";

// Services
import DemandService from "../../../service/Demand-Service";
import DemandLogService from "../../../service/DemandLog-Service";
import ChatService from "../../../service/Chat-Service";
import ProposalService from "../../../service/Proposal-Service";

// Utils
import UserUtils from "../../../utils/User-Utils";
import DateUtils from "../../../utils/Date-Utils";

const muiBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const DateInput = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const NameAreaInput = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const EqualInput = styled(MuiTextField)({
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

export default function ProposalDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // const [demand, setDemand] = useState<DemandInterface>();
  // Changed to <any> to avoid errors
  const [demand, setDemand] = useState();

  const [historic, setHistoric] = useState();

  const [open, setOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(true);

  const [currentSituation, setCurrentSituation] = useState();
  const [proposal, setProposal] = useState();
  const [getProposalDetails, setGetProposalDetails] = useState();
  const [usageFrequency, setUsageFrequency] = useState();
  const [qualitativeBenefit, setQualitativeBenefit] = useState();

  useEffect(() => {
    if (params.idDemanda) {
      DemandService.getDemandById(params.idDemanda).then((demand) => {
        setDemand(demand);
        console.log("DEMANDA DETALHES: ", demand);
      });
      DemandLogService.getDemandLogs(params.idDemanda).then((historic) => {
        setHistoric(historic);
      });
    }
  }, []);

  useEffect(() => {
    if (params.idProposta) {
      ProposalService.getProposalById(params.idProposta).then((proposal) => {
        setGetProposalDetails(proposal);
        console.log("PROPOSTA DETALHES: ", getProposalDetails);
      });
    }
  }, []);

  function getBenefits(benefitType) {
    if (benefitType == "REAL") {
      return demand?.beneficiosDemanda.filter(
        (benefit) => benefit.tipoBeneficio == "REAL"
      );
    } else if (benefitType == "POTENCIAL") {
      return demand?.beneficiosDemanda.filter(
        (benefit) => benefit.tipoBeneficio == "POTENCIAL"
      );
    }
    return [];
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fileRows, setFileRows] = useState();

  // Seta os arquivos da demanda no estado
  useEffect(() => {
    if (demand) {
      setFileRows(demand.arquivosDemandas);
      setCurrentSituation(demand.situacaoAtualDemanda);
      setProposal(demand.propostaMelhoriaDemanda);
      setUsageFrequency(demand.frequenciaUsoDemanda);
      setQualitativeBenefit(demand.descricaoQualitativoDemanda);
    }
  }, [demand]);

  function handleEnableChat() {
    const chatToStart = {
      ativoChat: 2,
      idDemanda: { idDemanda: demand?.idDemanda },
      usuarios: [
        {
          numeroCadastroUsuario:
            demand?.solicitanteDemanda.numeroCadastroUsuario,
        },
        { numeroCadastroUsuario: user.numeroCadastroUsuario },
      ],
    };
    ChatService.createChat(chatToStart).then(() => {
      navigate("/chat");
    });
  }

  return (
    <>
      <SubHeaderOpenedDemand
        isEditEnabled={isEditEnabled}
        setIsEditEnabled={setIsEditEnabled}
      >
        Visualização da proposta {params.idProposta}
      </SubHeaderOpenedDemand>
      <div
        className="
      mt-5 flex items-center 
      justify-center 
      font-roboto text-2xl font-bold text-dark-blue-weg underline
      "
      >
        <h1>Informações da demada</h1>
      </div>
      <div className="grid items-center justify-center">
        <div className="mt-5 flex items-center justify-around">
          <Tooltip title="Abrir workflow">
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                backgroundColor: "#D7D7D7",
                borderLeft: "3px solid #0075B1",
                fontWeight: "bold",
                width: 100,
                height: 35,
                fontSize: 13,
                color: "#343434",
                "&:hover": {
                  backgroundColor: "#D7D7D7",
                },
              }}
            >
              Workflow
            </Button>
          </Tooltip>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={muiBoxStyle}>
              <div className="mb-5 flex items-center justify-end">
                <Tooltip title="Fechar">
                  <CloseIcon
                    onClick={handleClose}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>
              <div>
                <div className="flex items-center justify-between text-lg">
                  <div className="mt-[-5rem] flex">
                    <h1 className="mr-2 font-bold">Número de demanda:</h1>
                    <span className="font-normal">1000018</span>
                  </div>
                  <div className="grid items-center justify-center">
                    <div className="flex">
                      <h1 className="mr-2 font-bold">Iniciada em:</h1>
                      <span className="font-normal">
                        {historic
                          ? new Date(
                              historic[0].recebimentoHistorico
                            ).toLocaleDateString()
                          : "Indefinido"}
                      </span>
                    </div>
                    <div className="flex">
                      <h1 className="mr-2 font-bold">Concluída em:</h1>
                      <span className="font-normal">Indefinido</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-start gap-[7rem]">
                  <div className="grid items-center justify-center">
                    <h1 className="font-roboto font-bold">Solicitante</h1>
                    <h1 className="font-roboto font-medium">
                      {demand?.solicitanteDemanda.nomeUsuario}
                    </h1>
                    <h1 className="text-sm text-[#5B5B5B]">
                      {demand?.solicitanteDemanda.departamentoUsuario}
                    </h1>
                  </div>
                  <div className="grid items-center justify-center">
                    <h1 className="font-roboto font-bold">
                      Analista responsável
                    </h1>
                    <h1 className="font-roboto font-medium">
                      {demand?.analistaResponsavelDemanda.nomeUsuario}
                    </h1>
                    <h1 className="text-sm text-[#5B5B5B]">
                      {demand?.analistaResponsavelDemanda.departamentoUsuario}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grid items-center">
                <div className="flex items-center justify-start">
                  <h1 className="mt-5 font-roboto text-lg font-bold">
                    Histórico
                  </h1>
                </div>
                <WorkflowTable demandId={params.id} />
              </div>
            </Box>
          </Modal>
          <div className="grid items-center justify-center">
            <div className="flex items-center justify-center">
              <div>
                <h1 className="font-roboto text-xl font-bold text-light-blue-weg">
                  {demand?.tituloDemanda}
                </h1>
              </div>
              {user.cargoUsuario === "ANALISTA" && (
                <div onClick={handleEnableChat}>
                  <Tooltip title="Abrir chat">
                    <MessageIcon
                      sx={{
                        color: "#00579D",
                        fontSize: 25,
                        marginLeft: 2,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <h1 className="font-roboto font-semibold text-dark-blue-weg">
                Score: {demand?.scoreDemanda}
              </h1>
            </div>
          </div>
          <div>
            <Tooltip title="Abrir como documento">
              <Button
                variant="contained"
                sx={{
                  width: 40,
                  height: 35,
                }}
              >
                <OpenInFullIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-around">
          <div className="grid items-center justify-center">
            <h1 className="font-roboto text-base font-bold text-dark-blue-weg">
              Solicitante
            </h1>
            <h1 className="font-roboto text-sm font-semibold">
              {demand?.solicitanteDemanda.nomeUsuario.toUpperCase()}
            </h1>
            <h1 className="font-roboto text-xs">
              {demand?.solicitanteDemanda.departamentoUsuario.toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-5 text-sm">
            <h1 className="font-roboto font-bold">
              De: <span className="text-dark-blue-weg">10/05/2022</span>
            </h1>
            <h1 className="font-roboto font-bold">
              Até: <span className="text-dark-blue-weg">20/06/2022</span>
            </h1>
          </div>
          <div className="grid items-center justify-center">
            <h1 className="font-roboto text-base font-bold text-dark-blue-weg">
              Centro de custo
            </h1>
            <h1 className="font-roboto text-sm">
              {demand?.centroCustoDemanda[0] ?? "Não indicado"}
            </h1>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center">
          <div className="grid items-center justify-around gap-5">
            <div className="grid items-center justify-center">
              <h1 className="font-roboto text-lg font-bold text-dark-blue-weg">
                Situação atual:
              </h1>
              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                disabled={isEditEnabled}
                value={currentSituation}
                onChange={(e) => setCurrentSituation(e.target.value)}
              />
            </div>
            <div className="grid items-center justify-center">
              <h1 className="font-roboto text-lg font-bold text-dark-blue-weg">
                Proposta de melhoria:
              </h1>
              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                disabled={isEditEnabled}
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
              />
            </div>
            <div className="grid items-center justify-center">
              <h1 className="font-roboto text-lg font-bold text-dark-blue-weg">
                Frequência de uso:
              </h1>
              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                disabled={isEditEnabled}
                value={usageFrequency}
                onChange={(e) => setUsageFrequency(e.target.value)}
              />
            </div>
            <div className="grid items-center justify-center">
              <h1 className="font-roboto text-lg font-bold text-dark-blue-weg">
                Benefício qualitativo:
              </h1>
              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2 
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                disabled={isEditEnabled}
                value={qualitativeBenefit}
                onChange={(e) => setQualitativeBenefit(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-start justify-between">
          <BenefitsCard
            title="Benefícios reais"
            benefits={getBenefits("REAL")}
          />
          <BenefitsCard
            title="Benefícios potenciais"
            benefits={getBenefits("POTENCIAL")}
          />
        </div>
        <FilesTable files={fileRows} />
        <div
          className="
      mt-10 flex items-center 
      justify-center 
      font-roboto text-2xl font-bold text-dark-blue-weg underline
      "
        >
          <h1>Informações da proposta</h1>
        </div>
        <div>
          <div className="mt-5 grid items-center justify-center">
            <h1
              className="
          font-roboto text-xl font-bold text-black
        "
            >
              Escopo do projeto
            </h1>
            <p className="flex justify-center">
              {proposal && getProposalDetails.escopoProposta}
            </p>
          </div>
          <div className="mt-5 grid items-center justify-center">
            <h1
              className="
          flex justify-center font-roboto text-xl font-bold text-black
        "
            >
              Tabela de custos
            </h1>
            <p className="flex justify-center">**TABELA DE CUSTOS AQUI**</p>
          </div>
          <div>
            <div className="mt-10 grid items-center justify-center">
              <div
                className="
          h-[5rem] w-[40rem]
          border-2 border-b-0 border-dashed
          border-blue-weg
        "
              >
                <div className="flex h-full items-center justify-start">
                  <p
                    className="
              ml-5 mr-3 font-roboto text-xl font-bold
            "
                  >
                    Custos totais do projeto:
                  </p>
                  <p className="font-roboto text-xl font-bold text-blue-weg">
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosTotaisDoProjeto}
                  </p>
                </div>
              </div>
              <div
                className="
          h-[10rem] w-[40rem]
          border-2 border-dashed border-blue-weg
        "
              >
                <div className="grid h-full items-center justify-start">
                  <div className="flex h-full items-center justify-start">
                    <p
                      className="
          ml-5 mr-3 font-roboto text-xl
        "
                    >
                      Total de despesas (desembolso):
                    </p>
                    <p className="font-roboto text-xl font-bold text-blue-weg">
                      R${" "}
                      {getProposalDetails &&
                        getProposalDetails.custosExternosDoProjeto}
                    </p>
                  </div>
                  <div className="flex h-full items-center justify-start">
                    <p
                      className="
          ml-5 mr-3 font-roboto text-xl
        "
                    >
                      Total de despesas com custos internos
                    </p>
                    <p className="font-roboto text-xl font-bold text-blue-weg">
                      R${" "}
                      {getProposalDetails &&
                        getProposalDetails.custosInternosDoProjeto}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid justify-center gap-10">
            <div className="mt-5">
              <p className="font-roboto text-lg font-bold">Payback</p>
              <EqualInput
                disabled
                id="outlined-textarea"
                variant="outlined"
                placeholder={
                  getProposalDetails && getProposalDetails.paybackProposta
                }
                type="text"
                multiline
                maxRows={3}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
            </div>
            <div>
              <p className="font-roboto text-lg font-bold">
                Período de execução
              </p>
              <div className="mt-2 flex gap-10">
                <DateInput
                  disabled
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={
                    getProposalDetails &&
                    DateUtils.formatDate(
                      getProposalDetails.periodoExecucaoInicioProposta
                    )
                  }
                  label="Início:"
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />

                <DateInput
                  disabled
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={
                    getProposalDetails &&
                    DateUtils.formatDate(
                      getProposalDetails.periodoExecucaoFimProposta
                    )
                  }
                  label="Término:"
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              </div>
            </div>
            <div>
              <p className="font-roboto text-lg font-bold">
                Responsável pelo negócio
              </p>
              <div className="mt-2 flex gap-10">
                <NameAreaInput
                  disabled
                  id="outlined-textarea"
                  variant="outlined"
                  type="text"
                  multiline
                  placeholder={
                    getProposalDetails &&
                    getProposalDetails.nomeResponsavelNegocio > 0
                      ? getProposalDetails.nomeResponsavelNegocio
                      : "Não informado"
                  }
                  maxRows={3}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
                <NameAreaInput
                  disabled
                  id="outlined-textarea"
                  variant="outlined"
                  type="text"
                  multiline
                  placeholder={
                    getProposalDetails &&
                    getProposalDetails.areaResponsavelNegocio > 0
                      ? getProposalDetails.areaResponsavelNegocio
                      : "Não informado"
                  }
                  maxRows={3}
                  onChange={(e) => setAreaBusinessResponsible(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <Button
            variant="contained"
            sx={{
              width: "5rem",
              height: "2.5rem",
              marginBottom: "2rem",
            }}
            className="font-roboto text-lg font-bold text-white"
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );
}
