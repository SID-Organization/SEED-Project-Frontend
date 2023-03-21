import axios from 'axios';
import meta from 'vite';

const port = meta.env.VITE_PORT || 8080;
const protocol = meta.env.VITE_PROTOCOL || 'http';

console.log("PORT: ", port)

const url = `${protocol}://localhost:${port}/sid/api/demanda`;

const createDemand = async (demand) => {
    return axios.post(url, demand)
        .then(response => response.data);
}

const updateDemand = async (demand) => {
    return axios.put(url, demand)
        .then(response => response.data);
}

const deleteDemand = async (id) => {
    return axios.delete(`${url}/${id}`)
        .then(response => response.data);
}

const getDemands = async () => {
    return axios.get(url)
        .then(response => response.data);
}

const getDemandById = async (id) => {
    return axios.get(`${url}/${id}`)
        .then(response => response.data);
}

const getDemandsTitleAndStatus = async () => {
    return axios.get(`${url}/titulos-id-demanda`)
        .then(response => response.data);
}

const getDraftDemands = async () => {
    return axios.get(`${url}/rascunhos`)
        .then(response => response.data);
}

const getDemandPDF = async (id) => {
    return axios.get(`${url}/pdf/${id}`)
        .then(response => response.data);
}

const getDemandsByStatus  = async (status) => {
    return axios.get(`${url}/statusDemanda/${status}`)
        .then(response => response.data);
}

const getDemandsByRequestorId = async (requestorId) => {
    return axios.get(`${url}/solicitante/${requestorId}`)
        .then(response => response.data);
}

export default {
    createDemand,
    updateDemand,
    deleteDemand,
    getDemands,
    getDemandById,
    getDemandsTitleAndStatus,
    getDraftDemands,
    getDemandPDF,
    getDemandsByStatus,
    getDemandsByRequestorId
}