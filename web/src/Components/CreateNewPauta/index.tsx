import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";

import ProposalCard from "../ProposalCard";

import { styled } from "@mui/material/styles";
import { useState } from "react";

import MuiTextField from "@mui/material/TextField";

import MuiAddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { IMaskInput } from "react-imask";
import MuiCheckbox from "@mui/material/Checkbox";

export default function CreateNewPauta() {
  const [openedModal, setOpenedModal] = useState(false);

  const handleOpenModal = () => setOpenedModal(true);
  const handleCloseModal = () => setOpenedModal(false);

  const checkBoxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

  const Comissions = [
    { label: "Comissão de Educação" },
    { label: "Comissão de Saúde" },
    { label: "Comissão de Segurança" },
  ];

  const Checkbox = styled(MuiCheckbox)({
    color: "#00A3FF",

    "&.Mui-checked": {
      color: "#00A3FF",
    },
  });

  const TextField = styled(MuiTextField)({
    width: "14rem",
    marginBottom: "1rem",
    height: "3rem",
  });

  const modalStyled = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    overflow: "scroll",
    overflowX: "hidden",
    height: "80%",
  };

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

  const AddRoundedIcon = styled(MuiAddRoundedIcon)({
    color: "#fff",
    height: "1.5rem",
    width: "1.5rem",
  });

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>
        <AddRoundedIcon />
        Criar nova pauta
      </Button>

      <Modal
        open={openedModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyled}>
          <div className="font-roboto grid gap-10">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Pauta 001</h1>
              <Button
                disabled={false}
                variant="contained"
                endIcon={<CheckRoundedIcon />}
              >
                Criar
              </Button>
            </div>
            <div className="flex justify-between items-center gap-12">
              <TextField
                id="outlined-basic"
                label="Data da reunião"
                variant="outlined"
                placeholder="dd/mm/aaaa"
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Comissions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Comissão" />
                )}
              />
            </div>
            <div className="flex items-center gap-5">
              <h1 className="font-bold">Horário:</h1>
              <div className="flex items-center gap-5">
                <TextField
                  id="outlined-basic"
                  label="Início"
                  variant="outlined"
                  placeholder="hh:mm"
                  sx={{
                    width: "6rem",
                    height: "3rem",
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Término"
                  variant="outlined"
                  placeholder="hh:mm"
                  sx={{
                    width: "6rem",
                    height: "3rem",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-5">
              <div
                className="
                w-10 h-[1.5px] bg-[#0075B1] rounded-full
              "
              />
              <h1 className="text-xl">Propostas à apreciar</h1>
              <div
                className="
                w-10 h-[1.5px] bg-[#0075B1] rounded-full
              "
              />
            </div>
            <div className="grid gap-5">
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
              <div className="flex items-center gap-12">
                <Checkbox {...checkBoxLabel} defaultChecked />
                <ProposalCard newPauta={true} />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
