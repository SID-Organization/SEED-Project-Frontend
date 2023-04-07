import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/forum`;

const getForuns = async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getForuns,
};
