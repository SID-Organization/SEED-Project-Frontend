import * as React from "react";
import { useParams } from "react-router-dom";

//MUI
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

//Components
import ViewProposal from "./ViewProposal";
import ViewDemand from "./ViewDemand";
import { Box, Card, CardContent, Divider } from "@mui/material";

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
      <div className="flex items-center justify-center">
        {" "}
        <Card
          sx={{
            width: "60rem",
            height: "100%",
            marginTop: "2rem",
            marginBottom: "2rem",
            boxShadow: "3px 3px 8px 4px #d4d4d4c7",
            borderRadius: "3px",
            borderLeft: "#0075B1 solid 5px",
          }}
        >
          <CardContent>
            <div className="grid gap-7 p-10">
              <div className="grid items-center justify-center">
                <div className="grid gap-3">
                  <div className={h1Style}>
                    <h1>Informações da proposta</h1>
                  </div>
                  <ViewProposal />
                </div>
                <Divider
                  sx={{
                    width: "100%",
                    height: "0.5rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                />
                <div className="grid gap-3">
                  <div className={h1Style}>
                    <h1 className="mb-5 mt-5">Informações da demada</h1>
                  </div>
                  <ViewDemand />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
