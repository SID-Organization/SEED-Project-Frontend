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

const sumCosts = (costs) => {
    let sum = 0;
    costs.forEach((cost) => {
        if (cost.totalExpenseCost !== "") {
            sum += parseFloat(cost.totalExpenseCost);
        }
    });
    return sum;
}

const formatLogProposalsToProposals = (logProposals) => {
    return logProposals.map((logProposal) => (
        {
            idProposta: logProposal.propostaPropostaLog.idProposta,
            demandaPropostaTitulo: logProposal.demandaTituloPropostaLog,
            tempoExecucaoDemanda: logProposal.demandaTempoExecucaoPropostaLog,
            valorDemanda: logProposal.demandaValorPropostaLog,
            idDemanda: logProposal.propostaPropostaLog.demandaProposta.idDemanda,
        }
    ))
}

export default {
    formatCostsFromDB,
    formatCCPsFromDB,
    sumCosts,
    formatLogProposalsToProposals
}