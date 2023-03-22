import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/centro-custo`;

const getCentroCusto = async () => {
  return axios.get(url).then((response) => response.data);
};

const getCentroCustoById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

const createCentroCusto = async (cc) => {
  return axios.post(url, cc).then((response) => response.data);
};

const updateCentroCusto = async (cc) => {
  return axios.put(url, cc).then((response) => response.data);
};

const deleteCentroCusto = async (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

export default {
  getCentroCusto,
  getCentroCustoById,
  createCentroCusto,
  updateCentroCusto,
  deleteCentroCusto,
};
