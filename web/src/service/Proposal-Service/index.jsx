import axios from 'axios';
import meta from 'vite';

const port = meta.env.VITE_PORT || 8080;
const protocol = meta.env.VITE_PROTOCOL || 'http';

const url = `${protocol}://localhost:${port}/sid/api/proposta`;

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