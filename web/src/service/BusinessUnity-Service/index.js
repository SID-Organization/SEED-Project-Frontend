import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/business-unity`;

const getBusinessUnity = async () => {
  return AxiosAPI.get(url)
  .then((response) => response.data)
  .catch((error) => error);
};

const createBusinessUnity = async (bu) => {
  return AxiosAPI.post(url, bu)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateBusinessUnity = async (bu) => {
  return AxiosAPI.put(url, bu)
    .then((response) => response.data)
    .catch((error) => error);
};

const deleteBusinessUnity = async (id) => {
  return AxiosAPI.delete(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getBusinessUnityById = async (id) => {
  return AxiosAPI.get(`${url}/id/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getBusinessUnity,
  createBusinessUnity,
  updateBusinessUnity,
  deleteBusinessUnity,
  getBusinessUnityById,
};
