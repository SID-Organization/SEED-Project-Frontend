import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/login`;

const createPauta = async (pauta) => {
  return axios.post(url, pauta).then((response) => response.data);
};

const getPauta = async () => {
  return axios.get(url).then((response) => response.data);
};

const getPautaById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

export default {
  createPauta,
  getPauta,
  getPautaById,
};
