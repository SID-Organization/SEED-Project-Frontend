
import CookieUtils from "../Cookie-Utils"

const getLoggedUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const getLoggedUserId = () => {
  const user = getLoggedUser();
  return user.numeroCadastroUsuario;
};

const getLoggedUserRole = () => {
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

const getLoggedUserIsFirstLogin = () => {
  const configs = JSON.parse(localStorage.getItem("configs"));
  return configs.first_login;
};

const disableFirstLogin = () => {
  const configs = JSON.parse(localStorage.getItem("configs"));
  configs.first_login = false;
  localStorage.setItem("configs", JSON.stringify(configs));
}

export default {
  getLoggedUser,
  getLoggedUserId,
  getLoggedUserRole,
  logUserOut,
  getUserFromCookie,
  getLoggedUserIsFirstLogin,
  disableFirstLogin
};
