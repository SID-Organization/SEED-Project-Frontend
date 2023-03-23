const getLoggedUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}

const getLoggedUserId = () => {
    const user = getLoggedUser();
    return user.numeroCadastroUsuario;
}

export default {
    getLoggedUser,
    getLoggedUserId
}