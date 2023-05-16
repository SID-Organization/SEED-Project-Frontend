import Cookies from "js-cookie";

const getUserCookie = () => {
  const user = JSON.parse(Cookies.get("user"));
  console.log(user);
  user.nomeUsuario = user.nomeUsuario.split("+").join(" ");
  user.departamentoUsuario = user.departamentoUsuario.nomeBusinessUnity
    .split("+")
    .join(" ");
  return user;
};

const removeAllCookies = () => {
  Cookies.remove("user");
  Cookies.remove("jwt");
};

export default {
  getUserCookie,
  removeAllCookies,
};
