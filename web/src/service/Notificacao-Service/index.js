import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/notificacao`;

const getNotificacao = async () => {
  return axios.get(url).then((response) => response.data);
};

const getNotificacaoById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

const postNotificacao = async (notificacao) => {
  return axios.post(url, notificacao).then((response) => response.data);
};

const deleteNotificacao = async (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

export default {
  getNotificacao,
  getNotificacaoById,
  postNotificacao,
  deleteNotificacao,
};
