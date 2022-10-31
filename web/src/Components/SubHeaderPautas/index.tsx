import Search from "../Search";

import MuiButton from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import MuiAddRoundedIcon from "@mui/icons-material/AddRounded";

const Button = styled(MuiButton)({
  backgroundColor: "#0075B1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  columnGap: "10px",

  "&:hover": {
    backgroundColor: "#0075B1",
  },
});

const AddRoundedIcon = styled(MuiAddRoundedIcon)({
  color: "#fff",
});

export default function SubHeaderPautas() {
  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          Pautas
        </h1>
        <div className="flex mr-10 gap-16">
          <Button variant="contained">
            <div className="flex justify-center items-center">
              <AddRoundedIcon />
            </div>
            <div className="flex justify-center items-center">Nova pauta</div>
          </Button>
          <Search />
        </div>
      </div>
    </div>
  );
}
