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

const getEmptyFilter = () => [
  { filterBy: "nomeSolicitante", value: null, type: "text" },
  { filterBy: "nomeGerenteResponsavelDemanda", value: null, type: "text" },
  { filterBy: "nomeAnalistaResponsavel", value: null, type: "text" },
  { filterBy: "codigoPPMDemanda", value: null, type: "number" },
  { filterBy: "departamentoDemanda", value: null, type: "text" },
  { filterBy: "forumDeAprovacaoDemanda", value: null, type: "text" },
  { filterBy: "tamanhoDemanda", value: null, type: "text" },
  { filterBy: "tituloDemanda", value: null, type: "text" },
  { filterBy: "valorDemanda", value: null, type: "number" },
  { filterBy: "scoreDemanda", value: null, type: "number" },
  { filterBy: "idDemanda", value: null, type: "number" }
];

const getUpdatedFilter =
  (
    requester,
    responsibleManager,
    responsibleAnalyst,
    PPMCode,
    department,
    approvalForum,
    demandSize,
    title,
    value,
    score,
    requestNumber
  ) => [
      { filterBy: "nomeSolicitante", value: requester, type: "text" },
      { filterBy: "nomeGerenteResponsavelDemanda", value: responsibleManager, type: "text" },
      { filterBy: "nomeAnalistaResponsavel", value: responsibleAnalyst, type: "text" },
      { filterBy: "codigoPPMDemanda", value: PPMCode, type: "number" },
      { filterBy: "departamentoDemanda", value: department, type: "text" },
      { filterBy: "forumDeAprovacaoDemanda", value: approvalForum, type: "text" },
      { filterBy: "tamanhoDemanda", value: demandSize, type: "text" },
      { filterBy: "tituloDemanda", value: title, type: "text" },
      { filterBy: "valorDemanda", value: value, type: "number" },
      { filterBy: "scoreDemanda", value: score, type: "number" },
      { filterBy: "idDemanda", value: requestNumber, type: "number" },
    ]



export default {
  filterBy,
  getEmptyFilter,
  getUpdatedFilter
  // filterTypes
};
