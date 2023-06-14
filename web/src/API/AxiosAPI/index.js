import axios from "axios";

const config = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
};


const AxiosAPI = {
    post: async (url, data, contentType) => {

        let tempConfig = { ...config };

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

    put: async (url, data, contentType) => {

        console.log("DATA AXIOS: ", data)

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