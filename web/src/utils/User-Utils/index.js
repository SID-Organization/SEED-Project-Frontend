import Cookie from "js-cookie";

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

const getUserCookie = () => {
  const user = Cookie.get("user");
  return user;
};

export default {
  getLoggedUser,
  getLoggedUserId,
  getUserRole,
  getUserCookie,
};
