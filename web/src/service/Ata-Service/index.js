import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/ata`;

const createAta = async (ata) => {
  return axios
    .post(url, ata, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => response)
    .catch((error) => error);
};

const getAta = async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getAtaById = async (id) => {
  return axios
    .get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  createAta,
  getAta,
  getAtaById,
};
