import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate";
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

//Components
import Notification from "../../Components/Notification";
import ReturnReasonModal from "../ReturnReason-Modal";
import ChangeImportance from "./ChangeImportance";

// MUI
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
import Select from "@mui/material/Select";
import { Badge, Dialog, InputLabel } from "@mui/material";
import MuiFormControl from "@mui/material/FormControl";
import MuiAutocomplete from "@mui/material/Autocomplete";

// Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

import "../../styles/index.css";

// Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import BusinessUnityService from "../../service/BusinessUnity-Service";
import RespITSectionService from "../../service/ResponsableITSection-Service";

import TranslationJSON from "../../API/Translate/components/subHeaderOpenedDemand.json";
// Utils
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";
import ManageAnalysts from "./ManageAnalysts";
import ChangeDemandStatus from "./ChangeDemandStatus";

// Componentes estilizados
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1150,
  height: 600,
  bgcolor: "background.paper",
  borderRadius: "5px",
  padding: "12px",
  boxShadow: 24,
};

const styleApproveDemand = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "23rem",
  height: "15rem",
  backgroundColor: "#fff",
  boxShadow: 0,
  borderRadius: 2,
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

const FormControlImportanceDemand = styled(MuiFormControl)({});

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

export default function subHeader(props) {
  let phrase = props.children[0].trim();

  const translate = TranslationJSON;
  const [language] = useContext(TranslateContext);

  // Controle de modal
  const [openModal, setOpenModal] = useState(false);

  // Controle do botão de ações
  const [openActions, setOpenActions] = useState(false);
  // Controle do botão selecionado
  const [selectedKey, setSelectedKey] = useState(1);

  // Demanda buscada do banco de dados
  const [demand, setDemand] = useState();
  // Demandas similares
  const [similarDemands, setSimilarDemands] = useState();
  const [demandStatus, setDemandStatus] = useState("");

  // Importância da demanda
  const [demandImportance, setDemandImportance] = useState("");

  // Dados classificados da demanda
  const [benefitedBus, setBenefitedBus] = useState([]);
  const [responsableSection, setResponsableSection] = useState("");
  const [classifyDemandSize, setClassifyDemandSize] = useState("");
  const [requesterBu, setRequesterBu] = useState("");

  // Dados buscados do banco
  const [businessUnits, setBusinessUnits] = useState([]);
  const [responsableITSections, setResponsableITSections] = useState([]);

  // Motivo da devolução modal
  const [isReasonOfModalOpen, setIsReasonOfModalOpen] = useState(false);

  // Usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Modal de aprovação da demanda
  const [openApproveDemandModal, setOpenApproveDemandModal] = useState(false);

  // Notificação confirmação demanda aprovada
  const [openNotification, setOpenNotification] = useState(false);

  const [notificationClassifiedDemand, setNotificationClassifiedDemand] =
    useState(false);

  const [anyEmptyField, setAnyEmptyField] = useState(false);

  const [isImportanceModalOpen, setIsImportanceModalOpen] = useState(false);

  const [modalManageAnalysts, setModalManageAnalysts] = useState(false);

  const [modalChangeDemandStatus, setModalChangeDemandStatus] = useState(false);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [notificationChangeImportance, setNotificationChangeImportance] =
    useState(false);

  const [notificationDemandStatus, setNotificationDemandStatus] =
    useState(false);

  const anchorRef = React.useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (demand) {
      setDemandStatus(demand.statusDemanda);
    }
  }, [demand]);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    if (openModal) {
      getSimilarDemands();
    }
  }, [openModal]);

  const getSimilarDemands = async () => {
    const similarDemands = await DemandService.checkSimilarDemands(params.id);
    setSimilarDemands(similarDemands);
  };

  const accessSimilarDemand = (demandId) => {
    navigate(`/demandas/${demandId}`);
    setOpenModal(false);
  };

  useEffect(() => {
    getOrRefreshDemand();
  }, []);

  const getOrRefreshDemand = () => {
    DemandService.getDemandById(params.id).then((data) => {
      setDemand(data);
    });
  };

  useEffect(() => {
    setDemandImportance(props.demand?.importanciaDemanda);
  }, [props.demand]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    // Clear states
    setClassifyDemandSize("");
    setRequesterBu("");
    setResponsableSection("");
    setBenefitedBus([]);
  };

  const handleOpenApproveDemand = () => setOpenApproveDemandModal(true);

  const handleCloseApproveDemand = () => {
    setOpenApproveDemandModal(false);
  };

  const handleApproveDemand = () => {
    handleManagerApproveDemand();
  };

  const accessProposal = () => {
    navigate(`/propostas/gerar-proposta/${demand.idDemanda}`);
  };

  const accessProposalDetails = async () => {
    navigate(`/propostas/${params.id}`);
  };

  console.log("demand", demand);

  const [actionOptions, setActionOptions] = useState([]);

  useEffect(() => {
    if (demand) {
      setActionOptions([
        {
          text:
            translate["Classificar demanda"]?.[language] ??
            "Classificar demanda",
          role: ["ANALISTA"],
          demandStatus: ["ABERTA"],
          notDemandStatus: [""],
          function: handleOpenModal,
          key: 1,
        },
        {
          text: translate["Aprovar"]?.[language] ?? "Aprovar",
          role: ["GERENTE", "GESTOR_TI"],
          demandStatus: ["CLASSIFICADO_PELO_ANALISTA", "PROPOSTA_PRONTA"],
          notDemandStatus: [
            "PROPOSTA_PRONTA",
            "PROPOSTA_FINALIZADA",
            "DISIGN_AND_BUILD",
            "SUPORTE",
          ],
          function: handleOpenApproveDemand,
          key: 2,
        },
        {
          text: translate["Acessar proposta"]?.[language] ?? "Acessar proposta",
          role: ["ANALISTA", "GESTOR_TI"],
          demandStatus: ["PROPOSTA_EM_ELABORACAO"],
          notDemandStatus: [""],
          function: accessProposal,
          key: 3,
        },
        {
          text: translate["Ver proposta"]?.[language] ?? "Ver proposta",
          role: ["SOLICITANTE", "ANALISTA", "GERENTE", "GESTOR_TI"],
          demandStatus: [
            "PROPOSTA_PRONTA",
            "PROPOSTA_FINALIZADA",
            "EM_PAUTA",
            "APROVADA_EM_COMISSAO",
            "APROVADA_EM_DG",
            "PROPOSTA_EM_EXECUCAO",
            "PROPOSTA_EM_SUPORTE",
            "BUSINESS_CASE",
          ],
          notDemandStatus: [""],
          function: accessProposalDetails,
          key: 4,
        },
        {
          text: translate["Devolver"]?.[language] ?? "Devolver",
          role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
          demandStatus: ["TODAS"],
          notDemandStatus: ["EM_EDICAO", "CANCELADA"],
          function: () => setIsReasonOfModalOpen(true),
          key: 5,
        },

        {
          text: translate["Recusar"]?.[language] ?? "Recusar",
          role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
          demandStatus: ["TODAS"],
          notDemandStatus: ["EM_EDICAO", "CANCELADA"],
          function: () => setIsReasonOfModalOpen(true),
          key: 6,
        },
        {
          text: translate["Alterar status"]?.[language] ?? "Alterar status",
          role: ["ANALISTA"],
          demandStatus: [
            "APROVADO_EM_DG",
            "PROPOSTA_EM_EXECUCAO",
            "PROPOSTA_EM_SUPORTE",
            "PROPOSTA_FINALIZADA",
            "TODAS",
          ],
          notDemandStatus: ["ABERTA"],
          function: () => setModalChangeDemandStatus(true),
          key: 7,
        },
        {
          text:
            translate["Alterar importância"]?.[language] ??
            "Alterar importância",
          role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
          demandStatus: ["TODAS"],
          notDemandStatus: ["ABERTA"],
          function: () => setIsImportanceModalOpen(true),
          key: 8,
        },
        {
          text:
            translate["Gerenciar analistas"][language] ?? "Gerenciar analistas",
          role: ["ANALISTA", "GERENTE"],
          demandStatus: ["TODAS"],
          notDemandStatus: ["RASCUNHO", "CANCELADA", "ABERTA"],
          function: () => setModalManageAnalysts(true),
          key: 9,
        },
      ]);
    }
  }, [demand]);

  const getIsDevolution = () => {
    return selectedKey == 5;
  };

  const demandSizes = [
    {
      text: translate["Muito grande"]?.[language] ?? "Muito grande",
      description: "3000h +",
      key: 1,
    },
    {
      text: translate["Grande"]?.[language] ?? "Grande",
      description: "1000h +",
      key: 2,
    },
    {
      text: translate["Média"]?.[language] ?? "Média",
      description: "300h +",
      key: 3,
    },
    {
      text: translate["Pequena"]?.[language] ?? "Pequena",
      description: "40h +",
      key: 4,
    },
    {
      text: translate["Muito pequena"]?.[language] ?? "Muito pequena",
      description: "1h +",
      key: 5,
    },
  ];

  useEffect(() => {
    BusinessUnityService.getBusinessUnity().then((data) => {
      setBusinessUnits(
        data.map((item) => ({
          text: item.siglaBusinessUnity + " - " + item.nomeBusinessUnity,
          key: item.idBusinessUnity,
        }))
      );
    });
    RespITSectionService.getResponsableITSections()
      .then((data) => {
        setResponsableITSections(
          data.map((item) => ({
            text:
              item.siglaSecaoTIResponsavel +
              " - " +
              item.nomeSecaoTIResponsavel,
            key: item.idSecaoTIResponsavel,
          }))
        );
      })
      .catch((err) => console.log("Erro ", err));
  }, []);

  const handleToggleActions = () => {
    setOpenActions((prevOpen) => !prevOpen);
  };

  const handleCloseActions = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenActions(false);
  };

  function editDemand() {
    navigate(`/editar-demanda/${params.id}`);
  }

  const handleChangeRequesterBu = (event) => {
    setRequesterBu(event.target.value);
  };

  const handleChangeClassifyDemandSize = (event) => {
    setClassifyDemandSize(event.target.value);
  };

  const handleAnalystClassifyDemand = async () => {
    // Check if all fields are filled
    if (!benefitedBus.length || !requesterBu || !responsableSection) {
      setAnyEmptyField(true);
      const timer = setTimeout(() => {
        setAnyEmptyField(false);
      }, 2200);
      return () => clearTimeout(timer);
    }

    // Formatting data to send to the backend
    const busBeneficiadas = benefitedBus.map((item) => ({
      idBusinessUnity: item.key,
    }));
    const buSolicitante = {
      idBusinessUnity: businessUnits.find((item) => item.key == requesterBu)
        ?.key,
    };
    const secaoTiResponsavel = {
      idSecaoTIResponsavel: responsableITSections.find(
        (item) => item.text == responsableSection
      )?.key,
    };
    const updatedDemand = {
      busBeneficiadasDemanda: busBeneficiadas,
      buSolicitanteDemanda: buSolicitante,
      secaoTIResponsavelDemanda: secaoTiResponsavel,
      tamanhoDemanda: getDemandSize(),
      analistasResponsaveisDemanda: [
        {
          numeroCadastroUsuario: UserUtils.getLoggedUserId(),
        },
      ],
    };

    console.log("updatedDemand", updatedDemand);
    DemandService.updateBenefitedBUs(demand.idDemanda, updatedDemand)
      .then((response) => {
        if (response.status == 200) {
          // Passou para o back-end
          // DemandLogService.createDemandLog(
          //   "APROVACAO_GERENTE_AREA",
          //   demand.idDemanda,
          //   "Aprovar",
          //   72132
          // );
          return true;
        }
        console.log("ERR", response);
        return false;
      })
      .then((isSuccessful) => {
        if (isSuccessful) {
          setNotificationClassifiedDemand(true);
          const timeout = setTimeout(() => {
            navigate("/gerenciar-demandas");
          }, 2000);
          return () => clearTimeout(timeout);
        }
      });
  };

  const handleManagerApproveDemand = async () => {
    DemandLogService.createDemandLog(
      "ELABORACAO_PROPOSTA",
      demand.idDemanda,
      "Aprovar",
      72131
    ).then((response) => {
      if (response.status == 200 || response.status == 201) {
        DemandService.updateDemandStatus(
          demand.idDemanda,
          "APROVADO_PELO_GERENTE_DA_AREA"
        ).then((response) => {
          if (response.status == 200 || response.status == 201) {
            setOpenNotification(true);
            const timeout = setTimeout(() => {
              navigate("/gerenciar-demandas");
            }, 2200);
            return () => clearTimeout(timeout);
          }
        });
      }
    });
  };

  const getDemandSize = () => {
    if (classifyDemandSize == "1") return "MUITO_GRANDE";
    if (classifyDemandSize == "2") return "GRANDE";
    if (classifyDemandSize == "3") return "MEDIA";
    if (classifyDemandSize == "4") return "PEQUENA";
    if (classifyDemandSize == "5") return "MUITO_PEQUENA";
  };

  function ableToEdit() {
    if (demand) {
      return (
        user.cargoUsuario == "SOLICITANTE" &&
        demand.statusDemanda == "EM_EDICAO"
      );
    }
  }

  const handleCloseChangeDemandImportanceModal = () => {
    setIsImportanceModalOpen(false);
  };

  const handlePutDemandImportance = () => {
    DemandService.updateDemandImportance(
      demand?.idDemanda,
      demandImportance
    ).then((res) => {
      if (res.status == 200 || res.status == 201) {
        props.setDemand(res.data);
        setDemandImportance(res.data.importanciaDemanda);
      }
    });
    getOrRefreshDemand();
    setIsImportanceModalOpen(false);
    setNotificationChangeImportance(true);
    const timer = setTimeout(() => {
      setNotificationChangeImportance(false);
    }, 2200);
    return () => clearTimeout(timer);
  };

  const handlePutDemandStatus = () => {
    DemandService.updateDemandStatus(demand?.idDemanda, demandStatus)
      .then(res => {
        if ([200, 201].includes(res.status)) {
          if (demandStatus == "PROPOSTA_EM_EXECUCAO") {
            DemandLogService.createDemandLog("EXECUCAO_PROPOSTA", demand?.idDemanda, "Alterar status", UserUtils.getLoggedUserId())
          } else if (demandStatus == "PROPOSTA_EM_SUPORTE") {
            DemandLogService.createDemandLog("EM_SUPORTE", demand?.idDemanda, "Alterar status", UserUtils.getLoggedUserId())
          } else if (demandStatus == "PROPOSTA_FINALIZADA") {
            DemandLogService.createDemandLog("FINALIZACAO_PROPOSTA", demand?.idDemanda, "Alterar status", UserUtils.getLoggedUserId())
          }
        }
      })

    setNotificationDemandStatus(true);
    const timer = setTimeout(() => {
      setNotificationDemandStatus(false);
      handleCloseChangeDemandStatusModal();
    }, 2200);
    return () => clearTimeout(timer);
  };

  const handleCloseManageAnalysts = () => {
    setModalManageAnalysts(false);
  };

  const handleCloseChangeDemandStatusModal = () => {
    setModalChangeDemandStatus(false);
  };



  return (
    <div>
      {notificationDemandStatus && (
        <Notification
          message={
            translate["Status da demanda atualizado com sucesso!"]?.[
              language
            ] ?? "Status da demanda atualizado com sucesso!"
          }
          severity="success"
        />
      )}
      {notificationChangeImportance && (
        <Notification
          message={
            translate["Importância da demanda atualizada com sucesso!"]?.[
              language
            ] ?? "Importância da demanda atualizada com sucesso!"
          }
          severity="success"
        />
      )}
      <ChangeDemandStatus
        isModalChangeDemandStatusOpen={modalChangeDemandStatus}
        setIsModalChangeDemandStatusOpen={setModalChangeDemandStatus}
        handleCloseChangeDemandStatusModal={handleCloseChangeDemandStatusModal}
        handlePutDemandStatus={handlePutDemandStatus}
        demandStatus={demandStatus ?? ""}
        setDemandStatus={setDemandStatus}
        translate={translate}
        language={language}
      />
      {/* Modal para alterar a importância da demanda */}
      <ChangeImportance
        isImportanceModalOpen={isImportanceModalOpen}
        setIsImportanceModalOpen={setIsImportanceModalOpen}
        demandImportance={demandImportance}
        setDemandImportance={setDemandImportance}
        handleCloseChangeDemandImportanceModal={
          handleCloseChangeDemandImportanceModal
        }
        handlePutDemandImportance={handlePutDemandImportance}
        translate={translate}
        language={language}
        fonts={fonts}
      />

      {demand && (
        <ManageAnalysts
          isAnalystsModalOpen={modalManageAnalysts}
          setIsAnalystsModalOpen={setModalManageAnalysts}
          handleCloseManageAnalysts={handleCloseManageAnalysts}
          analysts={demand.analistasResponsaveisDemanda}
          demandId={demand.idDemanda}
        />
      )}

      {anyEmptyField && (
        <Notification
          message={
            translate["Preencha todos os campos!"]?.[language] ??
            "Preencha todos os campos!"
          }
          severity="warning"
        />
      )}
      {notificationClassifiedDemand && (
        <Notification
          message={
            translate["Demanda classificada com sucesso!"]?.[language] ??
            "Demanda classificada com sucesso!"
          }
          severity="success"
        />
      )}
      {openNotification && (
        <Notification
          message={
            translate["Demanda aprovada com sucesso!"]?.[language] ??
            "Demanda aprovada com sucesso"
          }
          severity="success"
        />
      )}

      {/* Modal para confirmar a demanda */}
      <Modal
        open={openApproveDemandModal}
        onClose={handleCloseApproveDemand}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleApproveDemand}>
          <div className="grid items-center justify-center gap-8">
            <div className="grid items-center justify-center gap-2">
              <div className="flex items-center justify-center">
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    color: "#0075B1",
                    fontSize: "5rem",
                  }}
                />
              </div>
              <h1
                style={{ fontSize: fonts.lg }}
                className="font-semibold text-light-blue-weg"
              >
                {translate["Deseja aprovar a demanda?"]?.[language]}
              </h1>
            </div>
            <div className="flex items-center justify-around">
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
                onClick={handleCloseApproveDemand}
              >
                {translate["Cancelar"]?.[language]}
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
                onClick={handleApproveDemand}
              >
                {translate["Aprovar"]?.[language]}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Modal para inserir o motivo da reprovação */}
      <ReturnReasonModal
        isReasonOfModalOpen={isReasonOfModalOpen}
        setIsReasonOfModalOpen={setIsReasonOfModalOpen}
        getIsDevolution={getIsDevolution}
        demandId={params.id}
      />
      {/* Fim modal para inserir motivo da reprovação */}

      {/* Modal para inserir as informações da demanda */}
      <Modal
        open={openModal} //openModal
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="flex h-full justify-between">
            <div className="flex-1 border-r-2 p-4">
              <div className="h-[90%]">
                <p
                  style={{ fontSize: fonts.lg }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  {translate["Insira as seguintes informações"]?.[language] ??
                    "Insira as seguintes informações"}
                </p>
                <div className="mt-8">
                  <div className="mb-14 flex justify-between">
                    <div>
                      <p className="font-roboto font-bold text-dark-blue-weg">
                        {translate["Seção da TI responsável"]?.[language] ??
                          "Seção da TI responsável"}
                      </p>
                      <FormControl variant="outlined" size="small">
                        <Autocomplete
                          size="small"
                          disablePortal
                          options={responsableITSections.map(
                            (option) => option.text
                          )}
                          renderInput={(params) => <TextField {...params} />}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                          value={responsableSection}
                          onChange={(event, newValue) => {
                            setResponsableSection(newValue);
                          }}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <p className="font-roboto font-bold text-dark-blue-weg">
                        {translate["BU solicitante"]?.[language] ??
                          "BU solicitante"}
                      </p>
                      <FormControl fullWidth size="small">
                        <Select
                          value={requesterBu}
                          onChange={handleChangeRequesterBu}
                        >
                          {businessUnits &&
                            businessUnits.map((item, i) => (
                              <MenuItem key={i} value={item.key}>
                                {item.text}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-roboto font-bold text-dark-blue-weg">
                        {translate["BUs beneficiadas"]?.[language] ??
                          "BUs beneficiadas"}
                      </p>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          sx={{
                            width: 250,
                          }}
                          size="small"
                          multiple
                          options={businessUnits ? businessUnits : []}
                          getOptionLabel={(option) => option.text}
                          value={benefitedBus}
                          onChange={(event, newValues) => {
                            setBenefitedBus(newValues);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                maxHeight: 90,
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <p className="font-roboto font-bold text-dark-blue-weg">
                        {translate["Classificação de tamanho"]?.[language] ??
                          "Classificação de tamanho"}
                      </p>
                      <FormControl fullWidth size="small">
                        <Select
                          value={classifyDemandSize}
                          onChange={handleChangeClassifyDemandSize}
                        >
                          {demandSizes.map((item, i) => (
                            <MenuItem
                              key={i}
                              sx={{ width: "100%" }}
                              value={item.key}
                            >
                              <div className="flex w-52 justify-between">
                                <p>{item.text}</p>
                                <p
                                  style={{ fontSize: fonts.sm }}
                                  className="text-blue-weg"
                                >
                                  {item.description}
                                </p>
                              </div>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-[10%] justify-around">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#C2BEBE",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#C2BEBE",
                    },
                  }}
                  onClick={handleCloseModal}
                >
                  {translate["Cancelar"]?.[language] ?? "Cancelar"}
                </Button>
                <Button
                  onClick={() => setIsReasonOfModalOpen(true)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#0075B1",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  {translate["Devolver"]?.[language] ?? "Devolver"}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0075B1",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                  onClick={handleAnalystClassifyDemand}
                >
                  {translate["Enviar"]?.[language] ?? "Enviar"}
                </Button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <p
                style={{ fontSize: fonts.lg }}
                className="font-roboto font-bold text-blue-weg"
              >
                {translate["Demandas similares"]?.[language] ??
                  "Demandas similares"}
              </p>
              <div
                className="mt-5 max-h-[31.5rem] overflow-y-scroll scrollbar-thin
                scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full scrollbar-w-2"
              >
                {similarDemands &&
                  similarDemands.map((sd) => (
                    <div
                      onClick={() => {
                        accessSimilarDemand(sd.demanda.id_demanda);
                      }}
                      className="flex
                      cursor-pointer
                      rounded
                      border-b-2
                      p-2
                      hover:bg-[#c9c9c933]"
                    >
                      <Tooltip
                        title={
                          sd.demanda.titulo.length > 30
                            ? sd.demanda.titulo.length
                            : ""
                        }
                      >
                        <div className="flex flex-[3] items-center">
                          <p className="text-base text-blue-weg">
                            {sd.demanda.id_demanda}
                          </p>
                          <p className="text-lg text-blue-weg">
                            -{" "}
                            {sd.demanda.titulo.length > 30
                              ? sd.demanda.titulo.substring(0, 30) + "..."
                              : sd.demanda.titulo}
                          </p>
                        </div>
                      </Tooltip>
                      <div className="flex flex-1 justify-end">
                        <Tooltip
                          title={
                            translate["Similaridade"]?.[language] ??
                            "Similaridade"
                          }
                        >
                          <p className="text-lg text-blue-weg">
                            {sd.similaridade * 100}%
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Fim modal para inserir informações */}
      <div className="flex h-[5rem] items-center justify-around shadow-page-title-shadow">
        <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate[phrase]?.[language]
            ? translate[phrase]?.[language] + " " + props.children[1]
            : props.children}
        </h1>

        {ableToEdit() && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00579D",
              columnGap: 2,
              width: 50,
              height: 40,
            }}
            onClick={editDemand}
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
            <Tooltip title="Editar">
              <ModeEditIcon />
            </Tooltip>
          </Button>
        )}

        {user.cargoUsuario != "SOLICITANTE" &&
          demand?.solicitanteDemanda.numeroCadastroUsuario !=
            UserUtils.getLoggedUserId() && (
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
                {translate["Ações"]?.[language] ?? "Ações"}
                {openActions ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Button>
            </ButtonGroup>
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
                    {actionOptions.map((option, index) => {
                      if (
                        option.role.includes(user.cargoUsuario) &&
                        (option.demandStatus.includes(demand.statusDemanda) ||
                          option.demandStatus.includes("TODAS")) &&
                        !option.notDemandStatus.includes(demand.statusDemanda)
                      ) {
                        return (
                          <MenuItem
                            onClick={() => {
                              option.function();
                              setSelectedKey(option.key);
                            }}
                            key={option.key}
                          >
                            {option.text}
                          </MenuItem>
                        );
                      } else {
                        return null;
                      }
                    })}
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
            placeholder={
              translate["Procure aqui"]?.[language] ?? "Procure aqui"
            }
            inputProps={{
              "aria-label": `${
                translate["Procure aqui"][language] ?? "Procure aqui"
              }`,
            }}
          />
        </Paper>
      </div>
    </div>
  );
}
