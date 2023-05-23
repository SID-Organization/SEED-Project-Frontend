import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/ata-dg`;

const getAtasDG = async () => {
    return AxiosAPI.get(url)
        .then(res => res.data)
        .catch(err => err);
}

const createAtaDG = async (idAtaDg) => {
    return AxiosAPI.post(url, idAtaDg)
        .then(res => res)
        .catch(err => err);
}

const generatePDFAtaDG = async (ataDgId) => {
    return AxiosAPI.get(`${url}/gera-pdf-ata-dg/${ataDgId}`);
}

export default {
    getAtasDG,
    createAtaDG,
    generatePDFAtaDG
}