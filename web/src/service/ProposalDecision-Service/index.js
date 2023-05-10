import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/decisao-proposta`;

const getProposalDecision = async () => {
  return AxiosAPI.get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

const getProposalDecisionById = async (id) => {
  return AxiosAPI.get(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const createProposalDecision = async (dp) => {
  return AxiosAPI.post(url, dp)
    .then((response) => response.data)
    .catch((error) => error);
};

const deleteProposalDecision = async (id) => {
  return AxiosAPI.delete(`${url}/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getProposalDecision,
  getProposalDecisionById,
  createProposalDecision,
  deleteProposalDecision,
};
