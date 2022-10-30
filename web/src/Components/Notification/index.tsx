import React from "react";

import toast, { Toaster } from "react-hot-toast";

interface notificationMessageProps {
  message: string;
  type: "success" | "error" | "loading";
}

const NotificationMessage: React.FC<notificationMessageProps> = ({
  message,
  type,
}) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "loading") {
    toast.loading(message);
  }
  return <Toaster />;
};

export default NotificationMessage;
