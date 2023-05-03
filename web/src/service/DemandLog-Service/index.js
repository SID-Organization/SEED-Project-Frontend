import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/historico-workflow`;

const createDemandLog = async (demandLog) => {
  return AxiosAPI.post(url, demandLog);
};

const getDemandLogs = async (demandId) => {
  return AxiosAPI.get(`${url}/demanda/${demandId}`)
  .then(res => res.data)
  .catch(err => err);
};

const getDemandFirstLog = async (demandId) => {
  return getDemandLogs(demandId)[0];
};

export default {
  createDemandLog,
  getDemandLogs,
  getDemandFirstLog,
};
