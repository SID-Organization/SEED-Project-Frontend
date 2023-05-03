import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/secao-ti-responsavel`;

const getResponsableITSections = async () => {
    return AxiosAPI.get(url);
};

export default {
    getResponsableITSections,
}