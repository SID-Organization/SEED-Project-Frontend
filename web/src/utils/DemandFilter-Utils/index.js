const filterTypes = [
    {value: "Data de criação",      id: 0,  type: 'date',   filterBy: 'created_at'},
    {value: "Data de atualização",  id: 1,  type: 'date',   filterBy: 'updated_at'},
    {value: "Valor",                id: 2,  type: 'number', filterBy: 'value'},
    {value: "Score",                id: 3,  type: 'number', filterBy: 'score'},
    {value: "Versão",               id: 4,  type: 'number', filterBy: 'version'},
    {value: "Titulo",               id: 5,  type: 'text',   filterBy: 'tituloDemanda'},
    {value: "Status",               id: 6,  type: 'text',   filterBy: 'statusDemanda'},
    {value: "Tamanho",              id: 7,  type: 'text',   filterBy: 'tamanhoDemanda'},
    {value: "Código PPM",           id: 8,  type: 'text',   filterBy: 'codigoPPM'},
    {value: "Forum de aprovação",   id: 9,  type: 'text',   filterBy: 'forum'},
    {value: "Solicitante",          id: 10, type: 'text',   filterBy: 'nomeSolicitante'},
    {value: "Departamento",         id: 11, type: 'text',   filterBy: 'departamento'},
    {value: "Gerente",              id: 12, type: 'text',   filterBy: 'nomeGerente'},
    {value: "Analista",             id: 13, type: 'text',   filterBy: 'analyst'},
]

const filterBy = (demands, filterBy, search) => {
    const filteredDemands =  demands.filter((item) => {
        if (search.length < 3) return item;
        else if (item[filterBy].toLowerCase().includes(search.toLowerCase())) return item;
    })
    console.log("Demands filtradas", filteredDemands);
    return filteredDemands;
}

export default {
    filterBy,
    filterTypes
}