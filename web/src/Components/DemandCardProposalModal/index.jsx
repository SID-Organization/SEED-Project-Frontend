import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function DemandCardProposalModal(
  props
) {
  const [demandId, setDemandId] = useState(props.id);

  return (
    <div
      className="
      w-[40rem]
      h-[5rem]
      shadow-xl
      border-2
      flex items-center justify-between
      p-4
      mt-4
    "
    >
      <h1>
        {props.id} - {props.title}
      </h1>

      <Link to={`/propostas/gerar-proposta/${demandId}`}>
        <Button
          onClick={() => console.log("clicou ", demandId)}
          variant="contained"
          sx={{
            backgroundColor: "#0075B1",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0075B1",
            },
          }}
        >
          Selecionar
        </Button>
      </Link>
    </div>
  );
}
