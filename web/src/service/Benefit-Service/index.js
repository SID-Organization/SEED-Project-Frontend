import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/beneficio`;

const deleteBenefit = async (id) => {
  return AxiosAPI.delete(`${url}/${id}`);
};

export default {
  deleteBenefit,
};
