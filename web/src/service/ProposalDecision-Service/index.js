import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/decisao-proposta`;

const getProposalDecision = async () => {
  return axios.get(url).then((response) => response.data);
};

const getProposalDecisionById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

const createProposalDecision = async (dp) => {
  return axios.post(url, dp).then((response) => response.data);
};

const deleteProposalDecision = async (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

export default {
  getProposalDecision,
  getProposalDecisionById,
  createProposalDecision,
  deleteProposalDecision,
};