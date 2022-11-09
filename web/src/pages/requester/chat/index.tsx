import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import MailIcon from "@mui/icons-material/Mail";

import userImg from "../../../assets/profile-pic.png";
import { Badge, Tooltip } from "@mui/material";

export default function Chat() {
  const userDemand = "1001 - Melhorias de desenvolvimento de software";

  return (
    <div>
      <div className="flex">
        <div className="grid">
          <div className="border-black border-2 w-[25rem] h-[6rem] flex justify-center items-center">
            {/* search user here */}
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: "50%", m: 0.5 }} orientation="vertical" />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Procure"
                inputProps={{ "aria-label": "search google maps" }}
              />
            </Paper>
          </div>
          <div className="border-black border-2 w-[25rem] h-[49.5rem]">
            {/* recent messages and respective users here */}
            <div className="flex gap-8 font-roboto border-black border-2 justify-center h-20">
              <div className="flex items-center">
                {/* user image and badge on/off here */}
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
                  <img
                    src={userImg}
                    alt="user"
                    className="w-[3.5rem] h-[3.5rem]"
                  />
                </Badge>
              </div>
              <div className="grid items-center">
                {/* username (maybe demand name) and last message here*/}
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
                {/* last time message and badge with how many messages have here */}
                <p className="font-bold text-[#000]">13:27</p>
                <div className="flex justify-center items-center">
                  <div className="bg-dark-blue-weg h-5 w-5 rounded-full flex justify-center items-center text-[#FFF] text-xs font-bold">
                    4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-black border-2 w-full h-[55.5rem]">
          {/* conversation here */}
        </div>
      </div>
    </div>
  );
}
