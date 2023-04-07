import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/pauta`;

const createPauta = async (pauta) => {
  return axios
    .post(url, pauta)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPautas = async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPautaById = async (id) => {
  return axios
    .get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPautaProposalsById = async (id) => {
  return axios
    .get(`${url}/propostas/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  createPauta,
  getPautas,
  getPautaById,
  getPautaProposalsById,
};
