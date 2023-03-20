import axios from 'axios';

const url = 'http://localhost:8080/sid/api/demanda';

export const createDemand = async (demand) => {
    return axios.post(url, demand)
        .then(response => response.data);
}

export const updateDemand = async (demand) => {
    return axios.put(url, demand)
        .then(response => response.data);
}

export const deleteDemand = async (id) => {
    return axios.delete(`${url}/${id}`)
        .then(response => response.data);
}

export const getDemands = async () => {
    return axios.get(url)
        .then(response => response.data);
}

export const getDemandById = async (id) => {
    return axios.get(`${url}/${id}`)
        .then(response => response.data);
}

export const getDemandsTitleAndStatus = async () => {
    return axios.get(`${url}/titulos-id-demanda`)
        .then(response => response.data);
}

export const getDraftDemands = async () => {
    return axios.get(`${url}/rascunhos`)
        .then(response => response.data);
}

export const getDemandPDF = async (id) => {
    return axios.get(`${url}/pdf/${id}`)
        .then(response => response.data);
}

export const getDemandsByStatus  = async (status) => {
    return axios.get(`${url}/statusDemanda/${status}`)
        .then(response => response.data);
}

export const getDemandsByRequestorId = async (requestorId) => {
    return axios.get(`${url}/solicitante/${requestorId}`)
        .then(response => response.data);
}
