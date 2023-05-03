import axios from "axios";

const config = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
};


const AxiosAPI = {
    post: async (url, data, contentType) => {

        let tempConfig = config;

        if (contentType) tempConfig.headers["Content-Type"] = contentType;

        return axios.post(url, data, tempConfig)
            .then(response => response)
            .catch(error => error);
    },

    get: async (url) => {
        return axios.get(url, config)
            .then(response => response)
            .catch(error => error);
    },

    put: async (url, data) => {
        return axios.put(url, data, config)
            .then(response => response)
            .catch(error => error);
    },

    delete: async (url) => {
        return axios.delete(url, config)
            .then(response => response)
            .catch(error => error);
    }
}


export default AxiosAPI;