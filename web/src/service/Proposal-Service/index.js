import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/proposta`;

const createProposal = async (proposal) => {
  return axios.post(url, proposal).then((response) => response);
};

const updateProposal = async (proposal, proposalId) => {
  return axios.put(`${url}/${proposalId}`, proposal).then((response) => response);
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
