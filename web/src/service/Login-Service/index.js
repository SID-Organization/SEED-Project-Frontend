import axios from 'axios';
import apiConfig from '../../../API-config'

const url = `${apiConfig.URL}/login`;

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