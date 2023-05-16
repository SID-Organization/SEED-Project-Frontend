import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/comissao`;

const getForuns = async () => {
  return AxiosAPI.get(url)
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  getForuns,
};
