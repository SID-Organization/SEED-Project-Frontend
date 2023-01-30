import Search from "../Search";
import MuiButton from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";

export default function SubHeaderPautas() {
  const Button = styled(MuiButton)({
    backgroundColor: "#0075B1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "10px",
    marginRight: "2rem",

    "&:hover": {
      backgroundColor: "#0075B1",
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          Propostas
        </h1>
        <div className="flex mr-10 gap-16">
          <Link to="/gerar-proposta/1">
            <Button variant="contained">
              <AddRoundedIcon />
              Criar nova proposta
            </Button>
          </Link>

          <Search />
        </div>
      </div>
    </div>
  );
}
