import axios from 'axios';
import meta from 'vite';

const port = meta.env.VITE_PORT || 8080;
const protocol = meta.env.VITE_PROTOCOL || 'http';

const url = `${protocol}://localhost:${port}/sid/api/pauta`;

const createPauta = async (pauta) => {
    return axios.post(url, pauta)
        .then(response => response.data);
}


export default {
    createPauta
}