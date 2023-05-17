//React
import { Link } from "react-router-dom";

//Components
import Header from "../Header";

//MUI
import MuiFolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import MuiButton from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MuiAddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";

const Button = styled(MuiButton)(() => ({
  color: "#0075B1",
  fontWeight: "bold",
}));

const AddBoxIcon = styled(MuiAddBoxIcon)(({ theme }) => ({
  fontSize: "35px",
  color: "#023A67",
  // Adicione a regra de estilo para ajustar o tamanho do ícone
  "& svg": {
    fontSize: "35px",
  },
}));

const FolderOffOutlinedIcon = styled(MuiFolderOffOutlinedIcon)(() => ({
  fontSize: "100px",
  color: "#0075B1",
}));

export default function noContent(props) {
  return (
    <div>
      <Header />
      <div className="grid items-center justify-center">
        <div className="grid w-full items-center justify-center">
          <div className="flex items-center justify-center">
            <FolderOffOutlinedIcon />
          </div>
          <h1 className="flex items-center justify-center text-2xl font-semibold text-[#0075B1]">
            {props.children}
          </h1>
        </div>
        {props.isManager && (
          <div className="mt-16 flex items-center justify-center">
            <Link to="/nova-demanda">
              <Button variant="outlined" startIcon={<AddBoxIcon />}>
                Crie uma demanda
              </Button>
            </Link>
          </div>
        )}
        {props.isPauta && (
          <div className="mt-16 flex items-center justify-center">
            <Button
              variant="outlined"
              startIcon={<AddBoxIcon />}
              onClick={props.onButtonClick}
            >
              Crie uma pauta
            </Button>
          </div>
        )}
        {props.isProposal && (
          <div className="mt-16 flex items-center justify-center">
            <Button variant="outlined" startIcon={<AddBoxIcon />}>
              Crie uma proposta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
