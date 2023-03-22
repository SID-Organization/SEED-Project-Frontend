import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.URL}/demanda`;

const createDemand = async (demand) => {
    return axios.post(url, demand)
        .then(response => response.data);
}

const updateDemand = async (demand) => {
    return axios.put(url, demand)
        .then(response => response.data);
}

const updateBenefitedBUs = async (demandId, updatedDemand) => {
    return axios.put(`${url}/atualiza-bus-beneficiadas/${demandId}`, updatedDemand)
        .then(response => response);
}

const updateDemandStatus = async (demandId, newStatus) => {
    const status = { statusDemanda: newStatus }
    return axios.put(`${url}/status/${demandId}`, status)
        .then(response => response);
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
    return axios.get(`${url}/id/${id}`)
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

const getDemandsByStatus = async (status) => {
    return axios.get(`${url}/statusDemanda/${status}`)
        .then(response => response.data);
}

const getDemandsByRequestorId = async (requestorId) => {
    return axios.get(`${url}/solicitante/${requestorId}`)
        .then(response => {
            console.log("Response: ", response.data)
            return response.data
        });
}

// Função auxiliar para mapear o cargo do usuário para a URL da API
function getUserRoleToURL(userRole) {
    if (userRole === "ANALISTA") return "analista";
    if (userRole === "GERENTE") return "gerente-da-area";
    if (userRole === "GESTOR_TI") return "gestor-ti";
}

const getDemandsToManage = async (userId, userRole) => {
    return axios.get(`${url}/${getUserRoleToURL(userRole)}/${userId}`)
        .then(response => response.data);
}



export default {
    createDemand,
    updateDemand,
    updateBenefitedBUs,
    updateDemandStatus,
    deleteDemand,
    getDemands,
    getDemandById,
    getDemandsTitleAndStatus,
    getDraftDemands,
    getDemandPDF,
    getDemandsByStatus,
    getDemandsByRequestorId,
    getDemandsToManage
}