import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/chat`;





const createChat = async (chat) => {
    return axios.post(url, chat)
        .then((response) => response.data);
}

export default {
    createChat
}