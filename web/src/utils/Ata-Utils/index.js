const isFinalDecisionValid = (finalDecision) => {
    const { propostaPropostaLog, parecerComissaoPropostaLog, consideracoesPropostaLog, tipoAtaPropostaLog } = finalDecision;
    if (propostaPropostaLog.idProposta == 0) return false;
    if (parecerComissaoPropostaLog == "") return false;
    if (consideracoesPropostaLog == "") return false;
    if (tipoAtaPropostaLog == "") return false;
    return true;
};

//Filter
const getEmptyFilter = () => [
    { filterBy: "idAta", filter: { type: "equal", value: { start: "", end: "" } }, type: "number" },
    { filterBy: "analistaResponsavel", filter: null, type: "text" },
    { filterBy: "dataReuniaoAta", filter: { type: "equal", value: { start: "", end: "" } }, type: "text" },
    { filterBy: "horarioReuniaoAta", filter: null, type: "text" },
    { filterBy: "qtdPropostas", filter: null, type: "number" },
    { filterBy: "forumDeAprovacao", filter: null, type: "text" },
];

const filterBy = (filter, atas) => {

}

export default {
    isFinalDecisionValid,
};