import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function Chat() {
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
            <div className="flex">
              <div>{/* user image and badge on/off here */}</div>
              <div>
                {/* username (maybe demand name) and last message here*/}
              </div>
              <div>
                {/* last time message and badge with how many messages have here */}
              </div>
            </div>
          </div>
        </div>
        <div className="border-black border-2 w-full h-[55.5rem]">
          {/* messages here */}
        </div>
      </div>
    </div>
  );
}
