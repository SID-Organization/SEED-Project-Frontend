import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DemandCard from "../../../Components/Demand-card";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import MuiTextField from "@mui/material/TextField";

import FilesTable from "../../../Components/FilesTable";

import { styled } from "@mui/material/styles";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const TableInput = styled(MuiTextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
});

export default function GenerateProposal() {
  const [demand, setDemand] = useState();
  const [payback, setPayback] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameBusinessResponsible, setNameBusinessResponsible] = useState("");
  const [areaBusinessResponsible, setAreaBusinessResponsible] = useState("");

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

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["image", "link"],
    ],
  };

  const [quillValue, setQuillValue] = useState("");
  const quillValueRef = useRef(null);

  const [totalCostList, setTotalCostList] = useState([
    {
      expenseType: "",
      expenseProfile: "",
      monthTimeExecution: "",
      necessaryHours: "",
      costHour: "",
      totalExpenseCost: "",
      costCenterPayers: "",
    },
  ]);

  function addTotalCoasts() {
    setTotalCostList([
      ...totalCostList,
      {
        expenseType: "",
        expenseProfile: "",
        monthTimeExecution: "",
        necessaryHours: "",
        costHour: "",
        totalExpenseCost: "",
        costCenterPayers: "",
      },
    ]);
  }

  return (
    <div>
      <div className="grid justify-center items-center gap-5">
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1 className="flex items-center justify-center text-xl font-roboto mt-5 font-bold p-5">
          Escopo do projeto
        </h1>
        <h1 className="flex justify-center items-center">
          <ReactQuill
            value={quillValue}
            onChange={(e) => setQuillValue(e)}
            modules={quillModules}
            ref={quillValueRef}
            style={{ width: "50rem", height: "10rem" }}
          />
        </h1>
      </div>
      <div className="mt-20">
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Tabela de custos:{" "}
        </h1>
        <div className="flex justify-center items-center">
          <Tooltip title="Adicionar tabela de custos">
            <IconButton onClick={addTotalCoasts}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* Columns table */}
      <div className="flex justify-center items-center">
        <table>
          <thead>
            <tr>
              <th className="border-2 border-blue-weg border-b-2 border-r-0">
                <p className="text-base font-roboto font-bold ">
                  Tipo de despesa
                </p>
              </th>
              <th className="border-2 border-blue-weg border-b-2 border-r-0">
                <p className="text-base font-roboto font-bold ">
                  Perfil de despesa
                </p>
              </th>
              <th className="border-2 border-blue-weg border-b-2 border-r-0">
                <p className="text-base font-roboto font-bold ">
                  Mês de execução
                </p>
              </th>
              <th className="border-2 border-blue-weg border-b-2 border-r-0">
                <p className="text-base font-roboto font-bold ">
                  Horas necessárias
                </p>
              </th>
              <th className="border-2 border-blue-weg border-b-2 border-r-0">
                <p className="text-base font-roboto font-bold ">
                  Custo por hora
                </p>
              </th>
              <th className="border-2 border-blue-weg border-b-2 border-r-0">
                <p className="text-base font-roboto font-bold ">
                  Custo total da despesa
                </p>
              </th>
              <th className="border-2 border-blue-weg border-b-2">
                <p className="text-base font-roboto font-bold ">
                  Centro de custo pagadores
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {totalCostList.map((totalCost, index) => {
              return (
                <tr>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <TableInput
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={totalCost.expenseType}
                      onChange={(e) => {
                        const newTotalCostList = [...totalCostList];
                        newTotalCostList[index].expenseType = e.target.value;
                        setTotalCostList(newTotalCostList);
                      }}
                      multiline
                    />
                  </td>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <TableInput
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={totalCost.expenseProfile}
                      onChange={(e) => {
                        const newTotalCostList = [...totalCostList];
                        newTotalCostList[index].expenseProfile = e.target.value;
                        setTotalCostList(newTotalCostList);
                      }}
                    />
                  </td>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <TableInput
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={totalCost.monthTimeExecution}
                      onChange={(e) => {
                        const newTotalCostList = [...totalCostList];
                        newTotalCostList[index].monthTimeExecution =
                          e.target.value;

                        setTotalCostList(newTotalCostList);
                      }}
                    />
                  </td>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <div className="flex justify-center items-center">
                      <TableInput
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={totalCost.hoursNeeded}
                        onChange={(e) => {
                          const newTotalCostList = [...totalCostList];
                          newTotalCostList[index].hoursNeeded = e.target.value;
                          setTotalCostList(newTotalCostList);
                        }}
                      />
                    </div>
                  </td>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <div className="flex justify-center items-center">
                      <TableInput
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={totalCost.hourCost}
                        onChange={(e) => {
                          const newTotalCostList = [...totalCostList];
                          newTotalCostList[index].hourCost = e.target.value;
                          setTotalCostList(newTotalCostList);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </td>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <div className="flex justify-center items-center">
                      <TableInput
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={totalCost.totalExpenseCost}
                        onChange={(e) => {
                          const newTotalCostList = [...totalCostList];
                          newTotalCostList[index].totalExpenseCost =
                            e.target.value;
                          setTotalCostList(newTotalCostList);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </td>
                  <td className="border-2 border-blue-weg border-b-2 border-t-0">
                    <div className="flex justify-center items-center">
                      <TableInput
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={totalCost.costCenterPayers}
                        onChange={(e) => {
                          const newTotalCostList = [...totalCostList];
                          newTotalCostList[index].costCenterPayers =
                            e.target.value;
                          setTotalCostList(newTotalCostList);
                        }}
                      />
                    </div>
                  </td>
                  <div>
                    <Tooltip title="Deletar linha">
                      <IconButton
                        onClick={() => {
                          const newTotalCostList = [...totalCostList];
                          newTotalCostList.splice(index, 1);
                          setTotalCostList(newTotalCostList);
                        }}
                      >
                        <DeleteRoundedIcon
                          sx={{
                            color: "#0175b2",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid justify-center items-center mt-10">
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
