import axios from "axios";
import apiConfig from "../../../API-config";

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/forum`;

const getForuns = async () => {
    return axios.get(url).then((response) => response.data);
};

export default {
    getForuns,
}