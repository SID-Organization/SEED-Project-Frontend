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
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Components
import DemandCard from "../../../Components/Demand-card";
import FilesTable from "../../../Components/FilesTable";
import CostTable from "../../../Components/Center-cost-components/Cost-table";
import CostTableRow from "../../../Components/Center-cost-components/Cost-table-rows";
import CostCenterPayers from "../../../Components/Center-cost-components/Cost-center-payers";

// Service
import DemandService from "../../../service/Demand-Service";
import ProposalService from "../../../service/Proposal-Service";

//Utils
import ReactQuillUtils from "../../../utils/ReactQuill-Utils";

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

export default function GenerateProposal() {
  // STATES
  const [demand, setDemand] = useState();
  const [proposal, setProposal] = useState();
  const [payback, setPayback] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameBusinessResponsible, setNameBusinessResponsible] = useState("");
  const [areaBusinessResponsible, setAreaBusinessResponsible] = useState("");

  // React quill text
  const [textIsNotProposal, setTextIsNotProposal] = useState("");
  const [textIsProposal, setTextIsProposal] = useState("");
  const [textProposalAlternatives, setTextProposalAlternatives] = useState("");
  const [textProposalMitigationPlan, setTextProposalMitigationPlan] =useState("");
  const [textProjectRange, setTextProjectRange] = useState("");

  // React quill
  const [quillValueEscopo, setQuillValueEscopo] = useState("");
  const [quillValueIsNotEscopoPart, setQuillValueIsNotEscopoPart] = useState("");
  const [quillValueProposalAlternatives, setQuillValueProposalAlternatives] = useState("");
  const [quillValueProposalMitigationPlan, setQuillValueProposalMitigationPlan] = useState("");
  const [quillValueProjectRange, setQuillValueProjectRange] = useState("");

  const quillValueRefEscopo = useRef(null);
  const quillValueRefIsNotEscopoPart = useRef(null);
  const quillValueRefProposalAlternatives = useRef(null);
  const quillValueRefProposalMitigationPlan = useRef(null);
  const quillValueRefProjectRange = useRef(null);

  const [buttonSavedClicked, setButtonSavedClicked] = useState(false);

  const [internalCosts, setInternalCosts] = useState([
    {
      expenseProfile: "",
      monthTimeExecution: "",
      necessaryHours: "",
      costHour: "",
      totalExpenseCost: "",
    },
  ]);

  const [externalCosts, setExternalCosts] = useState([
    {
      expenseProfile: "",
      monthTimeExecution: "",
      necessaryHours: "",
      costHour: "",
      totalExpenseCost: "",
    },
  ]);

  const [internalCostCenterPayers, setInternalCostCenterPayers] = useState([
    {
      costCenter: "",
      percentage: 0,
    },
  ]);

  const [externalCostCenterPayers, setExternalCostCenterPayers] = useState([
    {
      costCenter: "",
      percentage: 0,
    },
  ]);

  // Demand ID
  let demandId = useParams().id;

  useEffect(() => {
    DemandService.getDemandById(demandId).then((demand) => {
      setDemand(demand);
    });
  }, []);

  useEffect(() => {
    ProposalService.getProposalByDemandId(demandId).then((proposal) => {
      setProposal(proposal[0]);
    });
  }, []);

  function sumInternalCosts() {
    let sum = 0;
    internalCosts.forEach((cost) => {
      if (cost.totalExpenseCost !== "") {
        sum += parseFloat(cost.totalExpenseCost);
      }
    });
    return sum;
  }

  function sumExternalCosts() {
    let sum = 0;
    externalCosts.forEach((cost) => {
      if (cost.totalExpenseCost !== "") {
        sum += parseFloat(cost.totalExpenseCost);
      }
    });
    return sum;
  }

  const saveProgress = async () => {
    setButtonSavedClicked(true);
    // False = don't change demand status
    handlePutProposal(false);
    setTimeout(() => {
      setButtonSavedClicked(false);
    }, 1500);
  };

  function formatCosts(costs) {
    return costs.map((cost) => {
      return {
        perfilDespesaTabelaCustoLinha: cost.expenseProfile,
        periodoExecucaoTabelaCusto: parseInt(cost.monthTimeExecution),
        valorHoraTabelaCusto: parseInt(cost.costHour),
        quantidadeHorasTabelaCusto: parseInt(cost.necessaryHours),
      };
    });
  }

  function formatCCPS(CCPS) {
    console.log("INT CCPS", internalCostCenterPayers)
    return CCPS.map((ccp) => {
      return {
        centroCusto: { idCentroCusto: ccp.costCenter },
        porcentagemDespesa: ccp.percentage,
      };
    });
  }

  useEffect(() => {
    console.log("INT CCPS", internalCostCenterPayers)
  }, [internalCostCenterPayers])

  const handlePutProposal = async (finish) => {
    const proposalToSave = {
      escopoProposta: ReactQuillUtils.formatQuillText(textIsProposal),
      naoFazParteDoEscopoProposta:
        ReactQuillUtils.formatQuillText(textIsNotProposal),
      paybackProposta: payback,
      aprovadoWorkflowProposta: 1,
      periodoExecucaoDemandaInicio: startDate,
      periodoExecucaoDemandaFim: endDate,
      alternativasAvaliadasProposta: ReactQuillUtils.formatQuillText(textProposalAlternatives),
      planoMitigacaoProposta: ReactQuillUtils.formatQuillText(textProposalMitigationPlan),
      nomeResponsavelNegocio: nameBusinessResponsible,
      areaResponsavelNegocio: areaBusinessResponsible,
      custosInternosDoProjeto: sumInternalCosts(),
      custosExternosDoProjeto: sumExternalCosts(),
      custosTotaisDoProjeto: sumInternalCosts() + sumExternalCosts(),
      tabelaCusto: [
        {
          tipoDespesa: "INTERNA",
          tabelaCustoLinha: formatCosts(internalCosts),
          centroCustoTabelaCusto: formatCCPS(internalCostCenterPayers),
        },
        {
          tipoDespesa: "EXTERNA",
          tabelaCustoLinha: formatCosts(externalCosts),
          centroCustoTabelaCusto: formatCCPS(externalCostCenterPayers),
        },
      ],
    };

    const pdfProposal = {
      escopoPropostaHTML: quillValueEscopo,
      naoFazParteDoEscopoPropostaHTML: quillValueIsNotEscopoPart,
      alternativasAvaliadasPropostaHTML: quillValueProposalAlternatives,
      planoMitigacaoPropostaHTML: quillValueProposalMitigationPlan,
      proposta: { idProposta: proposal.idProposta },
    };

    console.log("PROPOSAL TO SAVE", JSON.stringify(proposalToSave));
    // console.log("PDF proposal", pdfProposal);
    console.log("PROPOSAL FROM DB", proposal);

    // Mudar status para PROPOSTA_PRONTA
    const formData = new FormData();
    formData.append("updatePropostaForm", JSON.stringify(proposalToSave));
    formData.append("pdfPropostaForm", JSON.stringify(pdfProposal));

    ProposalService.updateProposal(formData, proposal.idProposta).then((res) => {
      console.log("RESPONSE", res);
      if (finish && res.status == 200) {
        DemandService.updateDemandStatus(demandId, "PROPOSTA_PRONTA");
      }
    });
  };

  return (
    <div>
      <div className="grid items-center justify-center gap-5">
        <h1 className="mt-5 flex items-center justify-center font-roboto text-2xl font-bold text-blue-weg">
          Gerando proposta da demanda:
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div className="grid items-center justify-center">
        <div className="grid items-center justify-start">
          <div className="grid items-center justify-center">
            <h1 className="mt-5 flex items-center justify-start p-5 font-roboto text-xl font-bold">
              Escopo do projeto
            </h1>
            <ReactQuill
              value={quillValueEscopo}
              onChange={(e) => {
                setQuillValueEscopo(e);
                const txt = quillValueRefEscopo.current?.getEditor().getText();
                setTextIsProposal(txt);
              }}
              placeholder="Escreva aqui o objetivo e o escopo do projeto"
              onBlur={saveProgress}
              modules={quillModules}
              ref={quillValueRefEscopo}
              style={{ width: "50rem", height: "10rem" }}
            />
          </div>
          <div className="grid items-center justify-center">
            <h1 className="mt-10 flex items-center justify-start p-5 font-roboto text-xl font-bold">
              Não faz parte do escopo do projeto
            </h1>
            <ReactQuill
              value={quillValueIsNotEscopoPart}
              onChange={(e) => {
                setQuillValueIsNotEscopoPart(e);
                const txt = quillValueRefIsNotEscopoPart.current
                  ?.getEditor()
                  .getText();
                setTextIsNotProposal(txt);
              }}
              onBlur={saveProgress}
              placeholder="Escreva aqui o que não faz parte do escopo do projeto (não deve ser gasto tempo com)"
              modules={quillModules}
              ref={quillValueRefIsNotEscopoPart}
              style={{ width: "50rem", height: "10rem" }}
            />
          </div>
        </div>
        <div className="mt-20">
          <h1 className="mt-5 flex items-center justify-center font-roboto text-2xl font-bold text-blue-weg">
            Tabela de custos:{" "}
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <table className="grid gap-20">
            <div className="grid items-center justify-center gap-5">
              <CostTable
                typeTitle="Interno"
                costs={internalCosts}
                setCosts={setInternalCosts}
              />
              <div className="flex items-center justify-start">
                <CostCenterPayers
                  typeTitle="interno"
                  totalCostCenterPayers={internalCostCenterPayers}
                  setTotalCostCenterPayers={setInternalCostCenterPayers}
                />
              </div>
            </div>
            <div className="grid items-center justify-center gap-5">
              <CostTable
                typeTitle="Externo"
                costs={externalCosts}
                setCosts={setExternalCosts}
              />
              <div className="flex items-center justify-start">
                <CostCenterPayers
                  typeTitle="externo"
                  totalCostCenterPayers={externalCostCenterPayers}
                  setTotalCostCenterPayers={setExternalCostCenterPayers}
                />
              </div>
            </div>
          </table>
        </div>
        <div className="mt-10 grid items-center justify-start">
          <div className="h-[5rem] w-[40rem] border-2 border-b-0 border-dashed border-blue-weg">
            <div className="flex h-full items-center justify-start">
              <p className="ml-5 mr-8 font-roboto text-xl font-bold">
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
        <div className="mt-10 grid items-center justify-start gap-10">
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
          <div className="grid gap-16">
            <div className="grid gap-4">
              <p className="font-roboto text-lg font-bold">
                Alternativas avaliadas da proposta
              </p>
              <ReactQuill
                value={quillValueProposalAlternatives}
                onChange={(e) => {
                  setQuillValueProposalAlternatives(e);
                  const txt = quillValueRefProposalAlternatives.current
                    ?.getEditor()
                    .getText();
                  setTextProposalAlternatives(txt);
                }}
                modules={quillModules}
                ref={quillValueRefProposalAlternatives}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div className="grid gap-4">
              <p className="font-roboto text-lg font-bold">
                Abrangência do projeto
              </p>
              <ReactQuill
                value={quillValueProjectRange}
                onChange={(e) => {
                  setQuillValueProjectRange(e);
                  const txt = quillValueRefProposalAlternatives.current
                    ?.getEditor()
                    .getText();
                  setTextProjectRange(txt);
                }}
                modules={quillModules}
                ref={quillValueRefProjectRange}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div className="grid gap-4">
              <p className="font-roboto text-lg font-bold">
                Principais riscos / Plano mitigação
              </p>
              <ReactQuill
                value={quillValueProposalMitigationPlan}
                onChange={(e) => {
                  setQuillValueProposalMitigationPlan(e);
                  const txt = quillValueRefProposalMitigationPlan.current
                    ?.getEditor()
                    .getText();
                  setTextProposalMitigationPlan(txt);
                }}
                modules={quillModules}
                ref={quillValueRefProposalMitigationPlan}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div>
              <p className="font-roboto text-lg font-bold">
                Período de execução
              </p>
              <div className="flex gap-10">
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
              <div className="flex gap-10">
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
        </div>
        <div>
          <FilesTable />
        </div>
        <div className="m-10 flex items-center justify-end">
          <Button
            onClick={saveProgress}
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
            onClick={() => handlePutProposal(true)}
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
    </div>
  );
}
