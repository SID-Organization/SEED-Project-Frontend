const formatCostsFromDB = (costsTable) => {
    const tbRowArr = []
    if (costsTable)
        costsTable.tabelaCustoLinha.forEach(tbRow => {
            tbRowArr.push({
                expenseProfile: tbRow.perfilDespesaTabelaCustoLinha,
                monthTimeExecution: tbRow.periodoExecucaoTabelaCusto,
                necessaryHours: tbRow.quantidadeHorasTabelaCusto,
                costHour: tbRow.valorHoraTabelaCusto,
                totalExpenseCost: tbRow.quantidadeHorasTabelaCusto * tbRow.valorHoraTabelaCusto,
            })
        })

    if (tbRowArr.length === 0) tbRowArr.push({ expenseProfile: "", monthTimeExecution: "", necessaryHours: "", costHour: "", totalExpenseCost: "" });
    return tbRowArr;
}

const formatCCPsFromDB = (costsTable) => {
    const tbRowArr = []
    if (costsTable)
        costsTable.centroCustoTabelaCusto.forEach(tbRow => {
            tbRowArr.push({
                costCenter: tbRow.centroCusto.idCentroCusto,
                percentage: tbRow.porcentagemDespesa,
            })
        })
    if (tbRowArr.length === 0) tbRowArr.push({ costCenter: "", percentage: 0 });
    return tbRowArr;
}

function formatCostsForDB(costs) {
    return costs
      .map((cost) => {
        const tempCost = {
          perfilDespesaTabelaCustoLinha: cost.expenseProfile,
          periodoExecucaoTabelaCusto: parseInt(cost.monthTimeExecution),
          valorHoraTabelaCusto: parseInt(cost.costHour),
          quantidadeHorasTabelaCusto: parseInt(cost.necessaryHours),
        };

        if (
          Object.values(tempCost).includes("") ||
          Object.values(tempCost).includes(0)
        ) {
          return null;
        }

        return tempCost;
      })
      .filter((item) => item != null);
  }

  function formatCCPsForDB(CCPS) {
    return CCPS.map((ccp) => {
      const tempCcp = {
        centroCusto: { idCentroCusto: ccp.costCenter },
        porcentagemDespesa: ccp.percentage,
      };

      if (
        tempCcp.centroCusto.idCentroCusto === "" ||
        tempCcp.porcentagemDespesa === 0
      ) {
        return null;
      }

      return tempCcp;
    }).filter((item) => item != null);
  }

const sumCosts = (costs) => {
    let sum = 0;
    costs.forEach((cost) => {
        if (cost.totalExpenseCost !== "") {
            sum += parseFloat(cost.totalExpenseCost);
        }
    });
    return sum;
}

const sumBenefits = (benefits) => {
    let sum = 0;
    benefits.forEach((benefit) => {
        if (benefit.valorBeneficio !== "") {
            sum += parseFloat(benefit.valorBeneficio);
        }
    });
    return sum;
}

const formatLogProposalsToProposals = (logProposals) => {
    return logProposals.map((logProposal) => (
        {
            idPropostaLog: logProposal.idPropostaLog,
            idProposta: logProposal.propostaPropostaLog.idProposta,
            demandaPropostaTitulo: logProposal.demandaTituloPropostaLog,
            tempoExecucaoDemanda: logProposal.demandaTempoExecucaoPropostaLog,
            valorDemanda: logProposal.demandaValorPropostaLog,
            idDemanda: logProposal.idDemanda,
        }
    ))
}

export default {
    formatCostsFromDB,
    formatCCPsFromDB,
    formatCostsForDB,
    formatCCPsForDB,
    sumCosts,
    sumBenefits,
    formatLogProposalsToProposals
}