import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import MuiButton from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import Paper from "@mui/material/Paper";

import NoDemands from "../../../Components/No-demands";

import { styled } from "@mui/material/styles";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Draggable from "react-draggable";
// Import de interfaces
// import LoggedUserInterface from "../../../Interfaces/user/LoggedUserInterface";

async function getDemandsFromDatabase(userId) {
  const response = await fetch(
    "http://localhost:8080/sid/api/demanda/solicitante/" + userId
  );
  const demands = await response.json();
  return demands.filter((item) => item.statusDemanda == "RASCUNHO");
}

export default function drafts() {
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [demands, setDemands] = useState([]);

  useEffect(() => {
    getDemandsFromDatabase(user.numeroCadastroUsuario).then((demands) => {
      setDemands(demands);
    });
  }, []);

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

  function PaperComponent(props) {
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
                    setDemands([]);
                    setSelectedDrafts([]);
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
          {selectedDrafts.length > 0 && (
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
                Deletar {"(" + selectedDrafts.length + ")"}{" "}
                {selectedDrafts.length > 1 ? "rascunhos" : "rascunho"}
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
        {demands.length > 0 ? (
          demands.map((demand) => (
            <DemandCard
              key={demand.idDemanda}
              demand={demand}
              setSelectedDrafts={setSelectedDrafts}
            />
          ))
        ) : (
          <NoDemands>Sem rascunhos!</NoDemands>
        )}
      </div>
    </div>
  );
}