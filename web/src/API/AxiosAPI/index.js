import axios from "axios";

const config = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
};


const AxiosAPI = {
    post: async (url, data, contentType, responseType) => {

        let tempConfig = { ...config };

        if (contentType) tempConfig.headers["Content-Type"] = contentType;

        if (responseType) tempConfig.responseType = responseType;

        return axios.post(url, data, tempConfig)
            .then(response => response)
            .catch(error => error);
    },

    get: async (url) => {
        return axios.get(url, config)
            .then(response => response)
            .catch(error => error);
    },

    put: async (url, data, contentType) => {

        let tempConfig = { ...config };

        if (contentType) tempConfig.headers["Content-Type"] = contentType;

        return axios.put(url, data, tempConfig)
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