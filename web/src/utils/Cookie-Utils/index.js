import Cookies from "js-cookie";

const getUserCookie = () => {
    const user = JSON.parse(Cookies.get("user"));
    user.nomeUsuario = user.nomeUsuario.split("+").join(" ");
    user.departamentoUsuario = user.departamentoUsuario.split("+").join(" ");
    return user;
};;

const removeAllCookies = () => {
    Cookies.remove("user");
    Cookies.remove("jwt");
};

export default {
    getUserCookie,
    removeAllCookies,
};