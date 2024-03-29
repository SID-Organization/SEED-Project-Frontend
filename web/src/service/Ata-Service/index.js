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

const getAtasDG = async () => {
  return AxiosAPI.get(`${url}/atas-dg`)
  .then(res => res.data)
  .catch(err => err);
};

const getAtaById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`)
  .then(res => res.data)
  .catch(err => err);
};

const openAtaPDF = async (ataId, tipo) => {
  // Open in new tab
  window.open(`${url}/pdf-ata-${tipo}/${ataId}`, "_blank");
};

const updateProposalsLogs = async (proposalsLogs) => {
  return AxiosAPI.put(`${url}/atualiza-proposta-log`, proposalsLogs);
}

export default {
  createAta,
  getAtas,
  getAtasDG,
  getAtaById,
  openAtaPDF,
  updateProposalsLogs
};
