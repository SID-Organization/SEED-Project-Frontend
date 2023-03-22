import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/proposta`;

const createProposal = async (proposal) => {
  return axios.post(url, proposal).then((response) => response);
};

const updateProposal = async (proposal) => {
  return axios.put(url, proposal).then((response) => response.data);
};

const getReadyProposals = async () => {
  return axios.get(`${url}/proposta-pronta`).then((response) => response.data);
};

const getProposalsByPautaId = async (id) => {
  return axios
    .get(`${url}/pauta/propostas/${id}`)
    .then((response) => response.data);
};

export default {
  createProposal,
  updateProposal,
  getReadyProposals,
  getProposalsByPautaId,
};
