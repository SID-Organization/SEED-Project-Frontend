import DateUtils from "../Date-Utils"

const filterBy = (atas, filters) => {
    let filteredDemands = atas;
    /**
     * Filters Template:
     * [
     *  { filterBy: 'fieldName', value: 'fieldValue', type: 'fieldType (number, text...)' }
     * ]
     */
    for (let filter of filters) {

        // Filtra por intervalo de valores data
        if (filter.type == "betweenDate" && (filter.value || filter.endValue)) {
            filteredDemands = filteredDemands.filter((item) => {
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
            if (filter.type == "betweenTime" && (filter.value || filter.endValue)) {
                filteredDemands = filteredDemands.filter((item) => {

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
    { filterBy: "dataReuniaoAta", value: null, endValue: null, type: "betweenDate" },
    { filterBy: "horarioInicioAta", value: null, endValue: null, type: "betweenTime" },
    { filterBy: "qtdPropostas", value: null, type: "number" },
    { filterBy: "nomeForumAta", value: null, type: "select" }
];

const getUpdatedFilter =
    (
        analistaResponsavel,
        dataReuniaoInicio,
        dataReuniaoFim,
        horarioAtaInicio,
        horarioAtaFim,
        qtdPropostas,
        nomeForumAta
    ) => [
            { filterBy: "analistaResponsavel", value: analistaResponsavel, type: "text" },
            { filterBy: "dataReuniaoAta", value: dataReuniaoInicio, endValue: dataReuniaoFim, type: "betweenDate" },
            { filterBy: "horarioInicioAta", value: horarioAtaInicio, endValue: horarioAtaFim, type: "betweenTime" },
            { filterBy: "qtdPropostas", value: qtdPropostas, type: "number" },
            { filterBy: "nomeForumAta", value: nomeForumAta, type: "select" }
        ]


export default {
    filterBy,
    getEmptyFilter,
    getUpdatedFilter,
};
