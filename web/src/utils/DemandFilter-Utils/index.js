const filterBy = (demands, filters) => {
    let filteredDemands;

    console.log("FILTERS", filters);

    // Faz um for pelos filtros, verificando qual deles tem valor para ser filtrado
    for (let filter of filters) {
        if (filter.value == '') continue;
        console.log('Filtro', filter);
        // Caso tiver valor, ira filtrar pelo campo
        filteredDemands = demands.filter((item) => {
            if (item[filter.filterBy] == null) return false;

            // Se o tipo do campo for um número, não utiliza o toLowerCase()
            if (filter.type == "number") return item[filter.filterBy] == filter.value;
            

            // Se o tipo do campo for uma string, utiliza o toLowerCase() para filtrar
            return item[filter.filterBy].toLowerCase()
                .includes(filter.value.toLowerCase());
        })
    }

    console.log("Demands filtradas", filteredDemands);
    return filteredDemands;
}

export default {
    filterBy,
    // filterTypes
}