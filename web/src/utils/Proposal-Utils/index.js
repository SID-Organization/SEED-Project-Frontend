const formatCostsFromDB = (costsTable) => {
    const tbRowArr = []
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

export default {
    formatCostsFromDB,
    formatCCPsFromDB,
    sumCosts
}