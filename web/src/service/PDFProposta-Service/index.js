import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/pdf-proposta`;

const gerarPDFProposta = async (proposal) => {
  return AxiosAPI.post(url, proposal)
    .then((response) => response.data)
    .catch((error) => error);
};

const getProposalPDF = async (proposalId) => {
  return AxiosAPI.get(`${url}/proposta/${proposalId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  gerarPDFProposta,
  getProposalPDF,
};
