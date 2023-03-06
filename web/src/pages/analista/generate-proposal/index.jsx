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
      {totalCostList.map((totalCost, index) => {
        return (
          <div className="flex justify-center items-start gap-2">
            <div key={index} className="mb-20">
              <div className="grid justify-center items-center">
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2 border-blue-weg
                  border-b-0
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Tipo de despesa
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].expenseType = e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2 border-blue-weg
                  border-b-0
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Perfil da despesa
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].expenseProfile =
                            e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
                {/*  */}
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2 border-blue-weg
                  border-b-0
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Perido de execução em meses
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].monthTimeExecution =
                            e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
                {/*  */}
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2 border-blue-weg
                  border-b-0
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Quantidade de horas necessárias
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].necessaryHours =
                            e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
                {/*  */}
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2 border-blue-weg
                  border-b-0
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Valor de hora
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].hourValue = e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
                {/*  */}
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2 border-blue-weg
                  border-b-0
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Valor total da despesa
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].totalExpenseValue =
                            e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
                {/*  */}
                <div
                  className="
                  w-[40rem] h-[5rem]
                  border-2  border-blue-weg
                  border-b-2
                "
                >
                  <div className="flex items-center justify-start h-full">
                    <p
                      className="
                      text-xl font-roboto font-bold ml-5 mr-8
                    "
                    >
                      Centros de custos pagantes
                    </p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={(e) =>
                        setTotalCostList((prev) => {
                          const newTotalCostList = [...prev];
                          newTotalCostList[index].costCenterPayers =
                            e.target.value;
                          return newTotalCostList;
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Tooltip title="Remover tabela de custo">
                <IconButton>
                  <DeleteRoundedIcon
                    sx={{ color: "#0075B1", fontSize: "2rem" }}
                    onClick={() => {
                      setTotalCostList((prev) => {
                        const newTotalCostList = [...prev];
                        newTotalCostList.splice(index, 1);
                        return newTotalCostList;
                      });
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      })}
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
