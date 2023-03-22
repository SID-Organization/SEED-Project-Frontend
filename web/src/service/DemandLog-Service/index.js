import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/historico-workflow`;

const getDemandLogs = async (demandId) => {
    return axios.get(`${url}/demanda/${demandId}`)
        .then(response => response.data);
}

const getDemandFirstLog = async (demandId) => {
    return getDemandLogs(demandId)[0];
}

export default {
    getDemandLogs,
    getDemandFirstLog
}