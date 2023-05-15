import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/chat`;

const createChat = async (chat) => {
  return AxiosAPI.post(url, chat)
    .then((response) => response.data)
    .catch((error) => error);
};

const getChatByUserId = async (id) => {
  return AxiosAPI.get(`${url}/usuario/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
}

const getChatMessagesByChatId = async (id) => {
  return AxiosAPI.get(`${url}/mensagem/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  createChat,
  getChatByUserId,
  getChatMessagesByChatId,
};
