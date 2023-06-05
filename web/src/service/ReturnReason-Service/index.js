import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/motivo-recusa`;

const getReturnReasonByWFId = async (workFlowId) => {
    return AxiosAPI.get(`${url}/devolucao/${workFlowId}`)
        .then(res => res)
        .catch(err => err);
};


export default {
    getReturnReasonByWFId,
};
