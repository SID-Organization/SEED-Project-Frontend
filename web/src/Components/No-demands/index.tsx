import Header from "../Header";

import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

import AddBoxIcon from "@mui/icons-material/AddBox";

export default function noDemands({ children }: any) {
  return (
    <div>
      <Header />
      <div
        className="
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
      >
        <div className="grid justify-center items-center">
          <div className="grid items-center justify-center w-full">
            <div className="flex justify-center items-center">
              <FolderOffOutlinedIcon
                style={{
                  fontSize: "100px",
                  color: "#0075B1",
                }}
              />
            </div>
            <h1 className="text-2xl text-[#0075B1] font-semibold flex justify-center items-center">
              {children}
            </h1>
          </div>
          <div className="mt-16">
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
    </div>
  );
}
