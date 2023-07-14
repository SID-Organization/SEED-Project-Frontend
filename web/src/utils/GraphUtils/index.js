function getGraphMonthsTitleByInterval(timeInterval) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth());
    const formattedCurrDate = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric', });

    const lastDate = currentDate.setMonth(currentDate.getMonth() - timeInterval);
    const formattedLastDate = new Date(lastDate).toLocaleString('pt-BR', { month: 'long', year: 'numeric', });

    const currDateText = formattedCurrDate.charAt(0).toUpperCase() + formattedCurrDate.slice(1);
    const lastDateText = formattedLastDate.charAt(0).toUpperCase() + formattedLastDate.slice(1);

    if (timeInterval == "1") {
        return `${currDateText} (Último mês)`
    } else {
        return `${lastDateText}  -  ${currDateText}   (Últimos ${timeInterval} meses)`
    }
}

function prepareDataForGraph(status, rawData) {
    const preparedData = []
    status.forEach(labelStatus => {
        const filteredData = rawData.find(item => item.status == labelStatus)
        if (filteredData) {
            preparedData.push(filteredData)
        } else {
            preparedData.push({ status: labelStatus, dados: [] })
        }
    })
    return preparedData;
}

export default {
    getGraphMonthsTitleByInterval,
    prepareDataForGraph
}