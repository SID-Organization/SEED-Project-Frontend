import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import UserMessageCard from "../../../Components/Chat-components";

export default function Chat() {
  return (
    <div>
      <div className="flex h-full">
        <div className="grid">
          <div className="w-[25rem] h-[5rem] flex justify-center items-center border-black border-2">
            {/* search user here */}
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "3.5rem",
                borderRadius: "50px",
                marginLeft: "1rem",
                marginRight: "1rem",
                backgroundColor: "#F5F5F5",
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
          <div className="w-[25rem] overflow-y-scroll h-[50rem] max-h-[50rem]">
            {/* recent messages and respective users here */}
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
            <UserMessageCard />
          </div>
        </div>
        <div className="border-black border-2  h-auto">
          <div>
            <h1 className="bg-light-blue-weg p-2">BAAAAAAAAAA</h1>
          </div>
          <div>{/* chat here */}</div>
        </div>
      </div>
    </div>
  );
}
