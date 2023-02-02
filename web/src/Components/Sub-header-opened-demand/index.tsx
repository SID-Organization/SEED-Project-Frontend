import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Badge, InputLabel, TableRow } from "@mui/material";
import MuiFormControl from "@mui/material/FormControl";
import MuiAutocomplete from "@mui/material/Autocomplete";
import toast, { Toaster } from "react-hot-toast";

import DoneIcon from "@mui/icons-material/Done";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import "../../styles/index.css";
import LoggedUserInterface from "../../Interfaces/user/LoggedUserInterface";

// Busca a demanda do banco de dados
const getDemandFromDatabase = async (id: string | undefined) => {
  const response = await fetch(
    "http://localhost:8080/sid/api/demanda/id/" + id
  );
  const data = await response.json();
  return data;
};

// Busca as BUs do banco de dados
const getBusinessUnits = async () => {
  const response = await fetch("http://localhost:8080/sid/api/business-unity");
  const data = await response.json();
  return data;
};

// Componentes estilizados
const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1150,
  bgcolor: "background.paper",
  borderRadius: "0.125rem",
  boxShadow: 24,
};

const styleModalReasonOfDevolution = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 405,
  bgcolor: "background.paper",
  borderTop: "8px solid #0075B1",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const TextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const FormControl = styled(MuiFormControl)({
  width: 250,

  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const Autocomplete = styled(MuiAutocomplete)({
  width: 250,
});

/**
 * Classe com utilidades para Analistas e Gerentes decidirem caminhos para as demandas.
 *
 * Parâmetros de controle para edição dos campos
 * @param isEditEnabled
 * @param setIsEditEnabled
 */

export default function subHeader({
  children,
  isEditEnabled,
  setIsEditEnabled,
}: any) {
  // Controle de modal
  const [openModal, setOpenModal] = useState(false);

  // Controle do botão de ações
  const [openActions, setOpenActions] = useState(false);
  // Controle do botão selecionado
  const [selectedIndex, setSelectedIndex] = useState(1);

  // Demanda buscada do banco de dados
  const [demand, setDemand] = useState<any>();

  // Dados classificados da demanda
  const [benefitedBus, setBenefitedBus] = useState<any>();
  const [responsableSection, setResponsableSection] = useState("");
  const [classifyDemandSize, setClassifyDemandSize] = useState("");
  const [requesterBu, setRequesterBu] = useState("");
  const [businessUnits, setBusinessUnits] = useState<any>();

  // Motivo da devolução
  const [openReasonOfDevolution, setOpenReasonOfDevolution] = useState(false);

  // Usuário logado
  const [user, setUser] = useState<LoggedUserInterface>(
    JSON.parse(localStorage.getItem("user")!)
  );

  const anchorRef = React.useRef<HTMLDivElement>(null);
  const params = useParams();

  useEffect(() => {
    getDemandFromDatabase(params.id).then((response) => {
      setDemand(response);
    });
  }, []);

  const handleOpenReasonOfDevolution = () => setOpenReasonOfDevolution(true);
  const handleCloseReasonOfDevolution = () => setOpenReasonOfDevolution(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const actionOptions = [
    {
      text: "Classificar demanda",
      key: 1,
    },
    {
      text: "Devolver",
      key: 2,
    },
    {
      text: "Recusar",
      key: 3,
    },
  ];

  const sections = [
    {
      text: "Utilidades",
      key: 1,
    },
    {
      text: "Comunicação",
      key: 2,
    },
    {
      text: "Financeiro",
      key: 3,
    },
    {
      text: "RH",
      key: 4,
    },
    {
      text: "TI",
      key: 5,
    },
    {
      text: "Vendas",
      key: 6,
    },
  ];

  const demandSizes = [
    {
      text: "Muito grande",
      description: "Acima de 3000h",
      key: 1,
    },
    {
      text: "Grande",
      description: "Entre 1001h e 3000h",
      key: 2,
    },
    {
      text: "Média",
      description: "Entre 301h e 1000h",
      key: 3,
    },
    {
      text: "Pequena",
      description: "Entre 41h e 300h",
      key: 4,
    },
    {
      text: "Muito pequena",
      description: "Entre 1h - 40h",
      key: 5,
    },
  ];

  useEffect(() => {
    getBusinessUnits().then((data) => {
      setBusinessUnits(
        data.map((item: any) => ({
          text: item.nomeBusinessUnity,
          key: item.idBusinessUnity,
        }))
      );
    });
  }, []);

  const notifyEditEnabledOn = () => toast("Agora você pode editar os campos!");
  const notifyEditEnabledOff = () =>
    toast.success("Alterações salvas com sucesso!");

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpenActions(false);
  };

  const handleToggleActions = () => {
    setOpenActions((prevOpen) => !prevOpen);
  };

  const handleCloseActions = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenActions(false);
  };

  function editInput() {
    setIsEditEnabled(!isEditEnabled);
    if (isEditEnabled) {
      notifyEditEnabledOn();
    } else {
      notifyEditEnabledOff();
    }
  }

  const handleChangeRequesterBu = (event: SelectChangeEvent) => {
    setRequesterBu(event.target.value as string);
  };

  const handleChangeClassifyDemandSize = (event: SelectChangeEvent) => {
    setClassifyDemandSize(event.target.value as string);
  };

  const handleUpdateDemand = async () => {
    // handleCloseModal();
    const updatedDemand = {
      busBeneficiadasDemanda: benefitedBus.map((item: any) => ({
        idBusinessUnity: item.key,
      })),
      buSolicitanteDemanda: businessUnits.find((item: any) => item.key == requesterBu)
        ?.text,
      secaoTIResponsavelDemanda: responsableSection,
      tamanhoDemanda: getDemandSize(),
    };
    console.log("updatedDemand", updatedDemand);

    fetch(
      `http://localhost:8080/sid/api/demanda/atualiza-bus-beneficiadas/${demand.idDemanda}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDemand),
      }
    )
      .then((response) => {
        if (response.ok) {
          fetch("http://localhost:8080/sid/api/historico-workflow", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tarefaHistoricoWorkflow: "APROVACAO_GERENTE_AREA",
              demandaHistorico: { idDemanda: demand.idDemanda },
              acaoFeitaHistorico: "Enviar",
              idResponsavel: { numeroCadastroUsuario: 72132 },
            }),
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const getDemandSize = () => {
    if (classifyDemandSize == "1") return "MUITO_GRANDE";
    if (classifyDemandSize == "2") return "GRANDE";
    if (classifyDemandSize == "3") return "MEDIA";
    if (classifyDemandSize == "4") return "PEQUENA";
    if (classifyDemandSize == "5") return "MUITO_PEQUENA";
  };

  return (
    <div>
      {/* Modal para inserir o motivo da reprovação */}
      <Modal
        open={openReasonOfDevolution}
        onClose={handleCloseReasonOfDevolution}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalReasonOfDevolution}>
          <h1
            className="
              text-[#0075B1]
              font-bold
              text-2xl
              flex
              justify-center
              items-center
              font-roboto
            "
          >
            Motivo da devolução da demanda
          </h1>
          <p
            className="
              mt-5
              font-bold
              text-[#000000]
              font-roboto
              flex
              text-lg
              gap-1
            "
          >
            Insira o motivo
            <span style={{ color: "#AD0D0D", fontWeight: 500 }}>*</span>
          </p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            sx={{
              width: 500,
              height: 100,
              mt: 2,
              mb: 5,
              borderRadius: 5,
              borderColor: "#0075B1",
            }}
          />
          <span className="flex justify-center items-center gap-4">
            <Button
              onClick={handleCloseReasonOfDevolution}
              variant="contained"
              style={{
                backgroundColor: "#0075B1",
                color: "#FFFFFF",
                width: 100,
                marginTop: 20,
              }}
            >
              Enviar
            </Button>
          </span>
        </Box>
      </Modal>
      {/* Fim modal para inserir motivo da reprovação */}

      {/* Modal para inserir as informações da demanda */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="font-roboto">
            <div className="mb-5 flex items-center justify-center bg-dark-blue-weg h-20 w-full rounded-t-sm">
              <h1 className="font-bold text-white text-2xl">
                Insira as seguintes informações
              </h1>
            </div>
            <div className="flex justify-evenly items-center mb-6">
              <div className="grid justify-center items-center gap-2">
                <p className="font-bold text-dark-blue-weg">
                  Seção da TI responsável
                </p>
                <FormControl variant="outlined" size="small">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={sections.map((option) => option.text)}
                    renderInput={(params) => (
                      <TextField {...params} label="Seção" />
                    )}
                    isOptionEqualToValue={(option, value) => option === value}
                    value={responsableSection}
                    onChange={(event, newValue) => {
                      setResponsableSection(newValue as string);
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid justify-center items-center gap-2">
                <p className="font-bold text-dark-blue-weg">BU solicitante</p>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">BU</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={requesterBu}
                    label="BU"
                    onChange={handleChangeRequesterBu}
                  >
                    {businessUnits &&
                      businessUnits.map(
                        (item: { key: string; text: string }) => (
                          <MenuItem value={item.key}>{item.text}</MenuItem>
                        )
                      )}
                  </Select>
                </FormControl>
              </div>
              <div className="grid justify-center items-center gap-2">
                <p className="font-bold text-dark-blue-weg">BUs beneficiadas</p>
                <FormControl fullWidth size="small">
                  <Autocomplete
                    sx={{
                      width: 250,
                    }}
                    size="small"
                    multiple
                    id="tags-outlined"
                    options={businessUnits ? businessUnits : []}
                    getOptionLabel={(option: any) => option.text as string}
                    value={benefitedBus}
                    onChange={(event, newValues) => {
                      setBenefitedBus(newValues);
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="BUs" />
                    )}
                  />
                </FormControl>
              </div>
              <div className="grid justify-center items-center gap-2 mr-20">
                <p className="font-bold text-dark-blue-weg">
                  Classificação de tamanho
                </p>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Classifique um tamanho
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={classifyDemandSize}
                    label="Classifique um tamanho"
                    onChange={handleChangeClassifyDemandSize}
                    sx={{
                      display: "grid",
                      width: 320,
                    }}
                  >
                    {demandSizes.map((item) => (
                      <MenuItem value={item.key}>
                        <Badge
                          badgeContent={item.description}
                          color="primary"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          sx={{
                            "& .MuiBadge-badge": {
                              backgroundColor: "#0075B1",
                              color: "#fff",
                              display: "flex",
                              left: "60px",
                              top: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "8rem",
                            },
                          }}
                        >
                          {item.text}
                        </Badge>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex justify-evenly items-center mt-10 mb-5">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2BEBE",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#C2BEBE",
                  },
                }}
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleOpenReasonOfDevolution}
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  color: "#0075B1",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                Devolver
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
                onClick={handleUpdateDemand}
              >
                Enviar
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Fim modal para inserir informações */}
      <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
          {children}
        </h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00579D",
            columnGap: 2,
            width: 50,
            height: 40,
          }}
          onClick={() => editInput()}
        >
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                iconTheme: {
                  primary: "#7EB61C",
                  secondary: "white",
                },
              },
              style: {
                fontSize: "14px",
              },
            }}
          />
          {isEditEnabled ? (
            <Tooltip title="Editar">
              <ModeEditIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Salvar alterações">
              <DoneIcon />
            </Tooltip>
          )}
        </Button>

        {user.cargoUsuario != "SOLICITANTE" && (
          <Tooltip title="Ações">
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button
                size="small"
                aria-controls={openActions ? "split-button-menu" : undefined}
                aria-expanded={openActions ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                sx={{
                  backgroundColor: "#00579D",
                  width: 100,
                  height: 40,
                  fontSize: 14,
                }}
                onClick={handleToggleActions}
              >
                Ações
                {openActions ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Button>
            </ButtonGroup>
          </Tooltip>
        )}
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={openActions}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseActions}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {actionOptions.map((option, index) => (
                      <MenuItem
                        onClick={
                          option.key === 1
                            ? handleOpenModal
                            : (event) => handleMenuItemClick(event, index)
                        }
                        key={option.key}
                        selected={index === selectedIndex}
                      >
                        {option.text}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 240,
            height: 40,
            marginRight: "1rem",
          }}
          style={{
            boxShadow: "#bdbdbd 0px 1px 5px 1px",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "13px" }}
            placeholder="Procure aqui"
            inputProps={{ "aria-label": "Procure aqui" }}
          />
        </Paper>
      </div>
    </div>
  );
}
