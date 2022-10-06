import Header from "../../Components/Header";

import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import AddBoxIcon from "@mui/icons-material/AddBox";

export default function noDemands() {
  return (
    <div>
      <Header />
      <div className="w-full h-[35rem] flex justify-center items-center">
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
              Sem demandas
            </h1>
          </div>
          <div className="mt-6">
            <Stack direction="row" spacing={2}>
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
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
