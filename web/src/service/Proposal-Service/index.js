import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/proposta`;

const createProposal = async (proposal) => {
  return AxiosAPI.post(url, proposal);
};

const updateProposal = async (proposal, proposalId) => {
  return AxiosAPI.put(`${url}/${proposalId}`, proposal)
    .then((response) => response)
    .catch((error) => error);
};

const getReadyProposals = async () => {
  return AxiosAPI.get(`${url}/proposta-pronta`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getProposalById = async (proposalId) => {
  return AxiosAPI.get(`${url}/${proposalId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getProposalByDemandId = async (demandId) => {
  return AxiosAPI.get(`${url}/demanda/${demandId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getProposalPDF = (proposalId) => {
  return AxiosAPI.get(`${url}/pdf/${proposalId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  createProposal,
  updateProposal,
  getReadyProposals,
  getProposalById,
  getProposalByDemandId,
  getProposalPDF,
};
