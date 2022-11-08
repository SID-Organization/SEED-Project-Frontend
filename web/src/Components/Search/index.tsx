import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 240,
          height: 40,
        }}
        style={{
          boxShadow: "#bdbdbd 0px 1px 5px 1px",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "13px" }}
          placeholder="Procure aqui"
          inputProps={{ "aria-label": "Procure aqui" }}
        />
      </Paper>
    </div>
  );
}
