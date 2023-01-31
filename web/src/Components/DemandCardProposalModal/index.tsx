import { Button } from "@mui/material";

interface DemandCardProposalModalProps {
  title: string;
  id: number;
}

export default function DemandCardProposalModal(
  props: DemandCardProposalModalProps
) {
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
    </div>
  );
}
