import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/decisao-proposta`;

const getDecisaoProposta = async () => {
  return axios.get(url).then((response) => response.data);
};

const getDecisaoPropostaById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

const createDecisaoProposta = async (dp) => {
  return axios.post(url, dp).then((response) => response.data);
};

const deleteDecisaoProposta = async (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

export default {
  getDecisaoProposta,
  getDecisaoPropostaById,
  createDecisaoProposta,
  deleteDecisaoProposta,
};
