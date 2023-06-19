import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/index.css";

// MUI
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

// Components
import SubHeaderOpenedDemand from "../../../Components/Sub-header-opened-demand";
import WorkflowTable from "../../../Components/Workflow-table";
import BenefitsCard from "../../../Components/Benefits-card";
import FilesTable from "../../../Components/FilesTable";

// Services
import DemandService from "../../../service/Demand-Service";
import DemandPDFService from "../../../service/DemandPDF-Service";
import DemandLogService from "../../../service/DemandLog-Service";
import ChatService from "../../../service/Chat-Service";

// Utils
import UserUtils from "../../../utils/User-Utils";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import { Divider, IconButton } from "@mui/material";

//Translation
import TranslationJson from "../../../API/Translate/pages/requester/openedDemand.json";
import { TranslateContext } from "../../../contexts/translate/index";

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

const htmlDivStyle =
  "border-1 h-auto min-h-[6rem] w-[65rem] rounded-[0.5rem] p-3 outline-dark-blue-weg bg-gray-50";

export default function openedDemand() {

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // const [demand, setDemand] = useState<DemandInterface>();
  // Changed to <any> to avoid errors
  const [demand, setDemand] = useState();
  const [demandHTML, setDemandHTML] = useState();
  const [demandLogs, setDemandLogs] = useState();

  const [open, setOpen] = useState(false);

  const [qualitativeBenefit, setQualitativeBenefit] = useState();

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    if (params.id) {
      DemandService.getDemandById(params.id).then((demand) => {
        setDemand(demand);
        console.log("DEMAND", demand);
        DemandPDFService.getPdfDemandByDemandId(params.id).then(
          (pdfResponse) => {
            setDemandHTML(pdfResponse);
            console.log("HTML da demanda: ", pdfResponse);
          }
        );
      });
      DemandLogService.getDemandLogs(params.id).then((res) => {
        if (res.status != 200)
          return console.log("Error getting demand logs\n", res);
        setDemandLogs(res.data);
      });
    }
  }, []);

  function getBenefits(benefitType) {
    return demand?.beneficiosDemanda.filter(
      (benefit) => benefit.tipoBeneficio == benefitType
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fileRows, setFileRows] = useState();

  const handleOpenDocument = () => {
    DemandService.openDemandPDF(params.id);
  };

  // Seta os arquivos da demanda no estado
  useEffect(() => {
    if (demand) {
      setFileRows(demand.arquivosDemandas);
      setQualitativeBenefit(demand.descricaoQualitativoDemanda);
    }
  }, [demand]);

  function handleEnableChat() {
    ChatService.createChat({
      ativoChat: 2,
      idDemanda: { idDemanda: demand?.idDemanda },
      usuarios: [
        {
          numeroCadastroUsuario:
            demand?.solicitanteDemanda.numeroCadastroUsuario,
        },
        { numeroCadastroUsuario: user.numeroCadastroUsuario },
      ],
    }).then(() => {
      navigate("/chat");
    });
  }

  return (
    <>
      <SubHeaderOpenedDemand>
        {translate["Visualização Demanda"]?.[language] ?? "Visualização Demanda"} {params.id}
      </SubHeaderOpenedDemand>
      <div className="grid items-center justify-center">
        <div className="mt-5 flex items-center justify-around">
          <Tooltip title={translate["Abrir workflow"]?.[language] ?? "Abrir workflow"}>
            <Button
              style={{ fontSize: fonts.sm }}
              onClick={handleOpen}
              variant="contained"
              sx={{
                backgroundColor: "#D7D7D7",
                borderLeft: "3px solid #0075B1",
                fontWeight: "bold",
                width: 100,
                height: 35,
                color: "#343434",
                "&:hover": {
                  backgroundColor: "#D7D7D7",
                },
              }}
            >
              {translate["Workflow"]?.[language] ?? "Workflow"}
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
                      {translate["Solicitante"]?.[language] ?? "Solicitante"}
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
                    {translate["Número de demanda"]?.[language] ?? "Número de demanda"}:{" "}
                    <span
                      style={{ fontSize: fonts.xl }}
                      className="flex justify-center font-bold text-light-blue-weg"
                    >
                      {params.id}
                    </span>
                  </h1>
                </div>
                <div className="flex gap-[14.5rem]">
                  <div className="grid">
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-bold text-blue-weg"
                    >
                      {translate["Analista responsável"]?.[language] ?? "Analista responsável"}
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
                            {translate["Iniciada em:"]?.[language] ?? "Iniciada em:"}
                          </h1>
                          <span
                            style={{ fontSize: fonts.lg }}
                            className="flex items-center justify-center font-bold text-light-blue-weg"
                          >
                            {demandLogs
                              ? new Date(
                                  demandLogs[0].recebimentoHistorico
                                ).toLocaleDateString()
                              : (translate["Indefinido"]?.[language] ?? "Indefinido")}
                          </span>
                        </div>
                        <div className="h-16 w-[3.5px] bg-light-blue-weg" />
                        <div className="grid items-center justify-center">
                          <h1
                            style={{ fontSize: fonts.lg }}
                            className="flex items-center justify-center font-normal text-blue-weg"
                          >
                            {translate["Concluída em:"]?.[language] ?? "Concluída em:"}
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

              <div className="grid items-center">
                <div className="flex items-center justify-start">
                  <h1
                    style={{ fontSize: fonts.lg }}
                    className="mt-5 font-roboto text-lg font-bold text-blue-weg"
                  >
                    {translate["Histórico"]?.[language] ?? "Histórico"}
                  </h1>
                </div>
                <WorkflowTable demandId={params.id} />
              </div>
            </Box>
          </Modal>
          <div className="grid items-center justify-center">
            <div className="flex items-center justify-center">
              <div>
                <h1
                  style={{ fontSize: fonts.xl }}
                  className="font-roboto font-bold text-light-blue-weg"
                >
                  {demand?.tituloDemanda}
                </h1>
              </div>
              {user.cargoUsuario === "ANALISTA" && (
                <div onClick={handleEnableChat}>
                  <Tooltip title={translate["Abrir chat"]?.[language] ?? "Abrir chat"}>
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
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-semibold text-dark-blue-weg"
              >
                {translate["Score"]?.[language] ?? "Score"}: {demand?.scoreDemanda}
              </h1>
            </div>
          </div>
          <div>
          {demand && !["ABERTA", "RASCUNHO"].includes(demand?.statusDemanda) && (
            <Tooltip title="Abrir como PDF">
              <Button
                onClick={handleOpenDocument}
                variant="contained"
                sx={{
                  width: 40,
                  height: 35,
                }}
              >
                <PictureAsPdfOutlinedIcon />
              </Button>
            </Tooltip>
          )}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-around">
          <div className="grid items-center justify-center">
            <h1
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-dark-blue-weg"
            >
              {translate["Solicitante"]?.[language] ?? "Solicitante"}
            </h1>
            <h1
              style={{ fontSize: fonts.sm }}
              className="font-roboto font-semibold"
            >
              {user?.nomeUsuario.toUpperCase()}
            </h1>
            <h1 style={{ fontSize: fonts.xs }} className="font-roboto">
              {user?.departamentoUsuario.toUpperCase()}
            </h1>
          </div>
          <div
            style={{ fontSize: fonts.sm }}
            className="flex items-center justify-center gap-5"
          >
            <h1 className="font-roboto font-bold">
              {translate["De"]?.[language] ?? "De"}: <span className="text-dark-blue-weg">10/05/2022</span>
            </h1>
            <h1
              style={{ fontSize: fonts.sm }}
              className="font-roboto font-bold"
            >
              {translate["Até"]?.[language] ?? "Até"}:{" "}
              <span
                style={{ fontSize: fonts.sm }}
                className="text-dark-blue-weg"
              >
                20/06/2022
              </span>
            </h1>
          </div>
          <div className="grid items-center justify-center">
            <h1
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-dark-blue-weg"
            >
              {translate["Centro de custo"]?.[language] ?? "Centro de custo"}
            </h1>
            <h1 style={{ fontSize: fonts.sm }} className="font-roboto">
              {demand?.centroCustoDemanda[0]
                ? (
                    demand.centroCustoDemanda[0].numeroCentroCusto +
                    " - " +
                    demand.centroCustoDemanda[0].nomeCentroCusto
                  ).slice(0, 40)
                : (translate["Não indicado"]?.[language] ?? "Não indicado")}
            </h1>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center">
          <div className="grid items-center justify-around gap-5">
            <div className="grid items-center justify-center">
              <h1
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold text-dark-blue-weg"
              >
                {translate["Objetivo:"]?.[language] ?? "Objetivo:"}
              </h1>
              <div
                contentEditable={false}
                className={htmlDivStyle}
                dangerouslySetInnerHTML={{
                  __html: demandHTML?.propostaMelhoriaDemandaHTML,
                }}
              ></div>
            </div>
            <div className="grid items-center justify-center">
              <h1
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold text-dark-blue-weg"
              >
                {translate["Situação atual:"]?.[language] ?? "Situação atual:"}
              </h1>
              <div
                contentEditable={false}
                className={htmlDivStyle}
                dangerouslySetInnerHTML={{
                  __html: demandHTML?.situacaoAtualDemandaHTML,
                }}
              ></div>
            </div>

            <div className="grid items-center justify-center">
              <h1
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold text-dark-blue-weg"
              >
                {translate["Frequência de uso:"]?.[language] ?? "Frequência de uso:"}
              </h1>
              <div
                contentEditable={false}
                className={htmlDivStyle}
                dangerouslySetInnerHTML={{
                  __html: demandHTML?.frequenciaUsoDemandaHTML,
                }}
              ></div>
            </div>
            <div className="grid items-center justify-center">
              <h1
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold text-dark-blue-weg"
              >
                {translate["Benefício qualitativo:"]?.[language] ?? "Benefício qualitativo:"}
              </h1>

              <textarea
                className="border-1 h-20 w-[65rem] resize-none
                rounded-[0.5rem] p-2 
              text-justify font-roboto font-medium text-black outline-dark-blue-weg"
                disabled
                value={qualitativeBenefit}
                onChange={(e) => setQualitativeBenefit(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-start justify-between">
          <BenefitsCard
            title={translate["Benefícios reais"]?.[language] ?? "Benefícios reais"}
            benefits={getBenefits("REAL")}
          />
          <BenefitsCard
            title={translate["Benefícios potenciais"]?.[language] ?? "Benefícios potenciais"}
            benefits={getBenefits("POTENCIAL")}
          />
        </div>
        <FilesTable files={fileRows} />
        <div className="mt-10 flex items-center justify-center">
          <Button
            onClick={() => navigate(-1)}
            style={{ fontSize: fonts.lg }}
            variant="contained"
            sx={{
              width: "5rem",
              height: "2.5rem",
              marginBottom: "2rem",
            }}
            className="font-roboto font-bold text-white"
          >
            {translate["Ok"]?.[language] ?? "Ok"}
          </Button>
        </div>
      </div>
    </>
  );
}
