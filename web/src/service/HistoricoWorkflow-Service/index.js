import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/historico-workflow`;

const getHistoricoWorkflow = async () => {
  return axios.get(url).then((response) => response.data);
};

const getHistoricoWorkflowById = async (id) => {
  return axios.get(`${url}/${id}`).then((response) => response.data);
};

const createHistoricoWorkflow = async (hw) => {
  return axios.post(url, hw).then((response) => response.data);
};

const deleteHistoricoWorkflow = async (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const updateHistoricoWorkflow = async (hw) => {
  return axios.put(url, hw).then((response) => response.data);
};

export default {
  getHistoricoWorkflow,
  getHistoricoWorkflowById,
  createHistoricoWorkflow,
  deleteHistoricoWorkflow,
  updateHistoricoWorkflow,
};
