import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Filter from "../Filter";

import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GridOnIcon from "@mui/icons-material/GridOn";

import "../../styles/index.css";

export default function subHeader({
  children,
  isListFormat,
  setIsListFormat,
}: any) {
  return (
    <div className="mb-10">
      <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
          {children}
        </h1>
        <Filter />
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

        <div
          className="cursor-pointer"
          onClick={() => setIsListFormat(!isListFormat)}
        >
          {isListFormat ? (
            <GridOnIcon
              sx={{
                fontSize: "30px",
                color: "#0075B1",
              }}
            />
          ) : (
            <ListAltIcon
              sx={{
                fontSize: "30px",
                color: "#0075B1",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
