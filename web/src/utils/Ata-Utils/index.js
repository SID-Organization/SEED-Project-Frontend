const isFinalDecisionValid = (finalDecision) => {
    const { propostaPropostaLog, parecerComissaoPropostaLog, consideracoesPropostaLog, tipoAtaPropostaLog } = finalDecision;
    if (propostaPropostaLog.idProposta == 0) return false;
    if (parecerComissaoPropostaLog == "") return false;
    if (consideracoesPropostaLog == "") return false;
    if (tipoAtaPropostaLog == "") return false;
    return true;
};

export default {
    isFinalDecisionValid,
};