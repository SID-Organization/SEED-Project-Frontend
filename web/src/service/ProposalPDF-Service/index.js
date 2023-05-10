import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/pdf-proposta`;


const getPdfByProposalId = async (proposalId) => {
    return AxiosAPI.get(`${url}/proposta/${proposalId}`)
        .then((response) => response.data[response.data.length - 1])
        .catch((error) => error);
}

export default {
    getPdfByProposalId,
};