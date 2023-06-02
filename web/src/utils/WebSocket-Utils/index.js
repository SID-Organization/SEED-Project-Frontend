import SockJS from "sockjs-client/dist/sockjs";
import UserUtils from "../User-Utils";
import { over } from "stompjs";

let stompClient;
let notificationList = [];

const connect = (handleNotification) => {
    const user = UserUtils.getLoggedUser();
    let Sock = new SockJS("http://localhost:8443/ws");
    stompClient = over(Sock);
    stompClient.debug = false;
    stompClient.connect({}, () => onConnected(user, handleNotification), onError);
};

const onError = (error) => {
    console.log(error);
};

let subscribeId = [];
const onConnected = (user, handleNotification) => {
    console.log("Conectado ao WebSocket");
    if (stompClient) {
        setTimeout(() => {
            if (!stompClient.subscriptions["/notificacao-usuario-status/" + user.numeroCadastroUsuario]) {
                subscribeId = [...subscribeId, stompClient.subscribe("/notificacao-usuario-status/" + user.numeroCadastroUsuario, handleNotification)];
            }
            if (!stompClient.subscriptions["/reuniao-pauta/" + user.numeroCadastroUsuario]) {
                subscribeId = [...subscribeId, stompClient.subscribe("/reuniao-pauta/" + user.numeroCadastroUsuario, handleNotification)];
            }
            console.log(stompClient.subscriptions);
            if (user.cargoUsuario === "ANALISTA") {
                const analistRoute = "/notificacao-demanda-cadastro/analista/" + user.numeroCadastroUsuario;
                if (analistRoute !== null && !stompClient.subscriptions[analistRoute]) {
                    subscribeId = [...subscribeId, stompClient.subscribe(analistRoute, handleNotification)];
                }
            }
        }, 1000);
    }
};

const disconnect = () => {
    return () => {
        console.log("Desconectando...")
        subscribeId.forEach((subscribe) => {
            subscribe.unsubscribe();
        });
    }
};


export default {
    connect,
    disconnect
};
