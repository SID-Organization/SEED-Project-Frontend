import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/historico-workflow`;

const createDemandLog = async (demandLog) => {
  return axios
    .post(url, demandLog)
    .then((response) => response)
    .catch((error) => error);
};

const getDemandLogs = async (demandId) => {
  return axios
    .get(`${url}/demanda/${demandId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getDemandFirstLog = async (demandId) => {
  return getDemandLogs(demandId)[0].catch((error) => error);
};

export default {
  createDemandLog,
  getDemandLogs,
  getDemandFirstLog,
};
