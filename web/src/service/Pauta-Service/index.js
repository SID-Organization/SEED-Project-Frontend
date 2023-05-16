import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/pauta`;

const createPauta = async (pauta) => {
  
  const contentType = "application/json";

  return AxiosAPI.post(url, pauta, contentType)
    .then((response) => response)
    .catch((error) => error);
};

const getPautas = async () => {
  return AxiosAPI.get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPautaById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPautaProposalsById = async (id) => {
  return AxiosAPI.get(`${url}/propostas/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  createPauta,
  getPautas,
  getPautaById,
  getPautaProposalsById,
};
