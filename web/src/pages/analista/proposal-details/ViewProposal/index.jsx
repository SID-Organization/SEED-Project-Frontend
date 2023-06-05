import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Services
import ProposalService from "../../../../service/Proposal-Service";
import FontSizeUtils from "../../../../utils/FontSize-Utils";

//Components
import CostTable from "../../../../Components/Center-cost-components/Cost-table";
import CostCenterPayers from "../../../../Components/Center-cost-components/Cost-center-payers";

// Utils
import DateUtils from "../../../../utils/Date-Utils";
import ProposalUtils from "../../../../utils/Proposal-Utils";

export default function ViewProposal() {
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
    if (params.idProposta) {
      ProposalService.getProposalById(params.idProposta).then((proposal) => {
        setGetProposalDetails(proposal);
      });
    }
  }, []);

  useEffect(() => {
    ProposalService.getProposalByDemandId(demandId).then((proposal) => {
      const lastProposal = proposal[proposal.length - 1];
      console.log("PROPOSAL", lastProposal);
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
              Escopo do projeto:
            </h1>
            <p
              style={{ fontSize: fonts.base }}
              className="whitespace-pre-wrap break-all pr-10 font-roboto font-normal"
            >
              {getProposalDetails && getProposalDetails.escopoProposta} asd
            </p>
          </div>
          <div className="grid items-center gap-1">
            <h1
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              Não faz parte do escopo do projeto:
            </h1>
            <p
              style={{ fontSize: fonts.base }}
              className="whitespace-pre-wrap break-all pr-10 font-roboto font-normal"
            >
              {getProposalDetails && getProposalDetails.escopoProposta}asdsa
            </p>
          </div>
          <div className="grid items-center">
            <h1
              style={{ fontSize: fonts.base }}
              className="flex font-roboto font-bold text-blue-weg"
            >
              Tabela de custos
            </h1>
            <div className="grid items-center gap-9">
              <div className="grid items-center gap-6">
                <CostTable
                  typeTitle="Interno"
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
                  typeTitle="Externo"
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
            <div className="h-[3rem] w-[25rem] border-2 border-b-0 border-dashed border-blue-weg">
              <div className="flex h-full items-center justify-start">
                <p
                  style={{ fontSize: fonts.base }}
                  className="ml-5 mr-3 font-roboto font-bold"
                >
                  Custos totais do projeto:
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  R${" "}
                  {getProposalDetails &&
                    getProposalDetails.custosTotaisDoProjeto}
                </p>
              </div>
            </div>
            <div className="h-[6rem] w-[25rem] border-2 border-dashed border-blue-weg">
              <div className="grid h-full items-center justify-start">
                <div className="flex h-full items-center justify-start">
                  <p
                    style={{ fontSize: fonts.base }}
                    className=" ml-5 mr-3 font-roboto"
                  >
                    Total de despesas (desembolso):
                  </p>
                  <p
                    style={{ fontSize: fonts.base }}
                    className="font-roboto font-bold text-blue-weg"
                  >
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosExternosDoProjeto}
                  </p>
                </div>
                <div className="flex h-full items-center justify-start">
                  <p
                    style={{ fontSize: fonts.base }}
                    className="ml-5 mr-3 font-roboto"
                  >
                    Total de despesas com custos internos
                  </p>
                  <p
                    style={{ fontSize: fonts.base }}
                    className="font-roboto font-bold text-blue-weg"
                  >
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosInternosDoProjeto}
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
              Payback:
            </p>
            <p style={{ fontSize: fonts.base }} className="font-roboto">
              {getProposalDetails && getProposalDetails.paybackProposta} 223
            </p>
          </div>
          <div>
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              Período de execução:
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  Início:
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto text-blue-weg"
                >
                  {getProposalDetails &&
                    DateUtils.formatDate(
                      getProposalDetails.periodoExecucaoInicioProposta
                    )}
                </p>
              </div>
              <MyDivider />
              <div className="flex items-center gap-1">
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  Término:
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto text-blue-weg"
                >
                  {getProposalDetails &&
                    DateUtils.formatDate(
                      getProposalDetails.periodoExecucaoFimProposta
                    )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              Responsável pelo negócio:
            </p>
            <div className="flex items-center gap-2">
              <p style={{ fontSize: fonts.base }} className="font-roboto">
                {/* {getProposalDetails &&
                getProposalDetails.nomeResponsavelNegocio > 0
                  ? getProposalDetails.nomeResponsavelNegocio
                  : "Não informado"} */}
                Henrique Cole
              </p>
              <MyDivider />
              <p
                style={{ fontSize: fonts.base }}
                className="font-roboto text-[#6e6e6e]"
              >
                {/* {getProposalDetails &&
                getProposalDetails.areaResponsavelNegocio > 0
                  ? getProposalDetails.areaResponsavelNegocio
                  : "Não informado"} */}
                WEG TI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
