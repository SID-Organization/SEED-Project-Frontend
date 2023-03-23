import { useEffect, useState } from "react";

// MUI
import { Button } from "@mui/material";
import { useParams } from "react-router";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

// Components
import GenerateAtaProposal from "../../../Components/Generate-ata-proposal";

// Services
import PautaService from "../../../service/Pauta-Service";

export default function GenerateAta() {
  const { id } = useParams("id");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    PautaService.getPautaProposalsById(id)
      .then((proposals) => {
        setProposals(proposals);
      });
  }, []);

  return (
    <div className="grid items-center">
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="font-bold text-3xl text-blue-weg mt-10">Geração de ata</h1>
        <p className="text-blue-weg mt-4">Pauta referência: {id}</p>
      </div>
      <div className="grid">
        {proposals.map((proposal, i) => (
          <GenerateAtaProposal
            key={i}
            proposal={proposal}
          />
        ))}
      </div>
      <div className="flex justify-end items-center mb-5 mr-10">
        {/* Button to confirm action and end the circuit of the system */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0075B1",
            width: "12rem",
            height: "2.5rem",

            "&:hover": {
              backgroundColor: "#0075B1",
            },
          }}
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
