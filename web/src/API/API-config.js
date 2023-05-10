const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 8443;

const URL = `${PROTOCOL}://${HOST}:${PORT}/sid/api`;

const LOGIN_URL = `${PROTOCOL}://${HOST}:${PORT}/login`;

export default {
    URL,
    LOGIN_URL,
}