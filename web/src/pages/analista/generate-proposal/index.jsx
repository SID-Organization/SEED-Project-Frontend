import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// Tools
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// MUI
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Components
import DemandCard from "../../../Components/Demand-card";
import FilesTable from "../../../Components/FilesTable";
import CostTableRow from "../../../Components/Cost-table-rows";

// Service
import DemandService from "../../../service/Demand-Service";
import ProposalService from "../../../service/Proposal-Service";


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

  const [buttonSavedClicked, setButtonSavedClicked] = useState(false);

  let demandId = useParams().id;

  useEffect(() => {
    DemandService.getDemandById(demandId)
      .then((demand) => {
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

  function sumInternalCosts() {
    let sum = 0;
    totalCostList.forEach((cost) => {
      if (cost.expenseType === "Interno") {
        if (cost.totalExpenseCost !== "") {
          sum += parseFloat(cost.totalExpenseCost);
        }
      }
    });
    return sum;
  }

  function sumExternalCosts() {
    let sum = 0;
    totalCostList.forEach((cost) => {
      if (cost.expenseType === "Externo") {
        if (cost.totalExpenseCost !== "") {
          sum += parseFloat(cost.totalExpenseCost);
        }
      }
    });
    return sum;
  }

  const handlePutProposal = async () => {
    // const proposalToBeSent = {
    //   demandId: demandId,
    //   escopoProposta: "n tem ainda",
    //   paybackProposta: payback,
    //   aprovadoWorkflowProposta: 1,
    //   startDate: startDate,
    //   endDate: endDate,
    //   periodoExecucaoDemanda: "20/04/2022",
    //   naoFazParteDoEscopoProposta: "n tem ainda",
    //   alternativasAvaliadasProposta: "n tem ainda",
    //   planoMitigacaoProposta: "n tem ainda",
    //   nameBusinessResponsible: nameBusinessResponsible,
    //   areaBusinessResponsible: areaBusinessResponsible,
    //   internalCosts: sumInternalCosts(),
    //   externalCosts: sumExternalCosts(),
    //   totalCosts: sumInternalCosts() + sumExternalCosts(),
    //   custosTotaisDoProjeto: totalCostList,
    // };

    const proposalToBeSent = {
      escopoProposta: "n tem ainda",
      paybackProposta: 123,
      aprovadoWorkflowProposta: 1,
      motivoRecusaWorkflowProposta: "não tem",
      periodoExecucaoDemanda: "2022-04-18",
      naoFazParteDoEscopoProposta: "n tem ainda",
      alternativasAvaliadasProposta: "n tem ainda",
      planoMitigacaoProposta: "n tem ainda",
      custosTotaisDoProjeto: 123,
    };

    const pdfProposal = {
      escopoPropostaHTML: "<p> Teste </p>",
      naoFazParteDoEscopoPropostaHTML: "<p> Teste </p>",
      alternativasAvaliadasPropostaHTML: "<p> Teste </p>",
      planoMitigacaoPropostaHTML: "<p> Teste </p>",
      proposta: { idProposta: 2 },
    };

    //Mudar status para PROPOSTA_PRONTA

    const formData = new FormData();
    formData.append("updatePropostaForm", JSON.stringify(proposalToBeSent));

    ProposalService.updateProposal(formData, 3)
      .then((response) => {
        if (response.status == 200) {
          DemandService.updateDemandStatus(demandId, "PROPOSTA_PRONTA");
        }
      });
  };

  return (
    <div>
      <div className="grid items-center justify-center gap-5">
        <h1 className="mt-5 flex items-center justify-center font-roboto text-2xl font-bold text-blue-weg">
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1 className="mt-5 flex items-center justify-center p-5 font-roboto text-xl font-bold">
          Escopo do projeto
        </h1>
        <h1 className="flex items-center justify-center">
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
        <h1 className="mt-5 flex items-center justify-center font-roboto text-2xl font-bold text-blue-weg">
          Tabela de custos:{" "}
        </h1>
        <div className="flex items-center justify-center">
          <Tooltip title="Adicionar tabela de custos">
            <IconButton onClick={addTotalCoasts}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* Columns table */}
      <div className="flex items-center justify-center">
        <table>
          <thead>
            <tr>
              <th className="border-2 border-b-2 border-r-0 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Tipo de despesa
                </p>
              </th>
              <th className="border-2 border-b-2 border-r-0 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Perfil de despesa
                </p>
              </th>
              <th className="border-2 border-b-2 border-r-0 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Mês de execução
                </p>
              </th>
              <th className="border-2 border-b-2 border-r-0 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Horas necessárias
                </p>
              </th>
              <th className="border-2 border-b-2 border-r-0 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Custo por hora
                </p>
              </th>
              <th className="border-2 border-b-2 border-r-0 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Custo total da despesa
                </p>
              </th>
              <th className="border-2 border-b-2 border-blue-weg">
                <p className="font-roboto text-base font-bold ">
                  Centro de custo pagadores
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {totalCostList.map((totalCost, index) => (
              <CostTableRow
                key={index}
                index={index}
                totalCost={totalCost}
                setCostList={setTotalCostList}
                costList={totalCostList}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid items-center justify-center">
        <div
          className="
          h-[5rem] w-[40rem]
          border-2 border-b-0 border-dashed
          border-blue-weg
        "
        >
          <div className="flex h-full items-center justify-start">
            <p
              className="
              ml-5 mr-8 font-roboto text-xl font-bold
            "
            >
              Custos totais do projeto
            </p>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              disabled
              value={sumInternalCosts() + sumExternalCosts()}
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
          h-[10rem] w-[40rem]
          border-2 border-dashed border-blue-weg
        "
        >
          <div className="grid h-full items-center justify-start">
            <div className="flex h-full items-center justify-start">
              <p
                className="
          ml-5 mr-[5.6rem] font-roboto text-xl
        "
              >
                Total de despesas (desembolso)
              </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                disabled
                value={sumExternalCosts()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                sx={{ width: "9rem" }}
              />
            </div>
            <div className="flex h-full items-center justify-start">
              <p
                className="
          ml-5 mr-8 font-roboto text-xl
        "
              >
                Total de despesas com custos internos
              </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                disabled
                value={sumInternalCosts()}
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
      <div className="mt-10 grid items-center justify-center gap-10">
        <div>
          <p className="font-roboto text-lg font-bold">Payback</p>
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
          <p className="font-roboto text-lg font-bold">Período de execução</p>
          <div className="mt-2 flex gap-10">
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
          <p className="font-roboto text-lg font-bold">
            Responsável pelo negócio
          </p>
          <div className="mt-2 flex gap-10">
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
      <div className="m-10 flex items-center justify-end">
        <Button
          onClick={() => {
            setButtonSavedClicked(true);
            setTimeout(() => {
              setButtonSavedClicked(false);
            }, 1500);
          }}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#727272c7",
            color: "#FFFFFF",

            "&:hover": {
              backgroundColor: "#727272",
            },
          }}
        >
          {(buttonSavedClicked && (
            <div className="flex items-center gap-2">
              <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
              <p>Salvando...</p>
            </div>
          )) ||
            "Salvar"}
        </Button>
        <Button
          onClick={handlePutProposal}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#0071AB",
            color: "#FFFFFF",
            ml: 2,
          }}
        >
          Concluir proposta
        </Button>
      </div>
    </div>
  );
}
