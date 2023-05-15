import userImg from "../../../assets/profile-pic.png";
import { Badge, Box, Divider, Tooltip } from "@mui/material";

/**
 * Function that returns a card with the user's name and the last message sent
 * @returns {JSX.Element} - UserMessageCard component
 */

export default function UserMessageCard(props) {
  return (
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
      <div className="flex h-20 justify-center font-roboto">
        <div className="flex w-[5rem] items-center">
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
              <img
                src={
                  props.picture
                    ? "data:image/png;base64," + props.picture
                    : userImg
                }
                alt="user"
                className="h-[3.5rem] w-[3.5rem] rounded-full"
              />
            </Badge>
          </Tooltip>
        </div>
        <div className="grid w-[13rem] items-center">
          <Tooltip
            title={props.name + " • Demanda - " + props.userDemand}
            placement="top-start"
          >
            <p className="flex gap-2 text-base font-bold">
              <span>
                {props.name && props.name.length > 10
                  ? props.name.slice(0, 10) + ""
                  : props.name}
              </span>{" "}
              -{" "}
              <span className="cursor-default font-normal text-[#9c9c9c]">
                {" "}
                {props.userDemand && props.userDemand.length > 9
                  ? props.userDemand.slice(0, 9) + "..."
                  : props.userDemand}
              </span>
            </p>
          </Tooltip>
          <p>
            {props.lastMessage ? (
              props.lastMessage.length > 20 ? (
                props.lastMessage.slice(0, 20) + "..  ."
              ) : (
                props.lastMessage
              )
            ) : (
              <>
                <span className="font-bold italic">Chat iniciado!</span>
              </>
            )}
          </p>
        </div>
        <div className="grid items-center">
          <p className="font-normal text-[#9c9c9c]">
            {props.time ? props.time : <span className="m-5"></span>}
          </p>
          <div className="flex items-center justify-center">
            {props.unreadMessages === false ? null : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-dark-blue-weg text-xs  font-bold text-white">
                {props.unreadMessages}
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}
