import userImg from "../../../assets/profile-pic.png";
import { Badge, Box, Divider, Tooltip } from "@mui/material";

/**
 * Function that returns a card with the user's name and the last message sent
 * @returns {JSX.Element} - UserMessageCard component
 */

interface UserMessageCardProps {
  name: string;
  userDemand: string;
  lastMessage: string;
  time: string;
  unreadMessages: number | boolean;
  picture?: string;
  isOnline: boolean;
}

export default function UserMessageCard(
  props: UserMessageCardProps
): JSX.Element {
  return (
    <Box
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        borderBottom: "1px solid #dadada",
        "&:hover": {
          backgroundColor: "#E5E5E5",
        },
      }}
    >
      <div className="flex font-roboto justify-center h-20">
        <div className="flex items-center w-[5rem]">
          <Tooltip title={props.isOnline ? "On-line" : "Offline"}>
            <Badge
              badgeContent={""}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: props.isOnline ? "#7EB61C" : "#a7a7a7",
                  right: ".3rem",
                  top: "1.5rem",
                  border: "2px solid currentColor",
                  padding: "0 4px",
                },
              }}
            >
              <img src={userImg} alt="user" className="w-[3.5rem] h-[3.5rem]" />
            </Badge>
          </Tooltip>
        </div>
        <div className="grid items-center w-[13rem]">
          <p className="font-bold text-base flex gap-2">
            <Tooltip title={props.name}>
              <p>
                {props.name.length > 10
                  ? props.name.slice(0, 10) + ""
                  : props.name}
              </p>
            </Tooltip>{" "}
            -{" "}
            <Tooltip title={"Demanda: " + props.userDemand} placement="top">
              <span className="font-normal text-[#888888] cursor-default">
                {" "}
                {props.userDemand.length > 9
                  ? props.userDemand.slice(0, 9) + "..."
                  : props.userDemand}
              </span>
            </Tooltip>
          </p>
          <p>
            {props.lastMessage.length > 20
              ? props.lastMessage.slice(0, 20) + "..."
              : props.lastMessage}
          </p>
        </div>
        <div className="grid items-center">
          <p className="font-normal text-[#888888]">{props.time}</p>
          <div className="flex justify-center items-center">
            {props.unreadMessages === false ? null : (
              <div className="bg-dark-blue-weg h-5 w-5 rounded-full flex justify-center items-center text-[#FFF] text-xs font-bold">
                {props.unreadMessages}
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}
