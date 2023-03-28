import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/proposta`;

const createProposal = async (proposal) => {
  return axios.post(url, proposal).then((response) => response);
};

const updateProposal = async (proposal, proposalId) => {
  return axios
    .put(`${url}/${proposalId}`, proposal)
    .then((response) => response);
};

const getReadyProposals = async () => {
  return axios.get(`${url}/proposta-pronta`).then((response) => response.data);
};

const getProposalById = async (proposalId) => {
  return axios.get(`${url}/${proposalId}`).then((response) => response.data);
};

const getProposalByDemandId = async (demandId) => {
  return axios.get(`${url}/demanda/${demandId}`)
    .then((response) => response.data);
};


const getProposalPDF = (proposalId) => {
  return `${url}/pdf-proposta/${proposalId}`;
};

export default {
  createProposal,
  updateProposal,
  getReadyProposals,
  getProposalById,
  getProposalByDemandId,
  getProposalPDF,
};
