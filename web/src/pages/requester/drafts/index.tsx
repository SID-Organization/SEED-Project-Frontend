import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import MuiButton from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import Paper, { PaperProps } from "@mui/material/Paper";

import NoDemands from "../../../Components/No-demands";

import { styled } from "@mui/material/styles";

import { useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Draggable from "react-draggable";

export default function drafts() {
  const [selectDemands, setSelectDemands] = useState([]);
  const [isAllDemandsSelected, setIsAllDemandsSelected] = useState(false);
  const [draftsMock, setDraftsMock] = useState([
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
  ]);
  const [openModalConfirmationDemand, setOpenModalConfirmationDemand] =
    useState(false);

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

  function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const handleClickOpenModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(true);
  };

  const handleCloseModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(false);
  };

  return (
    <div>
      <SubHeader>Rascunhos</SubHeader>
      {
        <div className="ml-5 flex items-center">
          {/* MODAL DELETAR TODOS OS RASCUNHOS */}
          <Dialog
            open={openModalConfirmationDemand}
            onClose={handleCloseModalConfirmationDemand}
            PaperComponent={PaperComponent}
            sx={{
              "& .MuiDialog-paper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "23rem",
                height: "15rem",
                backgroundColor: "#fff",
                boxShadow: 0,
                borderRadius: 2,
              },
            }}
          >
            <div className="grid justify-center items-center">
              <div className="flex justify-center items-center">
                <WarningAmberRoundedIcon
                  sx={{
                    fontSize: "5rem",
                    color: "#0075B1",
                  }}
                />
              </div>
              <DialogTitle style={{ color: "#0075B1" }}>
                <p
                  className="
                  text-center
                "
                >
                  Têm certeza que deseja deletar todos os rascunhos?
                </p>
              </DialogTitle>
            </div>
            <DialogActions>
              <div className="flex gap-5">
                <Button
                  autoFocus
                  onClick={handleCloseModalConfirmationDemand}
                  sx={{
                    backgroundColor: "#C2BEBE",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#C2BEBE",
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    draftsMock.map((draft) => {
                      if (selectDemands.includes(draft.id as never)) {
                        setDraftsMock(
                          draftsMock.filter((draft) => draft.id !== draft.id)
                        );
                      }
                    });
                    setDraftsMock([]);
                    setSelectDemands([]);
                    setOpenModalConfirmationDemand(false);
                  }}
                  sx={{
                    backgroundColor: "#0075B1",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                >
                  Deletar tudo
                </Button>
              </div>
            </DialogActions>
          </Dialog>
          {/* FIM MODAL DELETAR TODOS OS RASCUNHOS */}
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
                onClick={handleClickOpenModalConfirmationDemand}
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
                Deletar tudo
              </Button>
            </div>
          )}
        </div>
      }
      <div className="flex flex-wrap justify-around">
        {draftsMock.length > 0 ? (
          draftsMock.map((draft) => (
            <DemandCard
              key={draft.id}
              id={draft.id}
              status={draft.status}
              setSelectDemands={setSelectDemands}
            />
          ))
        ) : (
          <NoDemands>Sem rascunhos!</NoDemands>
        )}
      </div>
    </div>
  );
}
