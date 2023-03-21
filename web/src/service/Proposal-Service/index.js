import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/login`;

const createProposal = async (proposal) => {
    return axios.post(url, proposal)
        .then(response => response.data);
}

const updateProposal = async (proposal) => {
    return axios.put(url, proposal)
        .then(response => response.data);
}

const getReadyProposals = async () => {
    return axios.get(`${url}/propotas-prontas`)
        .then(response => response.data);
}

export default {
    createProposal,
    updateProposal,
    getReadyProposals
}