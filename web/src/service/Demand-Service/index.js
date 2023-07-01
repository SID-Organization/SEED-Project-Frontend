import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";
import UserUtils from "../../utils/User-Utils";

const url = `${apiConfig.URL}/demanda`;

const createDemand = async (demand) => {
  const contentType = "multipart/form-data";

  return AxiosAPI.post(url, demand, contentType)
    .then((response) => response.data)
    .catch((error) => error);
};

const createExcelTable = async (demandaIdList) => {
  let demandaIdListForm = new FormData();
  for (const demandaId of demandaIdList) {
    demandaIdListForm.append("demandaIdList", demandaId);
  }

  const contentType = "multipart/form-data";
  return AxiosAPI.post(`${url}/tabela-excel`, demandaIdListForm, contentType, "arraybuffer")
    .then((response) => response.data)

    .catch((error) => error);
};

const updateDemand = async (demandId, updatedDemand) => {
  const contentType = "multipart/form-data";

  return AxiosAPI.put(`${url}/${demandId}`, updatedDemand, contentType)
};

const updateBenefitedBUs = async (demandId, updatedDemand) => {
  return AxiosAPI.put(`${url}/atualiza-bus-beneficiadas/${demandId}`, updatedDemand);
};

const updateDemandStatus = async (demandId, newStatus) => {
  const status = { statusDemanda: newStatus };
  const contentType = "application/json";

  return AxiosAPI.put(`${url}/status/${demandId}`, status, contentType);
};

const updateDemandImportance = async (demandId, newImportance) => {
  const importance = { importanciaDemanda: newImportance };

  return AxiosAPI.put(`${url}/alterar-importancia/${demandId}`, importance);
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

const deleteAllDrafts = async () => {
  return AxiosAPI.delete(`${url}/deleta-rascunhos/${UserUtils.getLoggedUserId()}`);
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

const getDemandsByStatus = async (status) => {
  return AxiosAPI.get(`${url}/statusDemanda/${status}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandsByRequestorId = async (requestorId) => {
  return AxiosAPI.get(`${url}/solicitante/${requestorId}`)
    .then((response) => response)
    .catch((error) => error);
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

const getAllDemandsToManage = async () => {
  return AxiosAPI.get(`${url}/demanda-aberta`)
    .then((response) => response.data)
    .catch((error) => error);
};

const openDemandPDF = async (demandId) => {
  // Open in new tab
  window.open(`${url}/pdf-demanda/${demandId}`, "_blank");
};

const returnOrCancel = async (demandId, reason, devolution, responsableId) => {
  const requestBody = {
    motivoRecusaDemanda: reason,
    statusDemanda: devolution ? "EM_EDICAO" : "CANCELADA",
    idResponsavel: { numeroCadastroUsuario: responsableId }
  }
  return AxiosAPI.put(`${url}/devolucao-demanda/${demandId}`, requestBody)
}

// AI
const checkSimilarDemands = async (demandId) => {
  return AxiosAPI.get(`${url}/filtrar-demanda/similares/${demandId}`)
    .then(res => res.data)
    .catch(res => {
      console.warn("Erro ao checar demandas similares");
      console.warn("Res: ", res)
    })
}

export default {
  createDemand,
  updateDemand,
  updateBenefitedBUs,
  updateDemandStatus,
  updateDemandImportance,
  deleteDemand,
  getDemands,
  getDemandById,
  getDemandsTitleAndStatus,
  getDraftDemands,
  getDemandsByStatus,
  getDemandsByRequestorId,
  getDemandsToManage,
  getAllDemandsToManage,
  getDraftsByRequestorId,
  deleteListDemands,
  deleteAllDrafts,
  openDemandPDF,
  returnOrCancel,
  createExcelTable,
  checkSimilarDemands
};
