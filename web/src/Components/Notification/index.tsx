import React from "react";

import toast, { Toaster } from "react-hot-toast";

const notifyCreateDemandSuccess = () =>
  toast.success("Demanda criada com sucesso!");

const notifyErrorCreatingDemand = () => toast.error("Erro ao criar demanda!");

const notifyEditEnabledOn = () => toast("Agora você pode editar os campos!");

const notifyEditEnabledOff = () =>
  toast.success("Alterações salvas com sucesso!");

const notifyDemandAccepted = () => toast.success("Demanda aceita com sucesso!");

const notifyDemandRefused = () =>
  toast.success("Demanda recusada com sucesso!");

const notifyDemandReturned = () =>
  toast.success("Demanda devolvida com sucesso!");

const notifyDemandClosed = () => toast.success("Demanda fechada com sucesso!");

const notifyDemandDeleted = () =>
  toast.success("Demanda excluída com sucesso!");

interface NotificationProps {
  type:
    | "createDemandSuccess"
    | "errorCreatingDemand"
    | "editEnabledOn"
    | "editEnabledOff"
    | "demandAccepted"
    | "demandRefused"
    | "demandReturned"
    | "demandClosed"
    | "demandDeleted";
}

const Notification: React.FC<NotificationProps> = ({ type }) => {
  switch (type) {
    case "createDemandSuccess":
      notifyCreateDemandSuccess();
      break;
    case "errorCreatingDemand":
      notifyErrorCreatingDemand();
      break;
    case "editEnabledOn":
      notifyEditEnabledOn();
      break;
    case "editEnabledOff":
      notifyEditEnabledOff();
      break;
    case "demandAccepted":
      notifyDemandAccepted();
      break;
    case "demandRefused":
      notifyDemandRefused();
      break;
    case "demandReturned":
      notifyDemandReturned();
      break;
    case "demandClosed":
      notifyDemandClosed();
      break;
    case "demandDeleted":
      notifyDemandDeleted();
      break;
    default:
      break;
  }

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Notification;
