import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/PDF`;

const gerarPDFProposta = async (proposta) => {
  return AxiosAPI.post(url, proposta)
    .then((response) => response.data)
    .catch((error) => error);
};

const getPDFProposta = async () => {
  return AxiosAPI.get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  gerarPDFProposta,
  getPDFProposta,
};
