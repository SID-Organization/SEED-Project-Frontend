import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DemandCard from "../../../Components/Demand-card";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import MuiTextField from "@mui/material/TextField";

import FilesTable from "../../../Components/FilesTable";

import { styled } from "@mui/material/styles";
import TableProposal from "../../../Components/Table-proposal";

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

const NameAreaInput = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const DateInput = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

export default function GenerateProposal() {
  const [demand, setDemand] = useState();
  const [payback, setPayback] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameBusinessResponsible, setNameBusinessResponsible] = useState("");
  const [areaBusinessResponsible, setAreaBusinessResponsible] = useState("");
  const [tables, setTables] = useState([]);

  function addTable() {
    const rows = parseInt(prompt("Quantidade de linhas:"));
    const cols = parseInt(prompt("Quantidade de colunas:"));

    const table = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push("");
      }
      table.push(row);
    }

    setTables([...tables, table]);
  }

  let demandId = useParams().id;

  async function getDemandFromDatabase() {
    const response = await fetch(
      `http://localhost:8080/sid/api/demanda/id/${demandId}`
    );
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getDemandFromDatabase().then((demand) => {
      setDemand(demand);
    });
  }, []);

  return (
    <div>
      <div className="grid justify-center items-center gap-5">
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1 className="flex items-center justify-start text-xl font-roboto mt-5 font-bold p-5">
          Escopo do projeto
        </h1>
        <h1 className="flex justify-center items-center">
          ** EDITOR DE TEXTO AQUI **
        </h1>
      </div>
      <div>
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Tabela de custos:{" "}
        </h1>
        <div className="flex justify-center items-center">
          <Tooltip title="Adicionar tabela">
            <IconButton onClick={addTable}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="grid justify-center items-center gap-10 mb-16">
          {tables.map((table, tableIndex) => (
            <TableProposal table={table} />
          ))}
        </div>
      </div>
      <div className="grid justify-center items-center">
        <div
          className="
          w-[40rem] h-[5rem]
          border-2 border-dashed border-blue-weg
          border-b-0
        "
        >
          <div className="flex items-center justify-start h-full">
            <p
              className="
              text-xl font-roboto font-bold ml-5 mr-8
            "
            >
              Custos totais do projeto
            </p>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div
          className="
          w-[40rem] h-[10rem]
          border-2 border-dashed border-blue-weg
        "
        >
          <div className="grid justify-start items-center h-full">
            <div className="flex items-center justify-start h-full">
              <p
                className="
          text-xl font-roboto ml-5 mr-[5.6rem]
        "
              >
                Total de despesas (desembolso)
              </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                sx={{ width: "9rem" }}
              />
            </div>
            <div className="flex items-center justify-start h-full">
              <p
                className="
          text-xl font-roboto ml-5 mr-8
        "
              >
                Total de despesas com custos internos
              </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                sx={{ width: "9rem" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-center items-center gap-10 mt-10">
        <div>
          <p className="text-lg font-bold font-roboto">Payback</p>
          <EqualInput
            id="outlined-textarea"
            variant="outlined"
            type="text"
            multiline
            maxRows={3}
            value={payback}
            onChange={(e) => setPayback(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </div>
        <div>
          <p className="text-lg font-bold font-roboto">Período de execução</p>
          <div className="flex gap-10 mt-2">
            <DateInput
              id="outlined-basic"
              variant="outlined"
              placeholder="dd/mm/aaaa"
              type="date"
              label="Início:"
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <DateInput
              id="outlined-basic"
              variant="outlined"
              placeholder="dd/mm/aaaa"
              type="date"
              label="Término:"
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-bold font-roboto">
            Responsável pelo negócio
          </p>
          <div className="flex gap-10 mt-2">
            <NameAreaInput
              id="outlined-textarea"
              variant="outlined"
              type="text"
              multiline
              placeholder="Nome"
              maxRows={3}
              value={nameBusinessResponsible}
              onChange={(e) => setNameBusinessResponsible(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
            />
            <NameAreaInput
              id="outlined-textarea"
              variant="outlined"
              type="text"
              multiline
              placeholder="Área"
              maxRows={3}
              value={areaBusinessResponsible}
              onChange={(e) => setAreaBusinessResponsible(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <FilesTable />
      </div>
    </div>
  );
}
