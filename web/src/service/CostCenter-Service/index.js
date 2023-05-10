import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/centro-custo`;

const getCostCenters = async () => {
  return AxiosAPI.get(url)
    .then((response) => response)
    .catch((error) => error);
};

const getCostCenterById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const createCostCenter = async (cc) => {
  return AxiosAPI.post(url, cc)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateCostCenter = async (cc) => {
  return AxiosAPI.put(url, cc)
    .then((response) => response.data)
    .catch((error) => error);
};

const deleteCostCenter = async (id) => {
  return AxiosAPI.delete(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getCostCenters,
  getCostCenterById,
  createCostCenter,
  updateCostCenter,
  deleteCostCenter,
};
