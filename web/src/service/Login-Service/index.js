import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.LOGIN_URL}`;

const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
  };

const login = async (userID, password) => {
    return axios.post(url + "/auth",
        {
            username: parseInt(userID),
            senha: password,
        }, config)
        .then(response => response)
        .catch(error => error);
}

export default {
    login,
}
