import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/demanda/quantidade/status`;

const predictUrl = "http://127.0.0.1:5000/demandas/prever";

const getGraphData = async () => {
  return AxiosAPI.get(`${url}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPredictedGraphData = async () => {
  return AxiosAPI.get(`${predictUrl}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getGraphData,
  getPredictedGraphData,
};
