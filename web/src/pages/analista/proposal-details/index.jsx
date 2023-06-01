import * as React from "react";
import { useParams } from "react-router-dom";

//MUI
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

//Components
import ViewProposal from "./ViewProposal";
import ViewDemand from "./ViewDemand";

const Button = styled(MuiButton)({
  width: "5rem",
  height: "2.5rem",
  marginBottom: "2rem",
});

export default function ProposalDetails() {
  const params = useParams();

  const h1Style =
    "flex items-center justify-start font-roboto text-xl font-bold text-dark-blue-weg underline";

  return (
    <>
      <div className="flex h-[5rem] items-center justify-around shadow-page-title-shadow">
        <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
          Visualização da proposta {params.idProposta}
        </h1>
      </div>
      <div>
        <div className={h1Style}>
          <h1>Informações da proposta</h1>
        </div>
        <ViewProposal />
        <div className={h1Style}>
          <h1>Informações da demada</h1>
        </div>
        <ViewDemand />
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Button
          variant="contained"
          className="font-roboto text-lg font-bold text-white"
        >
          Ok
        </Button>
      </div>
    </>
  );
}
