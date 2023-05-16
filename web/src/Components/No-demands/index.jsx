import Header from "../Header";

import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

import AddBoxIcon from "@mui/icons-material/AddBox";

export default function noDemands({ children }) {
  return (
    <div>
      <Header />
      <div className="grid items-center justify-center">
        <div className="grid w-full items-center justify-center">
          <div className="flex items-center justify-center">
            <FolderOffOutlinedIcon
              style={{
                fontSize: "100px",
                color: "#0075B1",
              }}
            />
          </div>
          <h1 className="flex items-center justify-center text-2xl font-semibold text-[#0075B1]">
            {children}
          </h1>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <Stack direction="row" spacing={2}>
            <Link to="/nova-demanda">
              <Button
                sx={{ color: "#0075B1", fontWeight: "bold" }}
                variant="outlined"
                startIcon={
                  <AddBoxIcon
                    style={{
                      fontSize: "35px",
                      color: "#023A67",
                    }}
                  />
                }
              >
                Criar uma demanda
              </Button>
            </Link>
          </Stack>
        </div>
      </div>
    </div>
  );
}
