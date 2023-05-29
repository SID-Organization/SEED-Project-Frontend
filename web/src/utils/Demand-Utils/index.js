
// Transform the user easier status to a more technical status (for analysts)
const statusForAnalyst = {
    RASCUNHO: "RASCUNHO",
    EM_EDICAO: "EM_EDICAO",
    ABERTA: "ABERTA",
    CLASSIFICADO_PELO_ANALISTA: "ABERTA",
    APROVADO_PELO_GERENTE_DA_AREA: "BACKLOG",
    PROPOSTA_EM_ELABORACAO: "ASSESMENT",
    PROPOSTA_PRONTA: "ASSESMENT",
    EM_PAUTA: "ASSESMENT",
    APROVADA_EM_COMISSAO: "TO_DO",
    APROVADA_EM_DG: "TO_DO",
    PROPOSTA_EM_EXECUCAO: "DESIGN_AND_BUILD",
    PROPOSTA_EM_SUPORTE: "SUPPORT",
    PROPOSTA_FINALIZADA: "DONE",
    CANCELADA: "CANCELLED",
    BUSINESS_CASE: "BUSINESS_CASE",
}

const statusColorForAnalyst = {
    ABERTA: "#C2BEBE",
    BACKLOG: "#5499C7",
    ASSESMENT: "#2980B9",
    BUSINESS_CASE: "#8862A2",
    TO_DO: "#154360",
    DESIGN_AND_BUILD: "#EF8300",
    SUPPORT: "#008080",
    CANCELLED: "#C31700",
    DONE: "#00612E",
    RASCUNHO: "#D9D9D9",
    EM_EDICAO: "#D9D9D9",
}

const statusColorForRequester = {
    CANCELADA: "#C31700",
    RASCUNHO: "#D9D9D9",
    EM_EDICAO: "#D9D9D9",
    ABERTA: "#C2BEBE",
    CLASSIFICADO_PELO_ANALISTA: "#AED6F1",
    APROVADO_PELO_GERENTE_DA_AREA: "#5499C7",
    PROPOSTA_EM_ELABORACAO: "#2980B9",
    PROPOSTA_PRONTA: "#2980B9",
    EM_PAUTA: "#1F618D",
    APROVADA_EM_COMISSAO: "#154360",
    APROVADA_EM_DG: "#041F37",
    PROPOSTA_EM_EXECUCAO: "#FFFF00",
    PROPOSTA_EM_SUPORTE: "#008080",
    PROPOSTA_FINALIZADA: "#00612E",
}


// Control the percentage of the progress bar
const statusPercentage = {
    ABERTA: 15,
    CLASSIFICADO_PELO_ANALISTA: 30,
    APROVADO_PELO_GERENTE_DA_AREA: 40,
    PROPOSTA_EM_ELABORACAO: 45,
    PROPOSTA_PRONTA: 55,
    EM_PAUTA: 60,
    APROVADA_EM_COMISSAO: 65,
    APROVADA_EM_DG: 80,
    PROPOSTA_EM_EXECUCAO: 90,
    PROPOSTA_EM_SUPORTE: 95,
    PROPOSTA_FINALIZADA: 100,
    CANCELADA: 100,
    EM_EDICAO: 5,
    RASCUNHO: 1,
}

// Format the status to show in the demand card
const formatStatus = {
    ABERTA: "Aberta",
    CLASSIFICADO_PELO_ANALISTA: "Classificado pelo Analista",
    APROVADO_PELO_GERENTE_DA_AREA: "Aprovado pelo Gerente da Área",
    PROPOSTA_EM_ELABORACAO: "Proposta em Elaboração",
    PROPOSTA_PRONTA: "Proposta Pronta",
    EM_PAUTA: "Em Pauta",
    APROVADA_EM_COMISSAO: "Aprovada em Comissão",
    APROVADA_EM_DG: "Aprovada em DG",
    PROPOSTA_EM_EXECUCAO: "Proposta em Execução",
    PROPOSTA_EM_SUPORTE: "Proposta em Suporte",
    PROPOSTA_FINALIZADA: "Proposta Finalizada",
    CANCELADA: "Cancelada",
    RASCUNHO: "Rascunho",
    EM_EDICAO: "Em Edição",

    ASSESMENT: "Assesment",
    BACKLOG: "Backlog",
    BUSINESS_CASE: "Business Case",
    TO_DO: "To Do",
    DESIGN_AND_BUILD: "Design and Build",
    SUPPORT: "Support",
    DONE: "Done",
    CANCELLED: "Cancelled",
}

const getDemandStatusByRole = (demandStatus, role = "SOLICITANTE") => {
    let status;
    if (["ANALISTA", "GERENTE", "GESTOR_TI"].includes(role)) {
        status = formatStatus[statusForAnalyst[demandStatus]]
    } else {
        status = formatStatus[demandStatus]
    }
    return status
}

const getDemandStatusColorByRole = (status, role = "SOLICITANTE") => {
    if (["ANALISTA", "GERENTE", "GESTOR_TI"].includes(role)) {
        return statusColorForAnalyst[statusForAnalyst[status]]
    }

    return statusColorForRequester[status]
}

const getPercentageByStatus = (status) => {
    return statusPercentage[status]
}

function getBenefitCoin(coin) {
    switch (coin) {
        case "REAL":
            return "R$";
        case "DOLAR":
            return "$";
        case "EURO":
            return "€";
    }

    switch (coin) {
        case "R$":
            return "REAL";
        case "$":
            return "DOLAR";
        case "€":
            return "EURO";
        default:
            "REAL";
    }
}

function formatBenefit(benefit, benefitType, formatToCode = false) {
    let tempBenefit;
    if (!formatToCode) {
        tempBenefit = {
            moedaBeneficio: getBenefitCoin(benefit.coin),
            memoriaCalculoBeneficio: removeHTML(benefit.descriptionHTML),
            memoriaCalculoBeneficioHTML: benefit.descriptionHTML,
            valorBeneficio: benefit.value,
            tipoBeneficio: benefitType,
            idFront: benefit.idFront,
        };
        if (benefit.benefitId) tempBenefit["idBeneficio"] = benefit.benefitId;
    } else if (formatToCode) {
        tempBenefit = {
            benefitId: benefit.idBeneficio,
            value: benefit.valorBeneficio,
            coin: getBenefitCoin(benefit.moedaBeneficio),
            descriptionHTML: benefit.memoriaCalculoBeneficioHTML,
            idFront: benefit.idFront,
        };
    }
    return tempBenefit;
}

export default {
    getDemandStatusByRole,
    getDemandStatusColorByRole,
    getPercentageByStatus,
    formatBenefit
}