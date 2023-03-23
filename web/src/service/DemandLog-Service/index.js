import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.URL}/historico-workflow`;

const createDemandLog = (demandLog) => {
    return axios.post(url, demandLog).then((response) => response.data);
}

const getDemandLogs = async (demandId) => {
    return axios.get(`${url}/demanda/${demandId}`)
        .then(response => response.data);
}

const getDemandFirstLog = async (demandId) => {
    return getDemandLogs(demandId)[0];
}

export default {
    createDemandLog,
    getDemandLogs,
    getDemandFirstLog,
}