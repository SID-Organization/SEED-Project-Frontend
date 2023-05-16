import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function DemandCardProposalModal(props) {

  const demandId = props.id;

  return (
    <div
      className="
      mt-4
      flex
      h-[5rem]
      w-[40rem]
      items-center justify-between border-2
      p-4
      shadow-xl
    "
    >
      <h1>
        {demandId} - {props.title}
      </h1>

      <Link to={`/propostas/gerar-proposta/${demandId}`}>
        <Button
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
