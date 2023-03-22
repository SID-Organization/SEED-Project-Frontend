import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/ata`;

const createAta = async (ata) => {
  return axios.post(url, ata).then((response) => response.data);
};

const getAta = async () => {
  return axios.get(url).then((response) => response.data);
};

const getAtaById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

export default {
  createAta,
  getAta,
  getAtaById,
};
