import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MUI
import MuiButton from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { styled } from "@mui/material/styles";

// Components
import WorkflowTable from "../../../../Components/Workflow-table";
import BenefitsCard from "../../../../Components/Benefits-card";
import FilesTable from "../../../../Components/FilesTable";

// Services
import DemandService from "../../../../service/Demand-Service";
import DemandLogService from "../../../../service/DemandLog-Service";
import ChatService from "../../../../service/Chat-Service";

// Utils
import UserUtils from "../../../../utils/User-Utils";
import FontSizeUtils from "../../../../utils/FontSize-Utils";

import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 635,
  bgcolor: "background.paper",
  borderRadius: 2,
  borderLeft: "5px solid #00579D",
  boxShadow: 24,
  padding: "1rem",
};

const Button = styled(MuiButton)({
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
});

const PdfButton = styled(MuiButton)({
  width: 40,
  height: 35,
});

export default function ViewDemand() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(UserUtils.getLoggedUser());
  const [demand, setDemand] = useState();
  const [historic, setHistoric] = useState();
  const [open, setOpen] = useState(false);
  const [currentSituation, setCurrentSituation] = useState();
  const [proposal, setProposal] = useState();
  const [usageFrequency, setUsageFrequency] = useState();
  const [qualitativeBenefit, setQualitativeBenefit] = useState();
  const [fileRows, setFileRows] = useState();
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());
  const [demandLogs, setDemandLogs] = useState();

  useEffect(() => {
    if (params.idDemanda) {
      DemandLogService.getDemandLogs(params.idDemanda).then((res) => {
        if (res.status != 200)
          return console.log("Error getting demand logs\n", res);
        setDemandLogs(res.data);
      });
    }
  }, []);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    if (params.idDemanda) {
      DemandService.getDemandById(params.idDemanda).then((demand) => {
        setDemand(demand);
      });
      DemandLogService.getDemandLogs(params.idDemanda).then((res) => {
        setHistoric(res.data);
      });
    }
  }, []);

  console.log("DEMAND: ", demand);

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
    <div>
      <div className="grid items-center justify-center">
        <div className="mt-5 flex items-center justify-around">
          <Tooltip title="Abrir workflow">
            <Button onClick={handleOpen} variant="contained">
              Workflow
            </Button>
          </Tooltip>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex items-center justify-end">
                <IconButton>
                  <Tooltip title="Fechar">
                    <CloseIcon
                      onClick={handleClose}
                      sx={{
                        cursor: "pointer",
                        color: "#00579D",
                        fontSize: "1.5rem",
                      }}
                    />
                  </Tooltip>
                </IconButton>
              </div>
              <div className="grid gap-12">
                <div className="flex gap-[16.8rem]">
                  <div className="grid">
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-bold text-blue-weg"
                    >
                      Solicitante
                    </h1>
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto text-light-blue-weg"
                    >
                      {user?.nomeUsuario}
                    </h1>
                    <h1
                      style={{ fontSize: fonts.sm }}
                      className="text-light-blue-weg"
                    >
                      {user?.departamentoUsuario}
                    </h1>
                  </div>
                  <h1
                    style={{ fontSize: fonts.xl }}
                    className="flex justify-center gap-2 text-blue-weg"
                  >
                    Número de demanda:{" "}
                    <span
                      style={{ fontSize: fonts.xl }}
                      className="flex justify-center font-bold text-light-blue-weg"
                    >
                      {params.idDemanda}
                    </span>
                  </h1>
                </div>
                <div className="flex gap-[14.5rem]">
                  <div className="grid">
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-bold text-blue-weg"
                    >
                      Analista responsável
                    </h1>
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto text-light-blue-weg"
                    >
                      {demand?.analistaResponsavelDemanda.nomeUsuario}
                    </h1>
                    <h1
                      style={{ fontSize: fonts.sm }}
                      className="text-light-blue-weg"
                    >
                      {
                        demand?.analistaResponsavelDemanda.departamentoUsuario
                          .nomeBusinessUnity
                      }
                    </h1>
                  </div>
                  <div className="grid items-center justify-center">
                    <div className="flex items-center justify-between text-lg">
                      <div className="flex items-center justify-center gap-12">
                        <div className="grid items-center justify-center">
                          <h1
                            style={{ fontSize: fonts.lg }}
                            className="flex items-center justify-center font-normal text-blue-weg"
                          >
                            Iniciada em:
                          </h1>
                          <span
                            style={{ fontSize: fonts.lg }}
                            className="flex items-center justify-center font-bold text-light-blue-weg"
                          >
                            {demandLogs
                              ? new Date(
                                  demandLogs[0].recebimentoHistorico
                                ).toLocaleDateString()
                              : "Indefinido"}
                          </span>
                        </div>
                        <div className="h-16 w-[3.5px] bg-light-blue-weg" />
                        <div className="grid items-center justify-center">
                          <h1
                            style={{ fontSize: fonts.lg }}
                            className="flex items-center justify-center font-normal text-blue-weg"
                          >
                            Concluída em:
                          </h1>
                          <span
                            style={{ fontSize: fonts.lg }}
                            className="flex items-center justify-center font-bold text-light-blue-weg"
                          >
                            Indefinido
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid items-center">
                <div className="flex items-center justify-start">
                  <h1
                    style={{ fontSize: fonts.lg }}
                    className="mt-5 font-roboto text-lg font-bold text-blue-weg"
                  >
                    Histórico
                  </h1>
                </div>
                <WorkflowTable demandId={params.idDemanda} />
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
            </div>
            <div className="flex items-center justify-center">
              <h1 className="font-roboto font-semibold text-dark-blue-weg">
                Score: {demand?.scoreDemanda}
              </h1>
            </div>
          </div>
          <div>
            <Tooltip title="Abrir como PDF">
              <PdfButton
                variant="contained"
                sx={{
                  width: 40,
                  height: 35,
                }}
              >
                <PictureAsPdfOutlinedIcon />
              </PdfButton>
            </Tooltip>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-around">
          <div className="grid items-center justify-center">
            <h1 className="font-roboto text-base font-bold text-dark-blue-weg">
              Solicitante
            </h1>
            <h1 className="font-roboto text-sm font-semibold">
              {user?.nomeUsuario.toUpperCase()}
            </h1>
            <h1 className="font-roboto text-xs">
              {user?.departamentoUsuario.toUpperCase()}
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
              {demand?.centroCustoDemanda[0].nomeCentroCusto ?? "Não indicado"}
            </h1>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center">
          <div className="grid items-center justify-around gap-5">
            <div className="grid items-center justify-center">
              <h1 className="font-roboto text-lg font-bold text-dark-blue-weg">
                Objetivo:
              </h1>
              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
              />
            </div>
            <div className="grid items-center justify-center">
              <h1 className="font-roboto text-lg font-bold text-dark-blue-weg">
                Situação atual:
              </h1>
              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                value={currentSituation}
                onChange={(e) => setCurrentSituation(e.target.value)}
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
      </div>
    </div>
  );
}
