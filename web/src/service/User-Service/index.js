import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/usuario`;

const getUserById = async (userId) => {
    return AxiosAPI.get(`${url}/${userId}`)
        .then(res => res)
        .catch(err => err);
}

const getAllAnalysts = async () => {
    return AxiosAPI.get(`${url}/analistas`)
        .then(res => res)
        .catch(err => err);
}

const disableUserFirstAccess = async (userId) => {
    return AxiosAPI.put(`${url}/tutorial/${userId}`)
        .then(res => res)
        .catch(err => err);
};

export default {
    getUserById,
    getAllAnalysts,
    disableUserFirstAccess
};
