const isFinalDecisionValid = (finalDecision) => {
    const { propostaPropostaLogDTO, parecerComissaoPropostaLogDTO, consideracoesPropostaLogDTO, tipoAtaPropostaLogDTO } = finalDecision;
    if (propostaPropostaLogDTO.idProposta == 0) return false;
    if (parecerComissaoPropostaLogDTO == "") return false;
    if (consideracoesPropostaLogDTO == "") return false;
    if (tipoAtaPropostaLogDTO == "") return false;
    return true;
};

export default {
    isFinalDecisionValid,
};