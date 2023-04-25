import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.URL}/pdf-demanda`;

const getPdfDemandByDemandId = async (demandId) => {
    return axios
        .get(`${url}/demanda/${demandId}`)
        .then((response) => response.data)
        .catch((error) => error);
};

export default {
    getPdfDemandByDemandId,
};