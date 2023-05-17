import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/ata`;

const createAta = async (ata) => {
  const contentType = "multipart/form-data";
  return AxiosAPI.post(url, ata, contentType);
};

const getAtas = async () => {
  return AxiosAPI.get(url);
};

const getAtaById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`)
  .then(res => res.data)
  .catch(err => err)
};

const openAtaPDF = async (ataId) => {
  // Open in new tab
  window.open(`${url}/pdf-ata/${ataId}`, "_blank");
};

export default {
  createAta,
  getAtas,
  getAtaById,
  openAtaPDF,
};
