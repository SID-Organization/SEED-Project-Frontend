import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/centro-custo`;

const getCostCenter = async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getCostCenterById = async (id) => {
  return axios
    .get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const createCostCenter = async (cc) => {
  return axios
    .post(url, cc)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateCostCenter = async (cc) => {
  return axios
    .put(url, cc)
    .then((response) => response.data)
    .catch((error) => error);
};

const deleteCostCenter = async (id) => {
  return axios
    .delete(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getCostCenter,
  getCostCenterById,
  createCostCenter,
  updateCostCenter,
  deleteCostCenter,
};
