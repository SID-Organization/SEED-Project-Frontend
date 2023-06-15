const filterBy = (demands, filters) => {
    let filteredDemands;

    /**
     * Filters Template:
     * [
     *  { filterBy: 'fieldName', value: 'fieldValue', type: 'fieldType (number, text...)' }
     * ]
     */

    console.log("FILTERS", filters);

    // Faz um for pelos filtros, verificando qual deles tem valor para ser filtrado
    for (let filter of filters) {
        if ([undefined, "", 0, null].includes(filter.value)) continue;
        // Caso tiver valor, ira filtrar pelo campo
        if (!filteredDemands) filteredDemands = demands;
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

    return filteredDemands;
};

const getEmptyFilter = () => [
    { filterBy: "analistaResponsavel", value: null, type: "text" },
    { filterBy: "dataReuniaoAta", value: null, type: "date" },
    { filterBy: "horarioInicioAta", value: null, type: "time" },
    { filterBy: "horarioTerminoAta", value: null, type: "time" },
    { filterBy: "qtdPropostas", value: null, type: "number" },
    { filterBy: "nomeForumAta", value: null, type: "select" }
];

const getUpdatedFilter =
    (
        analistaResponsavel,
        dataReuniaoAta,
        horarioInicioAta,
        horarioTerminoAta,
        qtdPropostas,
        nomeForumAta
    ) => [
            { filterBy: "analistaResponsavel", value: analistaResponsavel, type: "text" },
            { filterBy: "dataReuniaoAta", value: dataReuniaoAta, type: "date" },
            { filterBy: "horarioInicioAta", value: horarioInicioAta, type: "time" },
            { filterBy: "horarioTerminoAta", value: horarioTerminoAta, type: "time" },
            { filterBy: "qtdPropostas", value: qtdPropostas, type: "number" },
            { filterBy: "nomeForumAta", value: nomeForumAta, type: "select"}
        ]


export default {
    filterBy,
    getEmptyFilter,
    getUpdatedFilter,
};
