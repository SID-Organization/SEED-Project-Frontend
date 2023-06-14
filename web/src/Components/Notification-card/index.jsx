import { Badge, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

//Translation
import TranslationJson from "../../API/Translate/components/notificationCard.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { useContext, useState, useEffect } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";

//Utils
import UserUtils from "../../utils/User-Utils";

// interface NotificationCardProps {
//   name: string;
//   time: string;
//   content: string;
//   unreadNotification: boolean;
//   type: string;
// }

export default function NotificationCard(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const [user, setUser] = useState(UserUtils.getLoggedUser());

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          borderBottom: "1px solid #ababab57",
          padding: "3px",
          "&:hover": {
            backgroundColor: "#e2e2e2",
          },
        }}
      >
        <div className="ml-5 mr-5 flex justify-center font-roboto">
          <div className="flex w-[5rem] items-center">
            {props.type === "approved" ? (
              <Tooltip title={translate["Aprovação"][language] ?? "Aprovação"}>
                <CheckCircleOutlineRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2rem",
                  }}
                />
              </Tooltip>
            ) : props.type === "rejected" ? (
              <Tooltip title={translate["Rejeição"][language] ?? "Rejeição"}>
                <HighlightOffRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2rem",
                  }}
                />
              </Tooltip>
            ) : props.type === "returned" ? (
              <Tooltip title={translate["Devolução"][language] ?? "Devolução"}>
                <ReplayRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2rem",
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={translate["Edição"][language] ?? "Edição"}>
                <EditRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2rem",
                  }}
                />
              </Tooltip>
            )}
          </div>
          <div className="grid w-[13rem] p-2 items-center">
            <Tooltip
              title={
                props.name &&
                props.content &&
                (user.nomeUsuario.length + props.content.length > 71
                  ? user.nomeUsuario + props.content
                  : null)
              }
              placement="left"
            >
              <p className="text-[12px]">
                {props.name && 
                  props.content &&
                  (user.nomeUsuario.length + " " + props.content.length > 71
                    ? (user.nomeUsuario + props.content).slice(0, 70) + "..."
                    : user.nomeUsuario + " " + props.content)}
              </p>
            </Tooltip>
            <p className="text-xs font-bold text-light-blue-weg">
              {props.time}
            </p>
          </div>
          <div className="grid items-center">
            <div className="flex w-5 items-center justify-center">
              {props.unreadNotification === false ? null : (
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-dark-blue-weg text-xs  font-bold text-white">
                  {props.unreadNotification}
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
