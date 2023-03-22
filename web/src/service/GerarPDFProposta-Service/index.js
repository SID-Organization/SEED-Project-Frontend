import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/PDF`;

const gerarPDFProposta = async (proposta) => {
  return axios.post(url, proposta).then((response) => response.data);
};

const getPDFProposta = async () => {
  return axios.get(url).then((response) => response.data);
};

export default {
  gerarPDFProposta,
  getPDFProposta,
};
