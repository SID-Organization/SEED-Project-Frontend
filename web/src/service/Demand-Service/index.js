import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/demanda`;

const createDemand = async (demand) => {
  const contentType = "application/x-www-form-urlencoded";

  return AxiosAPI.post(url, demand, contentType)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateDemand = async (demandId, updatedDemand) => {
  return AxiosAPI.put(`${url}/${demandId}`, updatedDemand)
};

const updateBenefitedBUs = async (demandId, updatedDemand) => {
  return AxiosAPI.put(`${url}/atualiza-bus-beneficiadas/${demandId}`, updatedDemand);
};

const updateDemandStatus = async (demandId, newStatus) => {
  const status = { statusDemanda: newStatus };
  return AxiosAPI.put(`${url}/status/${demandId}`, status);
};

const deleteDemand = async (id) => {
  return AxiosAPI.delete(`${url}/${id}`);
};

const deleteListDemands = async (ids) => {
  const requestBody = {
    demandas: ids.map((id) => ({
      idDemanda: id,
    })),
  }
  return AxiosAPI.post(`${url}/delete-lista-demanda`, requestBody);
};

const deleteAllDrafts = async (userId) => {
  return AxiosAPI.delete(`${url}/deleta-rascunhos/${userId}`);
};

const getDemands = async () => {
  return AxiosAPI.get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandById = async (id) => {
  return AxiosAPI.get(`${url}/id/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsTitleAndStatus = async () => {
  return AxiosAPI.get(`${url}/titulos-id-demanda`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDraftDemands = async () => {
  return AxiosAPI.get(`${url}/rascunhos`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandPDF = async (id) => {
  return AxiosAPI.get(`${url}/pdf/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsByStatus = async (status) => {
  return AxiosAPI.get(`${url}/statusDemanda/${status}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsByRequestorId = async (requestorId) => {
  return AxiosAPI.get(`${url}/solicitante/${requestorId}`)
    .then((response) => response.data)
    .catch ((error) => error);
};

const getDraftsByRequestorId = async (requestorId) => {
  return AxiosAPI.get(`${url}/rascunho/${requestorId}`)
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
  return AxiosAPI.get(`${url}/${getUserRoleToURL(userRole)}/${userId}`)
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
  deleteListDemands,
  deleteAllDrafts,
};
