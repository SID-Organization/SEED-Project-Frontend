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

const style = {
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

const htmlDivStyle =
  "border-1 h-auto min-h-[6rem] w-[65rem] rounded-[0.5rem] p-3 outline-dark-blue-weg bg-gray-50";

export default function openedDemand() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // const [demand, setDemand] = useState<DemandInterface>();
  // Changed to <any> to avoid errors
  const [demand, setDemand] = useState();
  const [demandHTML, setDemandHTML] = useState();
  const [demandLogs, setDemandLogs] = useState();

  const [open, setOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(true);

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
      <SubHeaderOpenedDemand
        isEditEnabled={isEditEnabled}
        setIsEditEnabled={setIsEditEnabled}
      >
        Visualização Demanda {params.id}
      </SubHeaderOpenedDemand>
      <div className="grid items-center justify-center">
        <div className="mt-5 flex items-center justify-around">
          <Tooltip title="Abrir workflow">
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
                    <h1
                      style={{ fontSize: fonts.lg }}
                      className="mr-2 font-bold"
                    >
                      Número de demanda:
                    </h1>
                    <span
                      style={{ fontSize: fonts.lg }}
                      className="font-normal"
                    >
                      {params.id}
                    </span>
                  </div>
                  <div className="grid items-center justify-center">
                    <div className="flex">
                      <h1
                        style={{ fontSize: fonts.lg }}
                        className="mr-2 font-bold"
                      >
                        Iniciada em:
                      </h1>
                      <span
                        style={{ fontSize: fonts.lg }}
                        className="font-normal"
                      >
                        {demandLogs
                          ? new Date(
                              demandLogs[0].recebimentoHistorico
                            ).toLocaleDateString()
                          : "Indefinido"}
                      </span>
                    </div>
                    <div className="flex">
                      <h1
                        style={{ fontSize: fonts.lg }}
                        className="mr-2 font-bold"
                      >
                        Concluída em:
                      </h1>
                      <span
                        style={{ fontSize: fonts.lg }}
                        className="font-normal"
                      >
                        Indefinido
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-start gap-[7rem]">
                  <div className="grid items-center justify-center">
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-bold"
                    >
                      Solicitante
                    </h1>
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-medium"
                    >
                      {user?.nomeUsuario}
                    </h1>
                    <h1
                      style={{ fontSize: fonts.sm }}
                      className="text-sm text-[#5B5B5B]"
                    >
                      {user?.departamentoUsuario}
                    </h1>
                  </div>
                  <div className="grid items-center justify-center">
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-bold"
                    >
                      Analista responsável
                    </h1>
                    <h1
                      style={{ fontSize: fonts.base }}
                      className="font-roboto font-medium"
                    >
                      {demand?.analistaResponsavelDemanda.nomeUsuario}
                    </h1>
                    <h1
                      style={{ fontSize: fonts.sm }}
                      className="text-sm text-[#5B5B5B]"
                    >
                      {
                        demand?.analistaResponsavelDemanda.departamentoUsuario
                          .nomeBusinessUnity
                      }
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grid items-center">
                <div className="flex items-center justify-start">
                  <h1
                    style={{ fontSize: fonts.lg }}
                    className="mt-5 font-roboto text-lg font-bold"
                  >
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
                <h1
                  style={{ fontSize: fonts.xl }}
                  className="font-roboto font-bold text-light-blue-weg"
                >
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
              <h1
                style={{ fontSize: fonts.base }}
                className="font-roboto font-semibold text-dark-blue-weg"
              >
                Score: {demand?.scoreDemanda}
              </h1>
            </div>
          </div>
          <div>
            <Tooltip title="Abrir como documento">
              <Button
                onClick={handleOpenDocument}
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
            <h1
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-dark-blue-weg"
            >
              Solicitante
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
              De: <span className="text-dark-blue-weg">10/05/2022</span>
            </h1>
            <h1
              style={{ fontSize: fonts.sm }}
              className="font-roboto font-bold"
            >
              Até:{" "}
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
              Centro de custo
            </h1>
            <h1 style={{ fontSize: fonts.sm }} className="font-roboto">
              {demand?.centroCustoDemanda[0]
                ? (
                    demand.centroCustoDemanda[0].numeroCentroCusto +
                    " - " +
                    demand.centroCustoDemanda[0].nomeCentroCusto
                  ).slice(0, 40)
                : "Não indicado"}
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
                Objetivo:
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
                Situação atual:
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
                Frequência de uso:
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
            Ok
          </Button>
        </div>
      </div>
    </>
  );
}
