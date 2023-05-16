import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/ata`;

const createAta = async (ata) => {
  const contentType = "multipart/form-data";
  return AxiosAPI.post(url, ata, contentType);
};

const getAta = async () => {
  return AxiosAPI.get(url);
};

const getAtaById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`);
};

export default {
  createAta,
  getAta,
  getAtaById,
};
