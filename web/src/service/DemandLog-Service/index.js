import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/historico-workflow`;

const createDemandLog = async (demandLog) => {
  return AxiosAPI.post(url, demandLog);
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
