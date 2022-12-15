import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageIcon from "@mui/icons-material/Message";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";

import SubHeaderOpenedDemand from "../../../Components/Sub-header-opened-demand";
import WorkflowTable from "../../../Components/Workflow-table";
import BenefitsCard from "../../../Components/Benefits-card";

import "../../../styles/index.css";

import DemandInterface from "../../../Interfaces/demand/DemandInterface";

  

async function getDemandFromDatabase(id: string) {
  const response = await fetch("http://localhost:8080/sid/api/demanda/id/" + id);
  const demand = await response.json();
  return demand;
}

export default function openedDemand() {
  const params = useParams();

  const [demand, setDemand] = useState<DemandInterface>();

  useEffect(() => {
    if(params.id){
      getDemandFromDatabase(params.id)
      .then((demand) => {
        setDemand(demand);
      });
    }
  }, []);
  

  const [open, setOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(true);


  function getBenefits(benefitType: string){
    if(benefitType == "REAL"){
      return demand?.beneficiosDemanda.filter((benefit: any) => benefit.tipoBeneficio == "REAL");
    }
    else 
    if(benefitType == "POTENCIAL"){
      return demand?.beneficiosDemanda.filter((benefit: any) => benefit.tipoBeneficio == "POTENCIAL");
    }
    return [];
  }

  const [currentSituation, setCurrentSituation] = useState();
  const [proposal, setProposal] = useState();
  const [usageFrequency, setUsageFrequency] = useState();
  const [qualitativeBenefit, setQualitativeBenefit] = useState();

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

  const [fileRows, setFileRows] = useState<any[]>();

  // Seta os arquivos da demanda no estado
  useEffect(() => {
    if(demand){
      setFileRows(demand.arquivosDemandas);
      setCurrentSituation(demand.situacaoAtualDemanda as any);
      setProposal(demand.propostaMelhoriaDemanda as any);
      setUsageFrequency(demand.frequenciaUsoDemanda as any);
      setQualitativeBenefit(demand.descricaoQualitativoDemanda as any);
    }
  }, [demand]);


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
                    <h1 className="font-bold">Número de demanda:</h1>{" "}
                    <span className="font-normal">1000018</span>
                  </div>
                  <div className="grid items-center justify-center">
                    <div className="flex">
                      <h1 className="font-bold">Iniciada em:</h1>{" "}
                      <span className="font-normal">10/05/2022 - 15:25</span>
                    </div>
                    <div className="flex">
                      <h1 className="font-bold">Concluída em:</h1>{" "}
                      <span className="font-normal">10/05/2022 - 15:25</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-start items-center gap-[7rem]">
                  <div className="grid items-center justify-center">
                    <h1 className="font-bold font-roboto">Solicitante</h1>
                    <h1 className="font-roboto font-medium">Gustavo Santos</h1>
                    <h1 className="text-[#5B5B5B] text-sm">
                      WEG Digital Solutions
                    </h1>
                  </div>
                  <div className="grid items-center justify-center">
                    <h1 className="font-bold font-roboto">
                      Analista responsável
                    </h1>
                    <h1 className="font-roboto font-medium">Otavio Zapella</h1>
                    <h1 className="text-[#5B5B5B] text-sm">
                      WEG Digital Solutions
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
                <WorkflowTable demandId={params.id}/>
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
              <div>
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
            <h1 className="font-roboto text-xs">{demand?.solicitanteDemanda.departamentoUsuario.toUpperCase()}</h1>
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
            <h1 className="font-roboto text-sm">{demand?.centroCustoDemanda[0] ?? "Não indicado"}</h1>
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
          <BenefitsCard title="Benefícios reais" benefits={getBenefits("REAL")}/>
          <BenefitsCard title="Benefícios potenciais" benefits={getBenefits("POTENCIAL")}/>
        </div>
        <div className="grid justify-center items-center mt-16">
          <div className="flex justify-center items-center">
            <h1 className="mb-5 font-roboto text-2xl font-bold text-dark-blue-weg">
              Arquivos anexados
            </h1>
          </div>
          <div>
            <TableContainer
              component={Paper}
              sx={{
                "&:first-child": {
                  backgroundColor: "#e5e5e5",
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
                          backgroundColor: "#e5e5e5",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          border: "#d4d4d4 solid 2px",
                        },
                      }}
                    >
                      Arquivo
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                        border: "#d4d4d4 solid 2px",
                        "&:last-child": {
                          backgroundColor: "#e5e5e5",
                          color: "black",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      Anexado em
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fileRows && fileRows?.map((fileRow, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <a href={`data:${fileRow.tipoArquivo};base64,${fileRow.arquivo}`} download={fileRow.nomeArquivo.split('.')[0]}>
                          <Tooltip title="Baixar arquivo">
                              <DescriptionIcon className="text-light-blue-weg cursor-pointer flex justify-center items-center mr-5"/>
                          </Tooltip>  
                        </a>
                        {fileRow.nomeArquivo}
                      </StyledTableCell>
                      <div className="flex justify-center items-center">
                        <StyledTableCell align="center">
                          {new Date(fileRow.dataRegistroArquivo).toLocaleDateString()}
                        </StyledTableCell>
                        <Tooltip title="Deletar arquivo">
                          <DeleteIcon className="text-light-blue-weg cursor-pointer flex justify-center items-center ml-5" />
                        </Tooltip>
                      </div>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center items-center mt-5 mb-5">
                <Tooltip title="Adicionar arquivo">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#0075B1",
                    }}
                  >
                    <InsertDriveFileOutlined className="text-white cursor-pointer flex justify-center items-center mr-5" />
                    Anexar arquivo
                    <input hidden accept="file/*" multiple type="file" />
                  </Button>
                </Tooltip>
              </div>
            </TableContainer>
          </div>
        </div>
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


