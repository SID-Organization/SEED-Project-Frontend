import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/demanda`;

const createDemand = async (demand) => {
  return axios
    .post(url, demand)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateDemand = async (demandId, updatedDemand) => {
  return axios
    .put(url + "/" + demandId, updatedDemand)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateBenefitedBUs = async (demandId, updatedDemand) => {
  return axios
    .put(`${url}/atualiza-bus-beneficiadas/${demandId}`, updatedDemand)
    .then((response) => response)
    .catch((error) => error);
};

const updateDemandStatus = async (demandId, newStatus) => {
  const status = { statusDemanda: newStatus };
  return axios
    .put(`${url}/status/${demandId}`, status)
    .then((response) => response)
    .catch((error) => error);
};

const deleteDemand = async (id) => {
  return axios
    .delete(`${url}/${id}`)
    .then((response) => response)
    .catch((error) => error);
};

const getDemands = async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandById = async (id) => {
  return axios
    .get(`${url}/id/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsTitleAndStatus = async () => {
  return axios
    .get(`${url}/titulos-id-demanda`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDraftDemands = async () => {
  return axios
    .get(`${url}/rascunhos`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandPDF = async (id) => {
  return axios
    .get(`${url}/pdf/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsByStatus = async (status) => {
  return axios
    .get(`${url}/statusDemanda/${status}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsByRequestorId = async (requestorId) => {
  return axios
    .get(`${url}/solicitante/${requestorId}`)
    .then((response) => {
      console.log("Response: ", response.data);
      return response.data;
    })
    .catch((error) => error);
};

const getDraftsByRequestorId = async (requestorId) => {
  return axios
    .get(`${url}/rascunho/${requestorId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

// Função auxiliar para mapear o cargo do usuário para a URL da API
function getUserRoleToURL(userRole) {
  if (userRole === "ANALISTA") return "analista";
  if (userRole === "GERENTE") return "gerente-da-area";
  if (userRole === "GESTOR_TI") return "gestor-ti";
}

const getDemandsToManage = async (userId, userRole) => {
  return axios
    .get(`${url}/${getUserRoleToURL(userRole)}/${userId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

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
  getDemandsToManage,
  getDraftsByRequestorId,
};
