import userImg from "../../assets/profile-pic.png";
import { Badge, Box, Divider, Tooltip } from "@mui/material";

/**
 * Function that returns a card with the user's name and the last message sent
 * @returns {JSX.Element} - UserMessageCard component
 */

export default function UserMessageCard(): JSX.Element {
  const userDemand = "1001 - Melhorias de desenvolvimento de software";
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
      <div className="flex gap-8 font-roboto justify-center h-20">
        <div className="flex items-center">
          <Badge
            badgeContent={""}
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#7EB61C",
                right: ".3rem",
                top: "1.5rem",
                border: "2px solid currentColor",
                padding: "0 4px",
              },
            }}
          >
            <img src={userImg} alt="user" className="w-[3.5rem] h-[3.5rem]" />
          </Badge>
        </div>
        <div className="grid items-center">
          <p className="font-bold text-base">
            Henrique Cole -{" "}
            <Tooltip title={userDemand} placement="top">
              <span className="font-normal text-[#888888] cursor-default">
                {" "}
                {userDemand.length > 10
                  ? userDemand.slice(0, 10) + "..."
                  : userDemand}
              </span>
            </Tooltip>
          </p>
          <p>Bom dia!</p>
        </div>
        <div className="grid items-center">
          <p className="font-normal text-[#888888]">10:27</p>
          <div className="flex justify-center items-center">
            <div className="bg-dark-blue-weg h-5 w-5 rounded-full flex justify-center items-center text-[#FFF] text-xs font-bold">
              4
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
