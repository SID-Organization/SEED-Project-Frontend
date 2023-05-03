import AxiosAPI from '../../API/AxiosAPI';
import apiConfig from '../../API/API-config'

const url = `${apiConfig.LOGIN_URL}`;

const login = async (userID, password) => {
  const loginBody = {
    username: parseInt(userID),
    senha: password,
  };
  return AxiosAPI.post(`${url}/auth`, loginBody);
}

export default {
  login,
}
