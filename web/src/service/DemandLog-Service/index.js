import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/historico-workflow`;

const createDemandLog = async (nextTask, demandId, actionMade, responsableId) => {

  const newDemandLog = {
    tarefaHistoricoWorkflow: nextTask,
    demandaHistorico: { idDemanda: demandId },
    acaoFeitaHistoricoAnterior: actionMade,
    idResponsavel: { numeroCadastroUsuario: responsableId },
  };

  console.log("newDemandLog", newDemandLog)

  const contentType = "application/json";
  return AxiosAPI.post(url, newDemandLog, contentType);
};

const getDemandLogs = async (demandId) => {
  return AxiosAPI.get(`${url}/demanda/${demandId}`)
    .then(res => res)
    .catch(err => err);
};

const getDemandFirstLog = async (demandId) => {
  return getDemandLogs(demandId)
    .then(res => res.data[0])
    .catch(err => err);
};

export default {
  createDemandLog,
  getDemandLogs,
  getDemandFirstLog,
};
