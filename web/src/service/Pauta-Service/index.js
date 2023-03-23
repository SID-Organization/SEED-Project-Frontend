import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/pauta`;

const createPauta = async (pauta) => {
  return axios.post(url, pauta).then((response) => response.data);
};

const getPautas = async () => {
  return axios.get(url).then((response) => response.data);
};

const getPautaById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

export default {
  createPauta,
  getPautas,
  getPautaById,
};
