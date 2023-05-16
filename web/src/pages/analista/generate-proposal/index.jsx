import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Tools
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";

// MUI
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Components
import DemandCard from "../../../Components/Demand-card";
import FilesTable from "../../../Components/FilesTable";
import CostTable from "../../../Components/Center-cost-components/Cost-table";
import CostCenterPayers from "../../../Components/Center-cost-components/Cost-center-payers";

// Service
import DemandService from "../../../service/Demand-Service";
import ProposalService from "../../../service/Proposal-Service";
import ProposalPDFService from "../../../service/ProposalPDF-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";
import ProposalUtils from "../../../utils/Proposal-Utils";
import ReactQuillUtils from "../../../utils/ReactQuill-Utils";
import DemandLogService from "../../../service/DemandLog-Service";
const { quillModules, removeHTML } = ReactQuillUtils;

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

  const navigate = useNavigate();

  // STATES
  const [demand, setDemand] = useState("");
  const [proposal, setProposal] = useState("");

  const [payback, setPayback] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameBusinessResponsible, setNameBusinessResponsible] = useState("");
  const [areaBusinessResponsible, setAreaBusinessResponsible] = useState("");

  // React quill
  const [quillHtmlScope, setQuillHtmlScope] = useState("");
  const [quillHtmlIsNotOnScope, setQuillHtmlIsNotOnScope] =
    useState("");
  const [quillHtmlProposalAlternatives, setQuillHtmlProposalAlternatives] =
    useState("");
  const [
    quillHtmlProposalMitigationPlan,
    setQuillHtmlProposalMitigationPlan,
  ] = useState("");

  const [quillValueProjectRange, setQuillValueProjectRange] = useState("");


  const [buttonSavedClicked, setButtonSavedClicked] = useState(false);

  const [internalCosts, setInternalCosts] = useState([]);

  const [externalCosts, setExternalCosts] = useState([]);

  const [internalCostCenterPayers, setInternalCostCenterPayers] = useState([]);

  const [externalCostCenterPayers, setExternalCostCenterPayers] = useState([]);


  // Demand ID
  let demandId = useParams().id;

  // Get demand, proposal and proposal pdf from DB
  useEffect(() => {
    DemandService.getDemandById(demandId).then((demand) => {
      setDemand(demand);
    });
  }, []);

  useEffect(() => {
    ProposalService.getProposalByDemandId(demandId).then((proposal) => {
      const lastProposal = proposal[proposal.length - 1];
      console.log("PROPOSAL", lastProposal)
      setProposal(lastProposal);
      return lastProposal.idProposta;
    })
      .then(proposalId => {
        ProposalPDFService.getPdfByProposalId(proposalId).then((pdf) => {
          if (pdf)
            continueProposal(pdf);
        });
      });
  }, []);

  async function continueProposal(html) {
    delete html.idPdfProposta;
    delete html.proposta;
    setQuillHtmlScope(html.escopoPropostaHTML);
    setQuillValueProjectRange(html.abrangenciaProjetoPropostaHTML);
    setQuillHtmlIsNotOnScope(html.naoFazParteDoEscopoPropostaHTML);
    setQuillHtmlProposalMitigationPlan(html.planoMitigacaoPropostaHTML);
    setQuillHtmlProposalAlternatives(html.alternativasAvaliadasPropostaHTML);
    console.log("PDF", html);
  }


  useEffect(() => {
    if (proposal) {
      const intTable = proposal.tabelaCusto.find(tc => tc.tipoDespesa == "INTERNA");
      const extTable = proposal.tabelaCusto.find(tc => tc.tipoDespesa == "EXTERNA");

      setInternalCosts(ProposalUtils.formatCostsFromDB(intTable));
      setExternalCosts(ProposalUtils.formatCostsFromDB(extTable));
      setInternalCostCenterPayers(ProposalUtils.formatCCPsFromDB(intTable));
      setExternalCostCenterPayers(ProposalUtils.formatCCPsFromDB(extTable));
      setStartDate(DateUtils.formatDateFromDB(proposal.periodoExecucaoDemandaInicio));
      setEndDate(DateUtils.formatDateFromDB(proposal.periodoExecucaoDemandaFim));
    }
  }, [proposal])


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
      const tempCost = {
        perfilDespesaTabelaCustoLinha: cost.expenseProfile,
        periodoExecucaoTabelaCusto: parseInt(cost.monthTimeExecution),
        valorHoraTabelaCusto: parseInt(cost.costHour),
        quantidadeHorasTabelaCusto: parseInt(cost.necessaryHours),
      };

      if (Object.values(tempCost).includes("") || Object.values(tempCost).includes(0)) {
        return null;
      }

      return tempCost;
    }).filter(item => item != null);
  }

  function formatCCPS(CCPS) {
    return CCPS.map((ccp) => {
      const tempCcp = {
        centroCusto: { idCentroCusto: ccp.costCenter },
        porcentagemDespesa: ccp.percentage,
      };

      if (tempCcp.centroCusto.idCentroCusto === "" || tempCcp.porcentagemDespesa === 0) {
        return null;
      }

      return tempCcp;
    }).filter(item => item != null);
  }

  const handlePutProposal = async (finish = false) => {


    const tabelaCustoInterno = {
      tipoDespesa: "INTERNA",
      tabelaCustoLinha: formatCosts(internalCosts),
      centroCustoTabelaCusto: formatCCPS(internalCostCenterPayers),
    }

    const tabelaCustoExterno = {
      tipoDespesa: "EXTERNA",
      tabelaCustoLinha: formatCosts(externalCosts),
      centroCustoTabelaCusto: formatCCPS(externalCostCenterPayers),
    }

    let tcli = tabelaCustoInterno.tabelaCustoLinha;
    let tcci = tabelaCustoInterno.centroCustoTabelaCusto;
    let tcle = tabelaCustoExterno.tabelaCustoLinha;
    let tcce = tabelaCustoExterno.centroCustoTabelaCusto;

    if ((tcli.length == 0 && tcci.length > 0) || (tcli.length > 0 && tcci.length == 0)) {
      alert("Preencha todos os campos de custo interno ( tabela de custo e centro de custo )");
      return;
    }

    if ((tcle.length == 0 && tcce.length > 0) || (tcle.length > 0 && tcce.length == 0)) {
      alert("Preencha todos os campos de custo externo ( tabela de custo e centro de custo )");
      return;
    }

    const intCostsSum = ProposalUtils.sumCosts(internalCosts);
    const extCostsSum = ProposalUtils.sumCosts(externalCosts);

    const proposalToSave = {
      escopoProposta: removeHTML(quillHtmlScope),
      naoFazParteDoEscopoProposta: removeHTML(quillHtmlIsNotOnScope),
      paybackProposta: payback,
      aprovadoWorkflowProposta: 1,
      periodoExecucaoDemandaInicio: startDate,
      periodoExecucaoDemandaFim: endDate,
      alternativasAvaliadasProposta: removeHTML(quillHtmlProposalAlternatives),
      planoMitigacaoProposta: removeHTML(quillHtmlProposalMitigationPlan),
      abrangenciaProjetoProposta: removeHTML(quillValueProjectRange),
      nomeResponsavelNegocio: nameBusinessResponsible,
      areaResponsavelNegocio: areaBusinessResponsible,
      custosInternosDoProjeto: intCostsSum,
      custosExternosDoProjeto: extCostsSum,
      custosTotaisDoProjeto: intCostsSum + extCostsSum,
      tabelaCusto: [
        tabelaCustoInterno,
        tabelaCustoExterno,
      ],
    };

    const pdfProposal = {
      escopoPropostaHTML: quillHtmlScope,
      naoFazParteDoEscopoPropostaHTML: quillHtmlIsNotOnScope,
      alternativasAvaliadasPropostaHTML: quillHtmlProposalAlternatives,
      planoMitigacaoPropostaHTML: quillHtmlProposalMitigationPlan,
      abrangenciaProjetoPropostaHTML: quillValueProjectRange,
      proposta: { idProposta: proposal.idProposta },
    };

    // Mudar status para PROPOSTA_PRONTA
    const formData = new FormData();
    formData.append("updatePropostaForm", JSON.stringify(proposalToSave));
    formData.append("pdfPropostaForm", JSON.stringify(pdfProposal));

    console.log("Proposal", proposalToSave);
    console.log("PDF", pdfProposal);

    ProposalService.updateProposal(formData, proposal.idProposta)
      .then(res => {
        console.log("finish", finish);
        if (finish && (res.status === 200 || res.status === 201)) {
          const newDemandLog = {
            tarefaHistoricoWorkflow: "APROVACAO_COMISSAO",
            demandaHistorico: { idDemanda: demandId },
            acaoFeitaHistorico: "Aprovar",
            idResponsavel: { numeroCadastroUsuario: 72131 },
          };

          DemandLogService.createDemandLog(newDemandLog).then((response) => {
            if (response.status == 200 || response.status == 201) {
              DemandService.updateDemandStatus(demandId, "APROVACAO_COMISSAO");
              navigate('/gerenciar-demandas');
            }
          });
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
              value={quillHtmlScope}
              onChange={(e) => setQuillHtmlScope(e)}
              placeholder="Escreva aqui o objetivo e o escopo do projeto"
              onBlur={saveProgress}
              modules={quillModules}
              style={{ width: "50rem", height: "10rem" }}
            />
          </div>
          <div className="grid items-center justify-center">
            <h1 className="mt-10 flex items-center justify-start p-5 font-roboto text-xl font-bold">
              Não faz parte do escopo do projeto
            </h1>
            <ReactQuill
              value={quillHtmlIsNotOnScope}
              onChange={(e) => setQuillHtmlIsNotOnScope(e)}
              onBlur={saveProgress}
              placeholder="Escreva aqui o que não faz parte do escopo do projeto (não deve ser gasto tempo com)"
              modules={quillModules}
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
                aria-readonly={true}
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
                  aria-readonly={true}
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
                  aria-readonly={true}
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
              onBlur={saveProgress}
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
                value={quillHtmlProposalAlternatives}
                placeholder="Escreva aqui as alternativas avaliadas da proposta"
                onChange={(e) => setQuillHtmlProposalAlternatives(e)}
                onBlur={saveProgress}
                modules={quillModules}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div className="grid gap-4">
              <p className="font-roboto text-lg font-bold">
                Abrangência do projeto
              </p>
              <ReactQuill
                value={quillValueProjectRange}
                placeholder="Escreva aqui a abrangência do projeto, como por exemplo: quais áreas serão impactadas, etc."
                onChange={(e) => setQuillValueProjectRange(e)}
                onBlur={saveProgress}
                modules={quillModules}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div className="grid gap-4">
              <p className="font-roboto text-lg font-bold">
                Principais riscos / Plano mitigação
              </p>
              <ReactQuill
                value={quillHtmlProposalMitigationPlan}
                placeholder="Escreva aqui os principais riscos e o plano de mitigação"
                onChange={(e) => setQuillHtmlProposalMitigationPlan(e)}
                onBlur={saveProgress}
                modules={quillModules}
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
