import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/secao-ti-responsavel`;

const getResponsableITSections = async () => {
    return AxiosAPI.get(url)
        .then(res => res.data)
        .catch(err => err);
};

export default {
    getResponsableITSections,
}