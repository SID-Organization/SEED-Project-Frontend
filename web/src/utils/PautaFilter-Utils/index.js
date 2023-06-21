import DateUtils from "../Date-Utils"

const filterBy = (pautas, filters) => {
    let filteredDemands = pautas;
    /**
     * Filters Template:
     * [
     *  { filterBy: 'fieldName', value: 'fieldValue', type: 'fieldType (number, text...)' }
     * ]
     */
    for (let filter of filters) {

        // Filtra por intervalo de valores data
        if (filter.type == "betweenDate") {
            filteredDemands = filteredDemands.filter((item) => {
                if (!filter.value && !filter.endValue) return true;

                const startDate = DateUtils.formatFromInputToSlash(filter.value);
                const endDate = DateUtils.formatFromInputToSlash(filter.endValue);

                if (!filter.endValue) {
                    return item[filter.filterBy] >= startDate;
                }
                if (!filter.value) {
                    return item[filter.filterBy] <= endDate;
                }
                return item[filter.filterBy] >= startDate && item[filter.filterBy] <= endDate;
            });
        } else
            if (filter.type == "betweenTime") {
                filteredDemands = filteredDemands.filter((item) => {
                    if (!filter.value && !filter.endValue) return true;

                    const startTime = filter.value;
                    const endTime = filter.endValue;

                    if (!filter.endValue) {
                        return item[filter.filterBy] >= startTime;
                    }
                    if (!filter.value) {
                        return item[filter.filterBy] <= endTime;
                    }
                    return item[filter.filterBy] >= startTime && item[filter.filterBy] <= endTime;
                });


            } else {
                // Faz um for pelos filtros, verificando qual deles tem valor para ser filtrado
                if ([undefined, "", 0, null].includes(filter.value)) continue;
                // Caso tiver valor, ira filtrar pelo campo
                filteredDemands = filteredDemands.filter((item) => {
                    if (item[filter.filterBy] == null) return false;

                    // Se o tipo do campo for um número, não utiliza o toLowerCase()
                    if (filter.type == "number") return item[filter.filterBy] == filter.value;

                    // Se o tipo do campo for uma string, utiliza o toLowerCase() para filtrar
                    return item[filter.filterBy]
                        .toLowerCase()
                        .includes(filter.value.toLowerCase());
                });
            }
    }

    return filteredDemands;
};

const getEmptyFilter = () => [
    { filterBy: "analistaResponsavel", value: null, type: "text" },
    { filterBy: "dataReuniao", value: null, endValue: null, type: "betweenDate" },
    { filterBy: "horarioReuniao", value: null, endValue: null, type: "betweenTime" },
    { filterBy: "qtdPropostas", value: null, type: "number" },
    { filterBy: "nomeComissao", value: null, type: "select" }
];

const getUpdatedFilter =
    (
        analistaResponsavel,
        dataReuniaoInicio,
        dataReuniaoFim,
        horarioInicio,
        horarioFim,
        qtdPropostas,
        nomeComissao
    ) => [
            { filterBy: "analistaResponsavel", value: analistaResponsavel, type: "text" },
            { filterBy: "dataReuniao", value: dataReuniaoInicio, endValue: dataReuniaoFim, type: "betweenDate" },
            { filterBy: "horarioReuniao", value: horarioInicio, endValue: horarioFim, type: "betweenTime" },
            { filterBy: "qtdPropostas", value: qtdPropostas, type: "number" },
            { filterBy: "nomeComissao", value: nomeComissao, type: "select" }
        ]


export default {
    filterBy,
    getEmptyFilter,
    getUpdatedFilter,
};
