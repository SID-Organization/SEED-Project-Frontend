import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/beneficio`;

const deleteBenefit = async (id) => {
  return axios
    .delete(`${url}/${id}`)
    .then((response) => response)
    .catch((error) => error);
};

export default {
  deleteBenefit,
};
