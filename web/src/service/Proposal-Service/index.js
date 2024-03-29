import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";
import UserUtils from "../../utils/User-Utils";

const url = `${apiConfig.URL}/proposta`;

const createProposal = async (proposal) => {
  return AxiosAPI.post(url, proposal);
};

const updateProposal = async (proposal, proposalId) => {
  
  const contentType = "multipart/form-data";

  return AxiosAPI.put(`${url}/${proposalId}`, proposal, contentType)
    .then((response) => response)
    .catch((error) => error);
};

const getReadyProposals = async () => {
  return AxiosAPI.get(`${url}/proposta-pronta`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getProposalsInProgress = async () => {
  return AxiosAPI.get(`${url}/proposta-elaboracao/${UserUtils.getLoggedUserId()}`)
    .then((response) => response.data)
    .catch((error) => error);
}

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

const openProposalPDF = async (proposalId) => {
  // Open in new tab 
  window.open(`${url}/pdf-proposta/${proposalId}`, "_blank");

};

export default {
  createProposal,
  updateProposal,
  getReadyProposals,
  getProposalById,
  getProposalByDemandId,
  openProposalPDF,
  getProposalsInProgress,
};
