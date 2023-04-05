const filterTypes = [
    {value: "Data de criação",      id: 0, type: 'date',    filterBy: 'created_at'},
    {value: "Data de atualização",  id: 1, type: 'date',    filterBy: 'updated_at'},
    {value: "Valor",                id: 2, type: 'number',  filterBy: 'value'},
    {value: "Score",                id: 3, type: 'number',  filterBy: 'score'},
    {value: "Versão",               id: 4, type: 'number',  filterBy: 'version'},
    {value: "Titulo",               id: 5, type: 'text',    filterBy: 'tituloDemanda'},
    {value: "Solicitante",          id: 6, type: 'text',    filterBy: 'nomeSolicitante'},
    {value: "Analista",             id: 7, type: 'text',    filterBy: 'analyst'},
    {value: "Status",               id: 8, type: 'text',    filterBy: 'statusDemanda'},
]

const filterBy = (demands, filterBy, search) => {
    return demands.filter((item) => {
        if (search.length < 3) return item;
        else if (item[filterBy].toLowerCase().includes(search.toLowerCase())) return item;
    })
}

export default {
    filterBy,
    filterTypes
}