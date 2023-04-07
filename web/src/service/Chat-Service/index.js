import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/chat`;

const createChat = async (chat) => {
  return axios
    .post(url, chat)
    .then((response) => response.data)
    .catch((error) => error);
};

const getChatByUserId = async (id) => {
  return axios
    .get(`${url}/usuario/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getChatMessagesByChatId = async (id) => {
  return axios
    .get(`${url}/mensagem/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  createChat,
  getChatByUserId,
  getChatMessagesByChatId,
};
