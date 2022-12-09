import { Badge, Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router";
import { useState } from "react";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import ProposalCard from "../../../Components/Proposal-card";

export default function GenerateAta() {
  const { id } = useParams();
  console.log("ID: ", id);

  const [parecerComissao, setParecerComissao] = useState("");

  const handleChangeParecerComissao = (event: SelectChangeEvent) => {
    setParecerComissao(event.target.value as string);
  };

  const actionsParecerComissao = [
    {
      action: "Aprovado",
      badgeColor: "#000",
    },
    {
      action: "Reprovado",
      badgeColor: "#C9c9c9",
    },
    {
      action: "Mais informações",
      badgeColor: "#000",
    },
    {
      action: "Business Case",
      badgeColor: "#000",
    },
  ];

  const Button = styled(MuiButton)({
    height: 60,
    width: 150,
    backgroundColor: "#FFF",
    border: "1px solid #000",
    color: "#000",
    "&:hover": {
      backgroundColor: "#FFF",
    },
  });

  return (
    <div className="grid items-center">
      <div className="flex justify-center items-center mb-5">
        <h1 className="font-bold text-3xl text-blue-weg mt-10">Ata 0003</h1>
      </div>
      <div className="grid justify-center">
        <div className="w-[65rem]">
          <ProposalCard
            id={1}
            newPauta={true}
            title="Proposta 1"
            executionTime={10}
            value={1000}
            referenceDemand="Automatizar o processo de geração de atas"
          />
        </div>
        <div
          className="
          md:grid md:grid-cols-2 md:gap-4 md:mt-5
          mt-5
          
        "
        >
          <div className="grid">
            <p className="font-roboto font-bold">Parecer da comissão</p>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                sx={{
                  width: 200,
                }}
              >
                <Select
                  sx={{
                    height: 40,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={parecerComissao}
                  onChange={handleChangeParecerComissao}
                >
                  {actionsParecerComissao.map((action) => (
                    <MenuItem value={action.action}>{action.action}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="grid">
            <p className="font-roboto font-bold">Considerações</p>
            <textarea
              className="w-[30rem] h-[4rem] border-2 border-[#000] rounded-md p-1 outline-blue-weg"
              placeholder="Digite aqui"
            ></textarea>
          </div>
          <div className="grid">
            <p className="font-roboto font-bold">Assunto registrado em ata</p>
            <div className="flex">
              <Button variant="contained">Publicada</Button>
              <Button variant="contained">Não publicada</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
