import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/historico-workflow`;

const getDemandLogById = async (id) => {
    return axios.get(`${url}/demanda/${id}`)
        .then(response => response.data);
}

export default {
    getDemandLogById
}