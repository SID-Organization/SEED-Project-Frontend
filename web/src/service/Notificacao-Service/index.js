import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/notificacao`;

const getNotificacao = async () => {
  return AxiosAPI.get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getNotificacaoById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getNotificacaoByUsuario = async (id) => {
  return AxiosAPI.get(`${url}/usuario/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const postNotificacao = async (notificacao) => {
  return AxiosAPI.post(url, notificacao)
    .then((response) => response.data)
    .catch((error) => error);
};

const deleteNotificacao = async (id) => {
  return AxiosAPI.delete(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getNotificacao,
  getNotificacaoById,
  getNotificacaoByUsuario,
  postNotificacao,
  deleteNotificacao,
};
