import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import { useState, useEffect } from "react";

interface ISearchInputProps {
  search: string | Date | number;
  setSearch: (search: string | Date | number) => void;
}

export default function Search(props: ISearchInputProps) {


  useEffect(() => {
    console.log("Search input", props.search)
  }, [props.search])

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
          onChange={(e) => props.setSearch(e.target.value as string)}
          value={props.search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </Paper>
    </div>
  );
}
