
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

/**
 * #F0F8FF - Alice Blue
 * #D6EAF8 - Blue Haze
 * #AED6F1 - Blue Lagoon
 * #85C1E9 - Cornflower Blue
 * #5499C7 - Dark Powder Blue
 * #2980B9 - Ocean Blue
 * #1F618D - Denim Blue
 * #154360 - Midnight Blue
 * #0B365E - Dark Blue
 * #041F37 - Navy Blue
 */

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