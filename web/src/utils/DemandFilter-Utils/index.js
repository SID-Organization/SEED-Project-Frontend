const filterBy = (demands, filters) => {
  let filteredDemands;
  
  /**
   * Filters Template:
   * [
   *  { filterBy: 'fieldName', value: 'fieldValue', type: 'fieldType (number, text...)' }
   * ]
   */

  // Faz um for pelos filtros, verificando qual deles tem valor para ser filtrado
  for (let filter of filters) {
    if ([undefined, "", 0, null].includes(filter.value)) continue;
    // Caso tiver valor, ira filtrar pelo campo
    filteredDemands = demands.filter((item) => {
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

export default {
  filterBy,
  // filterTypes
};
