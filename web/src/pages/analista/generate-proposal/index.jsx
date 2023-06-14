import React, { useState, useEffect, useContext } from "react";
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
import FontSizeUtils from "../../../utils/FontSize-Utils";
import VoiceSpeech from "../../../Components/VoiceSpeech";

//Translation
import TranslationJson from "../../../API/Translate/pages/generateProposal.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";


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

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const navigate = useNavigate();

  // Demand ID
  let demandId = useParams().id;

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
  const [quillHtmlIsNotOnScope, setQuillHtmlIsNotOnScope] = useState("");
  const [quillHtmlProposalAlternatives, setQuillHtmlProposalAlternatives] =
    useState("");
  const [quillHtmlProposalMitigationPlan, setQuillHtmlProposalMitigationPlan] =
    useState("");
  const [quillValueProjectRange, setQuillValueProjectRange] = useState("");

  const [buttonSavedClicked, setButtonSavedClicked] = useState(false);

  const [internalCosts, setInternalCosts] = useState([]);
  const [externalCosts, setExternalCosts] = useState([]);

  const [internalCostCenterPayers, setInternalCostCenterPayers] = useState([]);
  const [externalCostCenterPayers, setExternalCostCenterPayers] = useState([]);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  // Get demand, proposal and proposal pdf from DB
  useEffect(() => {
    DemandService.getDemandById(demandId).then((demand) => {
      setDemand(demand);
    });
  }, []);

  useEffect(() => {
    ProposalService.getProposalByDemandId(demandId)
      .then((proposal) => {
        const lastProposal = proposal[proposal.length - 1];
        console.log("PROPOSAL", lastProposal);
        setProposal(lastProposal);
        return lastProposal.idProposta;
      })
      .then((proposalId) => {
        ProposalPDFService.getPdfByProposalId(proposalId).then((pdf) => {
          if (pdf) continueProposal(pdf);
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
      const intTable = proposal.tabelaCusto.find(
        (tc) => tc.tipoDespesa == "INTERNA"
      );
      const extTable = proposal.tabelaCusto.find(
        (tc) => tc.tipoDespesa == "EXTERNA"
      );

      setInternalCosts(ProposalUtils.formatCostsFromDB(intTable));
      setExternalCosts(ProposalUtils.formatCostsFromDB(extTable));
      setInternalCostCenterPayers(ProposalUtils.formatCCPsFromDB(intTable));
      setExternalCostCenterPayers(ProposalUtils.formatCCPsFromDB(extTable));
      setStartDate(
        DateUtils.formatDateForDB(proposal.periodoExecucaoDemandaInicio)
      );
      setEndDate(DateUtils.formatDateForDB(proposal.periodoExecucaoDemandaFim));
      setPayback(proposal.paybackProposta);
    }
  }, [proposal]);


  const saveProgress = async () => {
    setButtonSavedClicked(true);
    // False = don't change demand status
    handlePutProposal(false);
    setTimeout(() => {
      setButtonSavedClicked(false);
    }, 1500);
  };

  const handlePutProposal = async (finish = false) => {
    const tabelaCustoInterno = {
      tipoDespesa: "INTERNA",
      tabelaCustoLinha: ProposalUtils.formatCostsForDB(internalCosts),
      centroCustoTabelaCusto: ProposalUtils.formatCCPsForDB(internalCostCenterPayers),
    };

    const tabelaCustoExterno = {
      tipoDespesa: "EXTERNA",
      tabelaCustoLinha: ProposalUtils.formatCostsForDB(externalCosts),
      centroCustoTabelaCusto: ProposalUtils.formatCCPsForDB(externalCostCenterPayers),
    };

    // Tabela custo linha interno
    let tcli = tabelaCustoInterno.tabelaCustoLinha;
    // Tabela centro de custo interno
    let tcci = tabelaCustoInterno.centroCustoTabelaCusto;
    // Tabela custo linha externo
    let tcle = tabelaCustoExterno.tabelaCustoLinha;
    // Tabela centro de custo externo
    let tcce = tabelaCustoExterno.centroCustoTabelaCusto;

    if (
      (tcli.length == 0 && tcci.length > 0) ||
      (tcli.length > 0 && tcci.length == 0)
    ) {
      alert(
        "Preencha todos os campos de custo interno ( tabela de custo e centro de custo )"
      );
      return;
    }

    if (
      (tcle.length == 0 && tcce.length > 0) ||
      (tcle.length > 0 && tcce.length == 0)
    ) {
      alert(
        "Preencha todos os campos de custo externo ( tabela de custo e centro de custo )"
      );
      return;
    }

    const intCostsSum = ProposalUtils.sumCosts(internalCosts);
    const extCostsSum = ProposalUtils.sumCosts(externalCosts);

    const proposalToSave = {
      escopoProposta: removeHTML(quillHtmlScope),
      naoFazParteDoEscopoProposta: removeHTML(quillHtmlIsNotOnScope),
      // paybackProposta: payback,
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
      tabelaCusto: [tabelaCustoInterno, tabelaCustoExterno],
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

    ProposalService.updateProposal(formData, proposal.idProposta).then(
      (res) => {
        console.log("finish", finish);
        console.log("entrou res: ", res);
        if (finish && (res.status === 200 || res.status === 201)) {
          DemandLogService.createDemandLog(
            "APROVACAO_COMISSAO",
            demandId,
            "Enviar",
            72131
          ).then((response) => {
            if (response.status == 200 || response.status == 201) {
              DemandService.updateDemandStatus(demandId, "PROPOSTA_PRONTA");
              navigate("/gerenciar-demandas");
            }
          });
        }
      }
    );
  };

  const [currentSpeechId, setCurrentSpeechId] = useState(0);
  const [projectScopeSpeech, setProjectScopeSpeech] = useState({ id: 1, text: "" });
  const [notInScopeSpeech, setNotInScopeSpeech] = useState({ id: 2, text: "" });
  const [proposalAlternativesSpeech, setProposalAlternativesSpeech] = useState({ id: 3, text: "" });
  const [mitigationPlanSpeech, setMitigationPlanSpeech] = useState({ id: 4, text: "" });
  const [projectRangeSpeech, setProjectRangeSpeech] = useState({ id: 5, text: "" });

  useEffect(() => {
    if (projectScopeSpeech.text != "") {
      setQuillHtmlScope(ps => ps + projectScopeSpeech.text);
      setProjectScopeSpeech({ ...projectScopeSpeech, text: "" })
    }

    if (notInScopeSpeech.text != "") {
      setQuillHtmlIsNotOnScope(ps => ps + notInScopeSpeech.text);
      setNotInScopeSpeech({ ...notInScopeSpeech, text: "" })
    }

    if (proposalAlternativesSpeech.text != "") {
      setQuillHtmlProposalAlternatives(ps => ps + proposalAlternativesSpeech.text);
      setProposalAlternativesSpeech({ ...proposalAlternativesSpeech, text: "" })
    }

    if (mitigationPlanSpeech.text != "") {
      setQuillHtmlProposalMitigationPlan(ps => ps + mitigationPlanSpeech.text);
      setMitigationPlanSpeech({ ...mitigationPlanSpeech, text: "" })
    }

    if (projectRangeSpeech.text != "") {
      setQuillValueProjectRange(ps => ps + projectRangeSpeech.text);
      setProjectRangeSpeech({ ...projectRangeSpeech, text: "" })
    }
  }, [projectScopeSpeech, notInScopeSpeech, proposalAlternativesSpeech, mitigationPlanSpeech, projectRangeSpeech])

  return (
    <div>
      <div className="grid items-center justify-center gap-5">
        <h1
          style={{ fontSize: fonts.xl }}
          className="mt-5 flex items-center justify-center font-roboto font-bold text-blue-weg"
        >
          {translate["Gerando proposta da demanda"]?.[language] ?? "Gerando proposta da demanda"}:
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div className="grid items-center justify-center">
        <div className="grid items-center justify-start">
          <div className="grid items-center justify-center">
            <div className="flex items-center">
              <div
                style={{ fontSize: fonts.xl }}
                className="mt-5 flex items-center justify-start p-5 font-roboto font-bold"
              >
                <p>
                  {translate["Escopo do projeto"]?.[language] ?? "Escopo do projeto"}
                </p>
                <div onClick={() => setCurrentSpeechId(projectScopeSpeech.id)}>
                  <VoiceSpeech setTexto={setProjectScopeSpeech} speechId={currentSpeechId} />
                </div>
              </div>
            </div>
            <ReactQuill
              value={quillHtmlScope}
              onChange={(e) => setQuillHtmlScope(e)}
              placeholder={translate["Escreva aqui o objetivo e o escopo do projeto"]?.[language] ?? "Escreva aqui o objetivo e o escopo do projeto"}
              onBlur={saveProgress}
              modules={quillModules}
              style={{ width: "50rem", height: "10rem" }}
            />
          </div>
          <div className="grid items-center justify-center">
            <div
              style={{ fontSize: fonts.xl }}
              className="mt-10 flex items-center justify-start p-5 font-roboto font-bold"
            >
              <p>
                {translate["Não faz parte do escopo do projeto"]?.[language] ?? "Não faz parte do escopo do projeto"}
              </p>
              <div onClick={() => setCurrentSpeechId(notInScopeSpeech.id)}>
                <VoiceSpeech setTexto={setNotInScopeSpeech} speechId={currentSpeechId} />
              </div>
            </div>
            <ReactQuill
              value={quillHtmlIsNotOnScope}
              onChange={(e) => setQuillHtmlIsNotOnScope(e)}
              onBlur={saveProgress}
              placeholder={translate["Escreva aqui o que não faz parte do escopo do projeto (não deve ser gasto tempo com)"]?.[language] ?? "Escreva aqui o que não faz parte do escopo do projeto (não deve ser gasto tempo com)"}
              modules={quillModules}
              style={{ width: "50rem", height: "10rem" }}
            />
          </div>
        </div>
        <div className="mt-20">
          <h1
            style={{ fontSize: fonts.xl }}
            className="mt-5 flex items-center justify-center font-roboto font-bold text-blue-weg"
          >
            {translate["Tabela de custos"]?.[language] ?? "Tabela de custos"}:{" "}
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <table className="grid gap-20">
            <div className="grid items-center justify-center gap-5">
              <CostTable
                typeTitle={translate["Interno"]?.[language] ?? "Interno"}
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
                typeTitle={translate["Externo"]?.[language] ?? "Externo"}
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
              <p
                style={{ fontSize: fonts.xl }}
                className="ml-5 mr-8 font-roboto font-bold"
              >
                {translate["Custos totais do projeto"]?.[language] ?? "Custos totais do projeto"}
              </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                disabled
                value={ProposalUtils.sumCosts(internalCosts) + ProposalUtils.sumCosts(externalCosts)}
                aria-readonly={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      style={{ fontSize: fonts.xl }}
                      position="start"
                    >
                      R$
                    </InputAdornment>
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
                  style={{ fontSize: fonts.xl }}
                  className="
          ml-5 mr-[5.6rem] font-roboto
        "
                >
                  {translate["Total de despesas (desembolso)"]?.[language] ?? "Total de despesas (desembolso)"}
                </p>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  disabled
                  value={ProposalUtils.sumCosts(externalCosts)}
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
                  style={{ fontSize: fonts.xl }}
                  className="
          ml-5 mr-8 font-roboto
        "
                >
                  {translate["Total de despesas com custos internos"]?.[language] ?? "Total de despesas com custos internos"}
                </p>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  disabled
                  value={ProposalUtils.sumCosts(internalCosts)}
                  aria-readonly={true}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        style={{ fontSize: fonts.xl }}
                        position="start"
                      >
                        R$
                      </InputAdornment>
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
            <p style={{ fontSize: fonts.lg }} className="font-roboto font-bold">
              {translate["Payback"]?.[language] ?? "Payback"}
            </p>
            <EqualInput
              id="outlined-textarea"
              variant="outlined"
              type="number"
              multiline
              maxRows={3}
              value={payback}
              onBlur={saveProgress}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              readOnly={true}
            />
          </div>
          <div className="grid gap-16">
            <div className="grid gap-4">
              <div

                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold flex items-center"
              >
                <p>
                  {translate["Alternativas avaliadas da proposta"]?.[language]}
                </p>
                <div onClick={() => setCurrentSpeechId(proposalAlternativesSpeech.id)}>
                  <VoiceSpeech setTexto={setProposalAlternativesSpeech} speechId={currentSpeechId} />
                </div>
              </div>
              <ReactQuill
                value={quillHtmlProposalAlternatives}
                placeholder={translate["Escreva aqui as alternativas avaliadas da proposta"]?.[language] ?? "Escreva aqui as alternativas avaliadas da proposta"}
                onChange={(e) => setQuillHtmlProposalAlternatives(e)}
                onBlur={saveProgress}
                modules={quillModules}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div className="grid gap-4">
              <div
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold flex items-center"
              >
                <p>
                  {translate["Abrangência do projeto"]?.[language] ?? "Abrangência do projeto"}
                </p>
                <div onClick={() => setCurrentSpeechId(projectRangeSpeech.id)}>
                  <VoiceSpeech setTexto={setProjectRangeSpeech} speechId={currentSpeechId} />
                </div>
              </div>
              <ReactQuill
                value={quillValueProjectRange}
                placeholder={translate["Escreva aqui a abrangência do projeto, como por exemplo: quais áreas serão impactadas, etc."]?.[language] ?? "Escreva aqui a abrangência do projeto, como por exemplo: quais áreas serão impactadas, etc."}
                onChange={(e) => setQuillValueProjectRange(e)}
                onBlur={saveProgress}
                modules={quillModules}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div className="grid gap-4">
              <div
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold flex items-center"
              >
                <p>
                  {translate["Principais riscos / Plano mitigação"]?.[language] ?? "Principais riscos / Plano mitigação"}
                </p>
                <div onClick={() => setCurrentSpeechId(mitigationPlanSpeech.id)}>
                  <VoiceSpeech setTexto={setMitigationPlanSpeech} speechId={currentSpeechId} />
                </div>
              </div>
              <ReactQuill
                value={quillHtmlProposalMitigationPlan}
                placeholder={translate["Escreva aqui os principais riscos e o plano de mitigação"]?.[language] ?? "Escreva aqui os principais riscos e o plano de mitigação"}
                onChange={(e) => setQuillHtmlProposalMitigationPlan(e)}
                onBlur={saveProgress}
                modules={quillModules}
                style={{ width: "50rem", height: "10rem" }}
              />
            </div>
            <div>
              <p
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold"
              >
                {translate["Período de execução"]?.[language] ?? "Período de execução"}
              </p>
              <div className="mt-4 flex gap-10">
                <DateInput
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="dd/mm/aaaa"
                  type="date"
                  label={translate["Início:"]?.[language] ?? "Início:"}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  value={startDate}
                  helperText={translate["Data de início da execução da demanda"]?.[language] ?? "Data de início da execução da demanda"}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <DateInput
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="dd/mm/aaaa"
                  type="date"
                  label={translate["Término:"]?.[language] ?? "Término:"}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  value={endDate}
                  helperText={translate["Data de término da execução da demanda"]?.[language] ?? "Data de término da execução da demanda"}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold"
              >
                {translate["Responsável pelo negócio"]?.[language] ?? "Responsável pelo negócio"}
              </p>
              <div className="flex gap-10">
                <NameAreaInput
                  id="outlined-textarea"
                  variant="outlined"
                  type="text"
                  multiline
                  placeholder={translate["Nome"]?.[language] ?? "Nome"}
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
                  placeholder={translate["Área"]?.[language] ?? "Área"}
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
            style={{ fontSize: fonts.sm }}
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
                <p>{translate["Salvando..."]?.[language] ?? "Salvando..."}</p>
              </div>
            )) ||
              (translate["Salvar"]?.[language] ?? "Salvar")}
          </Button>
          <Button
            onClick={() => handlePutProposal(true)}
            variant="contained"
            color="primary"
            style={{ fontSize: fonts.sm }}
            sx={{
              backgroundColor: "#0071AB",
              color: "#FFFFFF",
              ml: 2,
            }}
          >
            {translate["Concluir proposta"]?.[language] ?? "Concluir proposta"}
          </Button>
        </div>
      </div>
    </div>
  );
}
