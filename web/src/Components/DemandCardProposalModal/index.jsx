import { Button } from "@mui/material";
import { Link } from "react-router-dom";

//Translations
import TranslationJson from "../../API/Translate/components/demandCardProposalModal.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";

export default function DemandCardProposalModal(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

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
          {translate["Selecionar"][language] ?? "Selecionar"}
        </Button>
      </Link>
    </div>
  );
}
