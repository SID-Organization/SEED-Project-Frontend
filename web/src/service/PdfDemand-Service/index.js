import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/pdf-demanda`;

const getPdfDemandByDemandId = async (demandId) => {
    return AxiosAPI.get(`${url}/demanda/${demandId}`)
        .then((response) => response.data[response.data.length - 1])
        .catch((error) => error);
};

export default {
    getPdfDemandByDemandId,
};