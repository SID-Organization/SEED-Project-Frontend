
const statusForAnalyst = {
    RASCUNHO: "RASCUNHO",
    CLASSIFICADO_PELO_ANALISTA: "ABERTA",
    ABERTA: "ABERTA",
    APROVADO_PELO_GERENTE_DA_AREA: "BACKLOG",
    PROPOSTA_EM_ELABORACAO: "ASSESMENT",
    PROPOSTA_PRONTA: "ASSESMENT",
    APROVADO_PELA_COMISSAO: "TO_DO",
    PROPOSTA_EM_EXECUCAO: "DESIGN_AND_BUILD",
    PROPOSTA_EM_SUPORTE: "SUPPORT",
    PROPOSTA_FINALIZADA: "DONE",
    CANCELADA: "CANCELLED",
    BUSINESS_CASE: "BUSINESS_CASE",
}

const statusColorForAnalyst = {
    ABERTA: "#C2BEBE",
    BACKLOG: "#696969",
    ASSESMENT: "#7EB61C",
    BUSINESS_CASE: "#8862A2",
    TO_DO: "#0076B8",
    DESIGN_AND_BUILD: "#EF8300",
    SUPPORT: "#008080",
    CANCELLED: "#C31700",
    DONE: "#00612E",
    RASCUNHO: "#D9D9D9",
}

const statusColorForRequester = {
    CANCELADA: "#C31700",
    APROVADO_PELA_COMISSAO: "#0076B8",
    CLASSIFICADO_PELO_ANALISTA: "#696969",
    ABERTA: "#C2BEBE",
    RASCUNHO: "#D9D9D9",
    APROVADO_PELO_GERENTE_DA_AREA: "#7EB61C",
    PROPOSTA_EM_ELABORACAO: "#99D6D2",
    PROPOSTA_EM_EXECUCAO: "#FFFF00",
    PROPOSTA_EM_SUPORTE: "008080",
    PROPOSTA_PRONTA: "#7AB7FF",
    PROPOSTA_FINALIZADA: "006400",
}

const statusPercentage = {
    ABERTA: 15,
    CLASSIFICADO_PELO_ANALISTA: 30,
    APROVADO_PELO_GERENTE_DA_AREA: 40,
    PROPOSTA_EM_ELABORACAO: 45,
    PROPOSTA_PRONTA: 55,
    APROVADO_PELA_COMISSAO: 65,
    PROPOSTA_EM_EXECUCAO: 75,
    PROPOSTA_EM_SUPORTE: 90,
    PROPOSTA_FINALIZADA: 100,
    CANCELADA: 0,
}

const getDemandStatusByRole = (status, role = "SOLICITANTE") => {
    if (role === "ANALISTA" || role === "GERENTE" || role === "GESTOR_TI") {
        return statusForAnalyst[status]
    }

    return status
}


const getDemandStatusColorByRole = (status, role = "SOLICITANTE") => {
    if (role === "ANALISTA" || role === "GERENTE" || role === "GESTOR_TI") {
        return statusColorForAnalyst[getDemandStatusByRole(status, role)]
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