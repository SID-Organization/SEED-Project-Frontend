import { Button } from "@mui/material";
import { useParams } from "react-router";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import GenerateAtaProposal from "../../../Components/Generate-ata-proposal";

export default function GenerateAta() {
  const { id } = useParams();
  console.log("ID: ", id);

  return (
    <div className="grid items-center">
      <div className="flex justify-center items-center mb-5">
        <h1 className="font-bold text-3xl text-blue-weg mt-10">Ata 0003</h1>
      </div>
      <div className="grid">
        <GenerateAtaProposal />
        <GenerateAtaProposal />
        <GenerateAtaProposal />
      </div>
      <div className="flex justify-end items-center mb-5 mr-10">
        {/* Button to confirm action and end the circuit of the system */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0075B1",
            width: "12rem",

            "&:hover": {
              backgroundColor: "#0075B1",
            },
          }}
          className="w-[10rem] h-[2.5rem] mt-5"
          startIcon={
            <AddRoundedIcon
              sx={{
                color: "#fff",
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
          }
        >
          Gerar nova ata
        </Button>
      </div>
    </div>
  );
}
