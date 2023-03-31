import axios from "axios";

const url = "http://localhost:8443/login";

class AuthService {
  login(user) {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      }
    };
    return axios.post(url + "/auth", user, config);
  }
}

export default new AuthService();