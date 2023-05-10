
import CookieUtils from "../Cookie-Utils"

const getLoggedUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const getLoggedUserId = () => {
  const user = getLoggedUser();
  return user.numeroCadastroUsuario;
};

const getUserRole = () => {
  const user = getLoggedUser();
  return user.cargoUsuario;
};

const logUserOut = () => {
  localStorage.removeItem("user");
  CookieUtils.removeAllCookies();
};

const getUserFromCookie = () => {
  const user = CookieUtils.getUserCookie();
  return user;
};

export default {
  getLoggedUser,
  getLoggedUserId,
  getUserRole,
  logUserOut,
  getUserFromCookie,
};
