import * as React from "react";
import { useState, useEffect } from "react";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Components
import Search from "../Search";
import DemandCardProposalModal from "../DemandCardProposalModal";

// Services
import DemandService from "../../service/Demand-Service";

const modalDemandsStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderTop: "5px solid #0075B1",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function SubHeaderPautas() {
  const [openModalDemands, setOpenModalDemands] = React.useState(false);
  const [demandTitle, setDemandTitle] = useState([]);
  const handleOpenModalDemands = () => setOpenModalDemands(true);
  const handleCloseModalDemands = () => setOpenModalDemands(false);

  useEffect(() => {
    DemandService.getDemandsTitleAndStatus().then((demands) => {
      demands = demands.filter((demand) => demand.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA");
      setDemandTitle(demands);
    });
  }, []);


  const Button = styled(MuiButton)({
    backgroundColor: "#0075B1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "10px",
    marginRight: "2rem",

    "&:hover": {
      backgroundColor: "#0075B1",
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          Propostas
        </h1>
        <div className="flex mr-10 gap-16">
          {/* <Link to="/gerar-proposta/1"> */}
          <Button variant="contained" onClick={handleOpenModalDemands}>
            <AddRoundedIcon />
            Criar nova proposta
          </Button>
          <Modal
            open={openModalDemands}
            onClose={handleCloseModalDemands}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalDemandsStyle}>
              <div>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0075B1",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Selecione uma demanda abaixo
                </Typography>
                <div className="flex justify-center items-center">
                  <div
                    className="
                  flex flex-col gap-4
                  max-h-[40rem]
                  overflow-y-scroll
                  scrollbar-thumb-[#a5a5a5]
                scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-thin
                p-4
                  "
                  >
                    {
                      //check if theres any demand
                      demandTitle.length > 0 ? (
                        demandTitle.map((demand) => (
                          <DemandCardProposalModal
                            title={demand.tituloDemanda}
                            id={demand.idDemanda}
                          />
                        ))
                      ) : (
                        <div className="grid justify-center items-center mt-5">
                          <div className="flex justify-center items-center">
                            <ErrorOutlineIcon
                              sx={{
                                fontSize: "2.7rem",
                                color: "#b3b3b3",
                              }}
                            />
                          </div>
                          <p className="font-roboto font-bold mt-2 text-[#b3b3b3]">
                            Nenhuma demanda cadastrada!
                          </p>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

          <Search
            search={""}
            setSearch={function (search) {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </div>
  );
}
