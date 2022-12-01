import { Badge, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import userImg from "../../assets/profile-pic.png";

interface NotificationCardProps {
  name: string;
  time: string;
  content: string;
  unreadNotification: boolean;
  type: string;
}

export default function NotificationCard(props: NotificationCardProps) {
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          borderBottom: "1px solid #ababab57",
          "&:hover": {
            backgroundColor: "#e2e2e2",
          },
        }}
      >
        <div className="flex font-roboto justify-center h-20 ml-5 mr-5">
          <div className="flex items-center w-[5rem]">
            {props.type === "approved" ? (
              <Tooltip title="Aprovação">
                <CheckCircleOutlineRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2.5rem",
                  }}
                />
              </Tooltip>
            ) : props.type === "rejected" ? (
              <Tooltip title="Rejeição">
                <HighlightOffRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2.5rem",
                  }}
                />
              </Tooltip>
            ) : props.type === "returned" ? (
              <Tooltip title="Devolução">
                <ReplayRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2.5rem",
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Edição">
                <EditRoundedIcon
                  sx={{
                    color: "#023A67",
                    fontSize: "2.5rem",
                  }}
                />
              </Tooltip>
            )}
          </div>
          <div className="grid items-center w-[13rem]">
            <p className="font-bold">
              {props.name.length + props.content.length > 80
                ? props.name.slice(0, 70) + "..."
                : props.name + " " + props.content}
            </p>
            <p className="text-xs text-light-blue-weg font-bold">
              {props.time}
            </p>
          </div>
          <div className="grid items-center">
            <div className="flex justify-center items-center w-5">
              {props.unreadNotification === false ? null : (
                <div className="bg-dark-blue-weg text-white h-3 w-3 rounded-full flex justify-center items-center  text-xs font-bold">
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
