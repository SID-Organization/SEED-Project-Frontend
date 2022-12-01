import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import MuiButton from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { styled } from "@mui/material/styles";

import { useState } from "react";
import Button from "@mui/material/Button";

export default function drafts() {
  const [selectDemands, setSelectDemands] = useState([]);
  const [isAllDemandsSelected, setIsAllDemandsSelected] = useState(false);

  const draftsMock = [
    {
      id: 1,
      status: "Rascunho",
    },
    {
      id: 2,
      status: "Rascunho",
    },
    {
      id: 3,
      status: "Rascunho",
    },
    {
      id: 4,
      status: "Rascunho",
    },
    {
      id: 5,
      status: "Rascunho",
    },
    {
      id: 6,
      status: "Rascunho",
    },
    {
      id: 7,
      status: "Rascunho",
    },
    {
      id: 8,
      status: "Rascunho",
    },
    {
      id: 9,
      status: "Rascunho",
    },
    {
      id: 10,
      status: "Rascunho",
    },
    {
      id: 11,
      status: "Rascunho",
    },
    {
      id: 12,
      status: "Rascunho",
    },
    {
      id: 13,
      status: "Rascunho",
    },
    {
      id: 14,
      status: "Rascunho",
    },
    {
      id: 15,
      status: "Rascunho",
    },
    {
      id: 16,
      status: "Rascunho",
    },
    {
      id: 17,
      status: "Rascunho",
    },
    {
      id: 18,
      status: "Rascunho",
    },
    {
      id: 19,
      status: "Rascunho",
    },
    {
      id: 20,
      status: "Rascunho",
    },
  ];

  const ButtonAddSelected = styled(MuiButton)({
    backgroundColor: "#FFF",
    color: "#0075B1",
    fontWeight: "bold",
    border: "#0075B1 solid 1px",
    fontSize: "0.89rem",
    width: 260,

    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  });

  return (
    <div>
      <SubHeader>Rascunhos</SubHeader>
      {
        <div className="ml-5 flex items-center">
          {selectDemands.length > 0 && (
            <div className="mb-10">
              <ButtonAddSelected
                variant="contained"
                color="primary"
                size="large"
                startIcon={
                  <DeleteRoundedIcon
                    sx={{
                      color: "#0075B1",
                    }}
                  />
                }
              >
                Deletar {"(" + selectDemands.length + ")"}{" "}
                {selectDemands.length > 1 ? "rascunhos" : "rascunho"}
              </ButtonAddSelected>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#FFF",
                  fontSize: "0.89rem",
                  width: 200,
                  marginLeft: 2,
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
              >
                Selecionar tudo
              </Button>
            </div>
          )}
        </div>
      }
      <div className="flex flex-wrap justify-around">
        {draftsMock.map((draft) => (
          <DemandCard
            key={draft.id}
            id={draft.id}
            status={draft.status}
            setSelectDemands={setSelectDemands}
          />
        ))}
      </div>
    </div>
  );
}
