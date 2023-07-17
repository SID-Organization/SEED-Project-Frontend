import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// Services
import ProposalService from "../../../../service/Proposal-Service";
import FontSizeUtils from "../../../../utils/FontSize-Utils";

//Components
import CostTable from "../../../../Components/Center-cost-components/Cost-table";
import CostCenterPayers from "../../../../Components/Center-cost-components/Cost-center-payers";

// Utils
import DateUtils from "../../../../utils/Date-Utils";
import ProposalUtils from "../../../../utils/Proposal-Utils";

//Translation
import TranslationJson from "../../../../API/Translate/pages/analista/proposalDetailsViewProposal.json";
import { TranslateContext } from "../../../../contexts/translate/index.jsx";
import CurrencyUtils from "../../../../utils/Currency-Utils";

export default function ViewProposal() {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [proposal, setProposal] = useState("");
  const [getProposalDetails, setGetProposalDetails] = useState();
  const [internalCosts, setInternalCosts] = useState([]);
  const [externalCosts, setExternalCosts] = useState([]);

  const [internalCostCenterPayers, setInternalCostCenterPayers] = useState([]);
  const [externalCostCenterPayers, setExternalCostCenterPayers] = useState([]);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const params = useParams();
  let demandId = params.idDemanda;

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    ProposalService.getProposalByDemandId(demandId).then((proposal) => {
      const lastProposal = proposal[proposal.length - 1];
      console.log("PRsfdsOPOSAL", lastProposal);
      setProposal(lastProposal);
      return lastProposal.idProposta;
    });
  }, []);

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
    }
  }, [proposal]);

  const MyDivider = () => {
    return <div className="h-[3px] w-6 bg-light-blue-weg" />;
  };

  return (
    <div>
      <div>
        <div className="grid gap-5">
          <div className="grid items-center gap-1">
            <h1
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              {translate["Escopo do projeto"]?.[language] ??
                "Escopo do projeto"}
              :
            </h1>
            <p
              style={{ fontSize: fonts.base }}
              className="whitespace-pre-wrap break-all pr-10 font-roboto font-normal"
            >
              {proposal && proposal.escopoProposta}
            </p>
          </div>
          <div className="grid items-center gap-1">
            <h1
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              {translate["Não faz parte do escopo do projeto"]?.[language] ??
                "Não faz parte do escopo do projeto"}
              :
            </h1>
            <p
              style={{ fontSize: fonts.base }}
              className="whitespace-pre-wrap break-all pr-10 font-roboto font-normal"
            >
              {proposal && proposal.escopoProposta}
            </p>
          </div>
          <div className="grid items-center">
            <h1
              style={{ fontSize: fonts.base }}
              className="flex font-roboto font-bold text-blue-weg"
            >
              {translate["Tabela de custos"]?.[language] ?? "Tabela de custos"}
            </h1>
            <div className="grid items-center gap-9">
              <div className="grid items-center gap-6">
                <CostTable
                  typeTitle={translate["Interno"]?.[language] ?? "Interno"}
                  costs={internalCosts}
                  setCosts={setInternalCosts}
                  page="viewProposal"
                />
                <CostCenterPayers
                  typeTitle="interno"
                  totalCostCenterPayers={internalCostCenterPayers}
                  setTotalCostCenterPayers={setInternalCostCenterPayers}
                  page="viewProposal"
                />
              </div>
              <div className="grid items-center gap-6">
                <CostTable
                  typeTitle={translate["Externo"]?.[language] ?? "Externo"}
                  costs={externalCosts}
                  setCosts={setExternalCosts}
                  page="viewProposal"
                />
                <CostCenterPayers
                  typeTitle="externo"
                  totalCostCenterPayers={externalCostCenterPayers}
                  setTotalCostCenterPayers={setExternalCostCenterPayers}
                  page="viewProposal"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-10 grid items-center">
            <div className="h-[3rem] w-[40rem] border-2 border-b-0 border-dashed border-blue-weg">
              <div className="flex h-full items-center justify-start">
                <p
                  style={{ fontSize: fonts.base }}
                  className="ml-5 mr-3 font-roboto font-bold"
                >
                  {translate["Custos totais do projeto"]?.[language] ??
                    "Custos totais do projeto"}
                  :
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {proposal &&
                    CurrencyUtils.formatCurrency(
                      proposal.custosTotaisDoProjeto
                    )}
                </p>
              </div>
            </div>
            <div className="h-[6rem] w-[40rem] border-2 border-dashed border-blue-weg">
              <div className="grid h-full items-center justify-start">
                <div className="flex h-full items-center justify-start">
                  <p
                    style={{ fontSize: fonts.base }}
                    className=" ml-5 mr-3 font-roboto"
                  >
                    {translate["Total de despesas (desembolso)"]?.[language] ??
                      "Total de despesas (desembolso)"}
                    :
                  </p>
                  <p
                    style={{ fontSize: fonts.base }}
                    className="font-roboto font-bold text-blue-weg"
                  >
                    {proposal &&
                      CurrencyUtils.formatCurrency(
                        proposal.custosExternosDoProjeto
                      )}
                  </p>
                </div>
                <div className="flex h-full items-center justify-start">
                  <p
                    style={{ fontSize: fonts.base }}
                    className="ml-5 mr-3 font-roboto"
                  >
                    {translate["Total de despesas com custos internos"]?.[
                      language
                    ] ?? "Total de despesas com custos internos"}
                  </p>
                  <p
                    style={{ fontSize: fonts.base }}
                    className="font-roboto font-bold text-blue-weg"
                  >
                    {proposal &&
                      CurrencyUtils.formatCurrency(
                        proposal.custosInternosDoProjeto
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-5">
          <div className="flex items-center gap-1">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              {translate["Payback"]?.[language]}:
            </p>
            <p style={{ fontSize: fonts.base }} className="font-roboto">
              {proposal && proposal.paybackProposta?.toFixed(2)}
            </p>
          </div>
          <div>
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              {translate["Período de execução"]?.[language] ??
                "Período de execução"}
              :
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {translate["Início"]?.[language] ?? "Início"}:
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto text-blue-weg"
                >
                  {proposal &&
                    DateUtils.formatDate(
                      proposal.periodoExecucaoInicioProposta
                    )}
                </p>
              </div>
              <MyDivider />
              <div className="flex items-center gap-1">
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {translate["Término"]?.[language] ?? "Término"}:
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto text-blue-weg"
                >
                  {proposal &&
                    DateUtils.formatDate(proposal.periodoExecucaoFimProposta)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              {translate["Responsável pelo negócio"]?.[language] ??
                "Responsável pelo negócio"}
              :
            </p>
            <div className="flex items-center gap-2">
              <p style={{ fontSize: fonts.base }} className="font-roboto">
                {/* {proposal &&
                proposal.nomeResponsavelNegocio > 0
                  ? proposal.nomeResponsavelNegocio
                  : "Não informado"} */}
                {proposal && proposal.nomeResponsavelNegocio}
              </p>
              <MyDivider />
              <p
                style={{ fontSize: fonts.base }}
                className="font-roboto text-[#6e6e6e]"
              >
                {/* {proposal &&
                proposal.areaResponsavelNegocio > 0
                  ? proposal.areaResponsavelNegocio
                  : "Não informado"} */}
                {proposal && proposal.areaResponsavelNegocio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
