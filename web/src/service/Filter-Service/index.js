import AxiosAPI from "../../API/AxiosAPI";
import apiConfig from "../../API/API-config";

const url = `${apiConfig.URL}/demanda/filtrar-demanda`;

const saveFilter = async (filterName, filter, userId) => {
    const filterToSave = {
        nomeFiltro: filterName,
        filtros: filter,
        usuario: { numeroCadastroUsuario: userId },
    }

    console.log("Filter to save: ", filterToSave);

    return AxiosAPI.post(`${url}`, filterToSave)
        .then((response) => response.data)
        .catch((error) => error);
}


const getUserFilters = async (userId) => {
    return AxiosAPI.get(`${url}/${userId}`)
        .then((response) => response.data)
        .catch((error) => error);
}

const deleteFilter = async (filterId) => {
    return AxiosAPI.delete(`${url}/${filterId}`)
        .then((response) => response.data)
        .catch((error) => error);
}

export default {
    saveFilter,
    getUserFilters,
    deleteFilter,
};