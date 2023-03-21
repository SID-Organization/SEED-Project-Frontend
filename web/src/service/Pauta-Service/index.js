import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/login`;

const createPauta = async (pauta) => {
    return axios.post(url, pauta)
        .then(response => response.data);
}


export default {
    createPauta
}