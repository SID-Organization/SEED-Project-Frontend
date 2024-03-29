import * as React from "react";
import { useState, useEffect, useContext } from "react";
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

//Translation
import TranslationJson from "../../../../API/Translate/pages/analista/proposalDetailsViewDemand.json";
import { TranslateContext } from "../../../../contexts/translate/index.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "auto",
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
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

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
  const [pageSize, setPageSize] = useState(5);

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
    console.log("DEMAND", demand);
  }, [demand]);

  useEffect(() => {
    if (params.idDemanda) {
      DemandService.getDemandById(params.idDemanda).then((demand) => {
        setDemand(demand);
        console.log("DEMANDA", demand);
      });
      DemandLogService.getDemandLogs(params.idDemanda).then((res) => {
        setHistoric(res.data);
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

  const MyDivider = () => {
    return <div className="h-[3px] w-6 bg-light-blue-weg" />;
  };

  const handleOpenDocument = () => {
    DemandService.openDemandPDF(params.idDemanda);
  };

  return (
    <div>
      <div className="grid items-center">
        <div className="grid items-center gap-6">
          <div className="flex gap-2">
            <Tooltip title="Abrir workflow">
              <Button onClick={handleOpen} variant="contained">
                {translate["Workflow"]?.[language] ?? "Workflow"}
              </Button>
            </Tooltip>
            <Tooltip title="Abrir como PDF">
              <PdfButton
                onClick={handleOpenDocument}
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
          <div className="grid gap-6">
            <div className="flex gap-1">
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-bold text-blue-weg"
              >
                {translate["Título"]?.[language] ?? "Título"}:{" "}
              </h1>
              <span
                style={{ fontSize: fonts.base }}
                className="font-roboto font-bold text-light-blue-weg"
              >
                {demand?.tituloDemanda}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-bold text-blue-weg"
              >
                {translate["Solicitante"]?.[language] ?? "Solicitante"}:
              </h1>
              <div className="flex items-center gap-2">
                <h1
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-semibold"
                >
                  {user?.nomeUsuario.toUpperCase()}
                </h1>
                <MyDivider />
                <h1 style={{ fontSize: fonts.base }} className="font-roboto">
                  {user?.departamentoUsuario.toUpperCase()}
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center gap-2">
                <h1
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {translate["De"]?.[language] ?? "De"}:{" "}
                  <span
                    style={{ fontSize: fonts.base }}
                    className="font-normal text-blue-weg"
                  >
                    10/05/2022
                  </span>
                </h1>
                <MyDivider />
                <h1
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {translate["Até"]?.[language] ?? "Até"}:{" "}
                  <span
                    style={{ fontSize: fonts.base }}
                    className="font-normal text-blue-weg"
                  >
                    20/06/2022
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="grid items-center gap-1">
                <h1
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {translate["Centro de custo"]?.[language] ??
                    "Centro de custo"}
                  :
                </h1>
                <h1
                  style={{ fontSize: fonts.base }}
                  className="whitespace-pre-wrap break-all font-roboto font-normal"
                >
                  {demand &&
                    demand.centroCustoDemanda.length > 0 &&
                    demand.centroCustoDemanda[0].nomeCentroCusto}
                </h1>
              </div>
            </div>
            <div className="grid gap-1">
              <h1
                style={{ fontSize: fonts.base }}
                className="grid gap-1 font-roboto font-semibold text-blue-weg"
              >
                {translate["Score"]?.[language] ?? "Score"}:{" "}
                {demand && demand.scoreDemanda ? (
                  <p className="whitespace-pre-wrap break-all font-roboto font-normal">
                    {demand.scoreDemanda}
                  </p>
                ) : (
                  <p className="whitespace-pre-wrap break-all font-roboto font-normal text-[#6f6f6f]">
                    {translate["Não indicado"]?.[language] ?? "Não indicado"}
                  </p>
                )}
              </h1>
            </div>
            <div className="gap items-center gap-1">
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-bold text-blue-weg"
              >
                {translate["Objetivo"]?.[language] ?? "Objetivo"}:
              </h1>
              <p
                style={{ fontSize: fonts.base }}
                className="whitespace-pre-wrap break-all font-roboto font-normal"
              >
                {proposal}
              </p>
            </div>
            <div className="grid items-center gap-1">
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-bold text-blue-weg"
              >
                {translate["Situação atual"]?.[language] ?? "Situação atual"}:
              </h1>
              <p
                style={{ fontSize: fonts.base }}
                className="whitespace-pre-wrap break-all font-roboto font-normal"
              >
                {currentSituation}
              </p>
            </div>

            <div className="grid items-center gap-1">
              <h1 className="font-roboto font-bold text-blue-weg">
                {translate["Frequência de uso"]?.[language] ??
                  "Frequência de uso"}
                :
              </h1>
              <div>
                <p
                  style={{ fontSize: fonts.base }}
                  className="whitespace-pre-wrap break-all font-roboto font-normal"
                >
                  {usageFrequency}
                </p>
              </div>
            </div>
            <div className="grid items-center gap-1">
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-bold text-blue-weg"
              >
                {translate["Benefício qualitativo"]?.[language] ??
                  "Benefício qualitativo"}
                :
              </h1>
              <p
                style={{ fontSize: fonts.base }}
                className="whitespace-pre-wrap break-all font-roboto font-normal"
              >
                {qualitativeBenefit}
              </p>
            </div>
          </div>
          <div className="grid items-start gap-6">
            <BenefitsCard
              title={
                translate["Benefícios reais"]?.[language] ?? "Benefícios reais"
              }
              benefits={getBenefits("REAL")}
            />
            <BenefitsCard
              title={
                translate["Benefícios potenciais"]?.[language] ??
                "Benefícios potenciais"
              }
              benefits={getBenefits("POTENCIAL")}
            />
          </div>
        </div>
        <FilesTable files={fileRows} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-end">
            <IconButton>
              <Tooltip title={translate["Fechar"]?.[language] ?? "Fechar"}>
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
                  {translate["Solicitante"]?.[language] ?? "Solicitante"}:
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
                {translate["Número de demanda"]?.[language] ??
                  "Número de demanda"}
                :{" "}
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
                  {translate["Analista responsável"]?.[language] ??
                    "Analista responsável"}
                </h1>
                <h1
                  style={{ fontSize: fonts.base }}
                  className="font-roboto text-light-blue-weg"
                >
                  {demand?.analistasResponsaveisDemanda[0]?.nomeUsuario ??
                    "Indefinido"}
                </h1>
                <h1
                  style={{ fontSize: fonts.sm }}
                  className="text-light-blue-weg"
                >
                  {
                    demand?.analistasResponsaveisDemanda[0].departamentoUsuario
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
                        {translate["Iniciada em"]?.[language] ?? "Iniciada em"}:
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
                        {translate["Concluída em"]?.[language] ??
                          "Concluída em"}
                        :
                      </h1>
                      <span
                        style={{ fontSize: fonts.lg }}
                        className="flex items-center justify-center font-bold text-light-blue-weg"
                      >
                        {translate["Indefinido"]?.[language] ?? "Indefinido"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`grid items-center h-[${
              pageSize == 5 ? "25rem" : "28rem"
            }]`}
          >
            <div className="flex items-center justify-start">
              <h1
                style={{ fontSize: fonts.lg }}
                className="mt-5 font-roboto text-lg font-bold text-blue-weg"
              >
                {translate["Histórico"]?.[language] ?? "Histórico"}
              </h1>
            </div>
            <WorkflowTable
              demandId={params.idDemanda}
              setPageSize={setPageSize}
              pageSize={pageSize}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
