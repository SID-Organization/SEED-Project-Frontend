import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/business-unity`;

const getBusinessUnity = async () => {
  return axios.get(url).then((response) => response.data);
};

const createBusinessUnity = async (bu) => {
  return axios.post(url, bu).then((response) => response.data);
};

const updateBusinessUnity = async (bu) => {
  return axios.put(url, bu).then((response) => response.data);
};

const deleteBusinessUnity = async (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const getBusinessUnityById = async (id) => {
  return axios.get(`${url}/id/${id}`).then((response) => response.data);
};

export default {
  getBusinessUnity,
  createBusinessUnity,
  updateBusinessUnity,
  deleteBusinessUnity,
  getBusinessUnityById,
};
