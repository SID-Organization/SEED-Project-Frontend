
// Transform the user easier status to a more technical status (for analysts)
const statusForAnalyst = {
    RASCUNHO: "RASCUNHO",
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
}

const statusColorForRequester = {
    CANCELADA: "#C31700",
    RASCUNHO: "#D9D9D9",
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
    CANCELADA: 0,
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

export default {
    getDemandStatusByRole,
    getDemandStatusColorByRole,
    getPercentageByStatus,
}