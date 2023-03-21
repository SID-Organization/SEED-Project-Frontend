import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.PROTOCOL}://${apiConfig.HOST}:${apiConfig.PORT}/sid/api/login`;

const login = async (userID, password) => {
    return axios.post(url,
        {
            numeroCadastroUsuario: parseInt(userID),
            senhaUsuario: password,
        })
        .then(response => response);
}

export default {
    login,
}