import * as React from "react";
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
import Typography from "@mui/material/Typography";

import SubHeader from "../../../Components/SubHeader";
import WorkflowTable from "../../../Components/WorkflowTable";

import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageIcon from "@mui/icons-material/Message";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteIcon from "@mui/icons-material/Delete";

import "../../../styles/index.css";
import { useState } from "react";
import BenefitsCard from "../../../Components/BenefitsCard";
import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";
import { IconButton } from "@mui/material";

export default function openedDemand() {
  const [open, setOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 600,
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

  function createData(name: string, size: string) {
    return { name, size };
  }

  const rows = [
    createData("Resumo.docx", "17/08/2022"),
    createData("Resumo.docx", "17/08/2022"),
    createData("Resumo.docx", "17/08/2022"),
  ];

  return (
    <div>
      <SubHeader
        isEditEnabled={isEditEnabled}
        setIsEditEnabled={setIsEditEnabled}
      >
        Visualização Demanda 0012
      </SubHeader>
      <div className="grid">
        <div className="flex justify-around items-center mt-5">
          <Tooltip title="Abrir workflow">
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                backgroundColor: "#D7D7D7",
                borderLeft: "3px solid #0075B1",
                fontWeight: "bold",
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
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
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
              </Typography>
              <div className="grid items-center">
                <div className="flex justify-start items-center">
                  <h1 className="font-roboto font-bold mt-5 text-lg">
                    Histórico
                  </h1>
                </div>
                <WorkflowTable />
              </div>
            </Box>
          </Modal>
          <div className="grid justify-center items-center">
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-light-blue-weg font-bold text-2xl font-roboto">
                  Aumento da velocidade de consulta de dados
                </h1>
              </div>
              <div>
                <Tooltip title="Abrir chat">
                  <MessageIcon
                    sx={{
                      color: "#00579D",
                      fontSize: 30,
                      marginLeft: 2,
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <h1 className="font-semibold text-dark-blue-weg font-roboto">
                Score: 2143
              </h1>
            </div>
          </div>
          <div>
            <Tooltip title="Abrir como documento">
              <Button variant="contained">
                <OpenInFullIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <div className="grid justify-center items-center">
            <h1 className="font-roboto font-bold text-dark-blue-weg text-lg">
              Solicitante
            </h1>
            <h1 className="font-roboto font-semibold text-base">
              GUSTAVO SANTOS
            </h1>
            <h1 className="font-roboto text-sm">WEG DIGITAL SOLUTIONS</h1>
          </div>
          <div className="flex justify-center items-center gap-5">
            <h1 className="font-roboto font-bold">
              De: <span className="text-dark-blue-weg">10/05/2022</span>
            </h1>
            <h1 className="font-roboto font-bold">
              Até: <span className="text-dark-blue-weg">20/06/2022</span>
            </h1>
          </div>
          <div className="grid justify-center items-center">
            <h1 className="text-dark-blue-weg font-bold font-roboto">
              Centro de custo
            </h1>
            <h1 className="font-roboto">Departamento 3</h1>
          </div>
        </div>
        <div
          className="
          flex flex-wrap justify-center items-center
          ml-[6.5rem] mr-[6.5rem] mt-10
        "
        >
          <div className="grid justify-around items-center gap-5">
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Descrição:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[71rem]
              rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in
                imperdiet felis. Donec et porta elit. Sed nec est id diam
                placerat mattis. Fusce molestie lobortis erat, a laoreet turpis
                placerat in. Cras sollicitudin nulla at urna sodales, eu
                placerat leo aliquam. Cras imperdiet mauris in orci placerat,
                vitae efficitur dolor egestas. Donec ex libero, vehicula ut
                aliquam id, auctor in diam.
              </textarea>
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Problema a ser resolvido:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[71rem] 
                rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
              >
                Sed ut iaculis felis. Phasellus eget pharetra tortor. Proin
                tempor risus purus. Suspendisse porttitor ultricies nibh
                facilisis interdum. In et nisi quis magna vulputate finibus ac
                in felis. Vivamus rhoncus tincidunt sapien. Nam ultrices arcu
                lectus, tincidunt auctor diam suscipit eu. Aenean nec diam et
                tortor laoreet viverra. Aliquam volutpat orci ut mauris pretium
                elementum vel eu turpis. In et tincidunt lectus, et blandit
                elit. Duis luctus eget arcu ornare pellentesque. Sed hendrerit
                quam ac ante luctus, et dictum ligula euismod. Nullam efficitur
                urna urna, vel varius erat suscipit ac. Donec dolor velit,
                luctus a ligula eu, auctor convallis turpis.
              </textarea>
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Proposta:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[71rem] 
                rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis velit sapien, nec dapibus velit tempor et. Vivamus
                fringilla venenatis nisi, malesuada efficitur quam elementum
                sed. Vivamus venenatis velit a turpis mollis finibus. Proin
                dignissim ante velit, vitae molestie turpis condimentum ac. Cras
                a elit condimentum, sodales dui sed, ullamcorper tellus. Sed
                vitae lacinia libero. Praesent ut lacus imperdiet, euismod
                libero vitae, sollicitudin augue. Duis ullamcorper magna et
                metus gravida, sed dictum ex fermentum. Suspendisse tellus erat,
                volutpat quis odio sed, accumsan vehicula metus. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Nunc vestibulum a felis quis efficitur. In
                fermentum sit amet libero eleifend rutrum.
              </textarea>
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-dark-blue-weg font-bold font-roboto text-lg">
                Em que irá ajudar:
              </h1>
              <textarea
                className="font-roboto text-justify font-medium w-[71rem] 
                rounded-[0.5rem] p-2 outline-dark-blue-weg text-black border-1"
                disabled={isEditEnabled}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis velit sapien, nec dapibus velit tempor et. Vivamus
                fringilla venenatis nisi, malesuada efficitur quam elementum
                sed. Vivamus venenatis velit a turpis mollis finibus. Proin
                dignissim ante velit, vitae molestie turpis condimentum ac. Cras
                a elit condimentum, sodales dui sed, ullamcorper tellus. Sed
                vitae lacinia libero. Praesent ut lacus imperdiet, euismod
                libero vitae, sollicitudin augue.
              </textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8 ml-[6.5rem] mr-[6.5rem]">
          <BenefitsCard>Benefícios reais</BenefitsCard>
          <BenefitsCard>Benefícios potenciais</BenefitsCard>
          <BenefitsCard>Benefícios qualitativos</BenefitsCard>
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
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Tooltip title="Baixar arquivo">
                          <DescriptionIcon className="text-light-blue-weg cursor-pointer flex justify-center items-center mr-5" />
                        </Tooltip>
                        {row.name}
                      </StyledTableCell>
                      <div className="flex justify-center items-center">
                        <StyledTableCell align="center">
                          {row.size}
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
    </div>
  );
}
