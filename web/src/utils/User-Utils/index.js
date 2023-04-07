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

export default {
  getLoggedUser,
  getLoggedUserId,
  getUserRole,
};
