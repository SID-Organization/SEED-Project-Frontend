import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/usuario`;

const disableUserFirstAccess = async (userId) => {
    return AxiosAPI.put(`${url}/tutorial/${userId}`)
        .then(res => res)
        .catch(err => err);
};


export default {
    disableUserFirstAccess
};
