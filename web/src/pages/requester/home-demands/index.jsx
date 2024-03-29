// NÃO ESTÁ SENDO UTILIZADO

import "../../../styles/index.css";

// Components
import DemandsPage from "../../../Components/DemandsPage";
import DemandType from "../../../Components/DemandsPage/DemandType-ENUM";

import { over } from "stompjs";
import SockJs from "sockjs-client/dist/sockjs";

// Utils
import UserUtils from "../../../utils/User-Utils";
import { useEffect, useState } from "react";

export default function homeDemands() {
  /*
    Estão sendo utilizadas 3 variáveis para armazenar as demandas:
    - dbDemands: armazena as demandas que foram buscadas no banco de dados
    - demands: armazena as demandas com o histórico de workflow
    - showingDemands: armazena as demandas que serão mostradas na tela (Já filtradas ou ordenadas)
  */

  const [stompClient, setStompClient] = useState(null);
  const [notificationsReceivedByWS, setNotificationsReceivedByWS] = useState(
    []
  );

  const connect = () => {
    console.log("Conectando ao websocket");
    let Sock = new SockJs("http://localhost:8443/ws");
    let stomp = over(Sock);
    stomp.debug = false;
    setStompClient(stomp);
  };

  useEffect(() => {
    console.log("stompClient", stompClient);
    if (stompClient) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  const [userData, setUserData] = useState(UserUtils.getLoggedUser());

  const onConnected = () => {
    setUserData((prevState) => ({ ...prevState, connected: true }));
    stompClient.subscribe(
      (userData.cargoUsuario === "SOLICITANTE"
        ? "/notificacao-usuario-status/" + userData.numeroCadastroUsuario
        : null),  
      (message) => {
        console.log("Mensagem recebida: ", message);
        const notification = JSON.parse(message.body);
        handleNotification(notification);
      }
    );
  };

  const onError = (error) => {
    console.log(error);
  };

  const handleNotification = (notification) => {
    console.log("Notificação recebida: ", notification);
    setNotificationsReceivedByWS((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-around">
        <DemandsPage DemandType={DemandType.DEMAND} />
      </div>
    </div>
  );
}
