import {
  Badge,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import ProposalCard from "../Proposal-card";
import { BadgeOutlined } from "@mui/icons-material";

export default function GenerateAtaProposal() {
  const [parecerComissao, setParecerComissao] = useState("");
  const [considerations, setConsiderations] = useState("");

  const handleChangeParecerComissao = (event: SelectChangeEvent) => {
    setParecerComissao(event.target.value as string);
  };

  const actionsParecerComissao = [
    {
      action: "Aprovado",
    },
    {
      action: "Reprovado",
    },
    {
      action: "Mais informações",
    },
    {
      action: "Business Case",
    },
  ];

  const [publicada, setPublicada] = useState(false);
  const [naoPublicada, setNaoPublicada] = useState(false);

  const Button = styled(MuiButton)({
    height: 50,
    width: 150,
    border: "1px solid #000",
  });

  return (
    <div>
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
                    <MenuItem value={action.action}>
                      {action.action}
                      <Badge
                        color={
                          action.action === "Aprovado"
                            ? "success"
                            : action.action === "Reprovado"
                            ? "error"
                            : action.action === "Mais informações"
                            ? "warning"
                            : "info"
                        }
                        variant="dot"
                        sx={{
                          ml: 1.5,
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="grid">
            <p className="font-roboto font-bold">Considerações</p>
            <textarea
              className="w-[30rem] h-[4rem] border-2 border-[#000] rounded-md p-2 outline-blue-weg
              min-h-[4rem]
              "
              placeholder="Digite aqui"
              value={considerations}
              onChange={(e) => setConsiderations(e.target.value)}
            />
          </div>
          <div className="grid">
            <p className="font-roboto font-bold mb-2">
              Assunto registrado em ata
            </p>
            <div className="flex gap-2 mb-10">
              <Button
                onClick={() => {
                  setPublicada(!publicada);
                  setNaoPublicada(false);
                }}
                color={publicada ? "primary" : "secondary"}
                variant={publicada ? "contained" : "outlined"}
              >
                Publicada
              </Button>
              <Button
                onClick={() => {
                  setNaoPublicada(!naoPublicada);
                  setPublicada(false);
                }}
                color={naoPublicada ? "primary" : "secondary"}
                variant={naoPublicada ? "contained" : "outlined"}
              >
                Não publicada
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider
        sx={{
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 5,
        }}
      />
    </div>
  );
}
