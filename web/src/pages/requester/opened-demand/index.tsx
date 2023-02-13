import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import SubHeaderOpenedDemand from "../../../Components/Sub-header-opened-demand";
import WorkflowTable from "../../../Components/Workflow-table";
import BenefitsCard from "../../../Components/Benefits-card";

import "../../../styles/index.css";

import LoggedUserInterface from "../../../Interfaces/user/LoggedUserInterface";
import FilesTable from "../../../Components/FilesTable";

function getLoggedUser() {
  return JSON.parse(localStorage.getItem("user")!);
}

async function getDemandFromDatabase(id: string) {
  const response = await fetch(
    "http://localhost:8080/sid/api/demanda/id/" + id
  );
  const demand = await response.json();
  return demand;
}

async function getHistoricFromDatabase(id: string) {
  const response = await fetch(
    `http://localhost:8080/sid/api/historico-workflow/demanda/${id}`
  );
  const historic = await response.json();
  return historic;
} 

export default function openedDemand() {
  const params = useParams();

  const [user, setUser] = useState<LoggedUserInterface>(getLoggedUser());

  // const [demand, setDemand] = useState<DemandInterface>();
  // Changed to <any> to avoid errors
  const [demand, setDemand] = useState<any>();

  const [historic, setHistoric] = useState<any[]>();


  const [open, setOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(true);

  const [currentSituation, setCurrentSituation] = useState();
  const [proposal, setProposal] = useState();
  const [usageFrequency, setUsageFrequency] = useState();
  const [qualitativeBenefit, setQualitativeBenefit] = useState();

  useEffect(() => {
    if (params.id) {
      getDemandFromDatabase(params.id).then((demand) => {
        setDemand(demand);
      });
      getHistoricFromDatabase(params.id).then((historic) => {
        setHistoric(historic);
      })
    }
  }, []);


  function getBenefits(benefitType: string) {
    if (benefitType == "REAL") {
      return demand?.beneficiosDemanda.filter(
        (benefit: any) => benefit.tipoBeneficio == "REAL"
      );
    } else if (benefitType == "POTENCIAL") {
      return demand?.beneficiosDemanda.filter(
        (benefit: any) => benefit.tipoBeneficio == "POTENCIAL"
      );
    }
    return [];
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
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

  const [fileRows, setFileRows] = useState<any[]>();

  // Seta os arquivos da demanda no estado
  useEffect(() => {
    if (demand) {
      setFileRows(demand.arquivosDemandas);
      setCurrentSituation(demand.situacaoAtualDemanda as any);
      setProposal(demand.propostaMelhoriaDemanda as any);
      setUsageFrequency(demand.frequenciaUsoDemanda as any);
      setQualitativeBenefit(demand.descricaoQualitativoDemanda as any);
    }
  }, [demand]);

  function handleEnableChat() {
    fetch("http://localhost:8080/sid/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ativoChat: 2,
        idDemanda: { idDemanda: demand?.idDemanda },
        usuarios: [
          {
            numeroCadastroUsuario:
              demand?.solicitanteDemanda.numeroCadastroUsuario,
          },
          { numeroCadastroUsuario: user.numeroCadastroUsuario },
        ],
      }),
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
      <div className="grid justify-center items-center">
        <div className="flex justify-around items-center mt-5">
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
            <Box sx={style}>
              <div className="flex justify-end items-center mb-5">
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
                <div className="flex justify-between items-center text-lg">
                  <div className="flex mt-[-5rem]">
                    <h1 className="font-bold mr-2">Número de demanda:</h1>
                    <span className="font-normal">1000018</span>
                  </div>
                  <div className="grid items-center justify-center">
                    <div className="flex">
                      <h1 className="font-bold mr-2">Iniciada em:</h1>
                      <span className="font-normal">{historic ? new Date(historic[0].recebimentoHistorico).toLocaleDateString() : "Indefinido"}</span>
                    </div>
                    <div className="flex">
                      <h1 className="font-bold mr-2">Concluída em:</h1>
                      <span className="font-normal">Indefinido</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-start items-center gap-[7rem]">
                  <div className="grid items-center justify-center">
                    <h1 className="font-bold font-roboto">Solicitante</h1>
                    <h1 className="font-roboto font-medium">{demand?.solicitanteDemanda.nomeUsuario}</h1>
                    <h1 className="text-[#5B5B5B] text-sm">
                      {demand?.solicitanteDemanda.departamentoUsuario}
                    </h1>
                  </div>
                  <div className="grid items-center justify-center">
                    <h1 className="font-bold font-roboto">
                      Analista responsável
                    </h1>
                    <h1 className="font-roboto font-medium">{demand?.analistaResponsavelDemanda.nomeUsuario}</h1>
                    <h1 className="text-[#5B5B5B] text-sm">
                      {demand?.analistaResponsavelDemanda.departamentoUsuario}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grid items-center">
                <div className="flex justify-start items-center">
                  <h1 className="font-roboto font-bold mt-5 text-lg">
                    Histórico
                  </h1>
                </div>
                <WorkflowTable demandId={params.id} />
              </div>
            </Box>
          </Modal>
          <div className="grid justify-center items-center">
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-light-blue-weg font-bold text-xl font-roboto">
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
            <div className="flex justify-center items-center">
              <h1 className="font-semibold text-dark-blue-weg font-roboto">
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
        <div className="flex justify-around items-center mt-3">
          <div className="grid justify-center items-center">
            <h1 className="font-roboto font-bold text-dark-blue-weg text-base">
              Solicitante
            </h1>
            <h1 className="font-roboto font-semibold text-sm">
              {demand?.solicitanteDemanda.nomeUsuario.toUpperCase()}
            </h1>
            <h1 className="font-roboto text-xs">
              {demand?.solicitanteDemanda.departamentoUsuario.toUpperCase()}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-5 text-sm">
            <h1 className="font-roboto font-bold">
              De: <span className="text-dark-blue-weg">10/05/2022</span>
            </h1>
            <h1 className="font-roboto font-bold">
              Até: <span className="text-dark-blue-weg">20/06/2022</span>
            </h1>
          </div>
          <div className="grid justify-center items-center">
            <h1 className="text-dark-blue-weg font-bold font-roboto text-base">
              Centro de custo
            </h1>
            <h1 className="font-roboto text-sm">
              {demand?.centroCustoDemanda[0] ?? "Não indicado"}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center mt-10">
          <div className="grid justify-around items-center gap-5">
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Situação atual:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[65rem]
                resize-none h-20
              rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
                value={currentSituation}
                onChange={(e) => setCurrentSituation(e.target.value as any)}
              />
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Proposta de melhoria:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[65rem]
                resize-none h-20
              rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
                value={proposal}
                onChange={(e) => setProposal(e.target.value as any)}
              />
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Frequência de uso:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[65rem]
                resize-none h-20
              rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
                value={usageFrequency}
                onChange={(e) => setUsageFrequency(e.target.value as any)}
              />
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Benefício qualitativo:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[65rem]
                resize-none h-20 
              rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
                value={qualitativeBenefit}
                onChange={(e) => setQualitativeBenefit(e.target.value as any)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start mt-12">
          <BenefitsCard
            title="Benefícios reais"
            benefits={getBenefits("REAL")}
          />
          <BenefitsCard
            title="Benefícios potenciais"
            benefits={getBenefits("POTENCIAL")}
          />
        </div>
            <FilesTable files={fileRows}/>
        <div className="flex justify-center items-center mt-10">
          <Button
            variant="contained"
            sx={{
              width: "5rem",
              height: "2.5rem",
              marginBottom: "2rem",
            }}
            className="text-white font-roboto font-bold text-lg"
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );
}
