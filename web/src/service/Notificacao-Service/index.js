import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/notificacao`;

const getNotificacao = async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getNotificacaoById = async (id) => {
  return axios
    .get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const postNotificacao = async (notificacao) => {
  return axios
    .post(url, notificacao)
    .then((response) => response.data)
    .catch((error) => error);
};

const deleteNotificacao = async (id) => {
  return axios
    .delete(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getNotificacao,
  getNotificacaoById,
  postNotificacao,
  deleteNotificacao,
};
