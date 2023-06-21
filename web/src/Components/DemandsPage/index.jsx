import { useContext, useEffect, useState } from "react";
import DemandType from "./DemandType-ENUM";

//Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import DemandCard from "../Demand-card";
import { Box, CircularProgress, Fade, Grid, Pagination } from "@mui/material";
import DemandsList from "../Demand-card-list";

//Utils
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";

//Components
import NoContent from "../No-content";
import SubHeader from "../Sub-header";
import Notification from "../../Components/Notification";

//MUI
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

// Tools
import Draggable from "react-draggable";
import DemandFilterUtils from "../../utils/DemandFilter-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/demandsPage.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

export default function DemandsPage(props) {

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  /*
    Estão sendo utilizadas 3 variáveis para armazenar as demandas:
    - dbDemands: armazena as demandas que foram buscadas no banco de dados
    - demands: armazena as demandas com o histórico de workflow
    - showingDemands: armazena as demandas que serão mostradas na tela (Já filtradas ou ordenadas)
  */
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  //States para demandas
  const [demandsWLogs, setDemandsWLogs] = useState();
  const [dbDemands, setDbDemands] = useState([]);
  const [showingDemands, setShowingDemands] = useState([]);
  const [selectedDrafts, setSelectedDrafts] = useState([]);

  //States para filtro
  const [filters, setFilters] = useState(DemandFilterUtils.getEmptyFilter());

  //Variáveis para o Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define a página atual como 1
  const demandsPerPage = 12; // Define o número de demandas por página
  const lastIndex = currentPage * demandsPerPage; // Último índice das demandas a serem mostradas
  const firstIndex = lastIndex - demandsPerPage; // Primeiro índice das demandas a serem mostradas

  const [demandType, setDemandType] = useState(props.DemandType);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasDemands, setHasDemands] = useState(true); // Novo estado para controlar se há demandas cadastradas

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    setDemandType(props.DemandType);
    console.log("props.DemandType: ", props.DemandType);
  }, [props.DemandType]);

  const listIdsDemanda = [1, 3, 4, 5];

  const handleCreateExcel = () => {
    DemandService.createExcelTable(listIdsDemanda).then((res) => {
      let blob = new Blob([res], { type: "application/excel" });
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
      let data = new Date();
      let dataFormatada =
        data.getDate() +
        "-" +
        (data.getMonth() + 1) +
        "-" +
        data.getFullYear();
      link.href = url;
      link.download = "tabela-demandas " + dataFormatada + " .xlsx";
      link.click();
    });
  };


  // Pegar as respectivas demandas
  useEffect(() => {
    if (demandType === DemandType.DEMAND) {
      DemandService.getDemandsByRequestorId(user.numeroCadastroUsuario)
        .then((res) => {
          console.log("Requestor Demands", res.data);
          if (res.data && res.data.length > 0) {
            setDbDemands(
              res.data.filter((d) => d.statusDemanda !== "RASCUNHO")
            );
            setHasDemands(true); // Atualiza o estado para indicar que há demandas cadastradas
          } else {
            setDbDemands([]);
            setHasDemands(false); // Atualiza o estado para indicar que não há demandas cadastradas
          }
          setIsLoaded(true); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao obter as demandas:", error);
        });
    } else if (demandType === DemandType.DRAFT) {
      DemandService.getDraftsByRequestorId(user.numeroCadastroUsuario)
        .then((demands) => {
          if (demands && demands.length > 0) {
            setDbDemands(demands.filter((d) => d.statusDemanda === "RASCUNHO"));
            setHasDemands(true); // Atualiza o estado para indicar que há demandas cadastradas
          } else {
            setDbDemands([]);
            setHasDemands(false); // Atualiza o estado para indicar que não há demandas cadastradas
          }
          setIsLoaded(true); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao obter os rascunhos:", error);
        });
    } else if (demandType === DemandType.MANAGER) {
      DemandService.getDemandsToManage(
        user.numeroCadastroUsuario,
        user.cargoUsuario
      )
        .then((data) => {
          let demandsToManage = data;
          if (demandsToManage && demandsToManage.length > 0) {
            setDbDemands(demandsToManage.filter(d => d.statusDemanda != "RASCUNHO"));
            setHasDemands(true); // Atualiza o estado para indicar que há demandas cadastradas
          } else {
            setDbDemands([]);
            setHasDemands(false); // Atualiza o estado para indicar que não há demandas cadastradas
          }
          setIsLoaded(true); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao obter as demandas para gerenciar:", error);
        });
    }
  }, [demandType]);

  useEffect(() => {
    if (dbDemands && dbDemands.length > 0) {
      setIsLoaded(true);
    }
  }, [dbDemands]);

  // Verify if there are demands back from the DB and add the logs to them
  useEffect(() => {
    if (dbDemands) {
      getDemandsLogs();
    }
  }, [dbDemands]);

  // Sort demands if there are filters
  useEffect(() => {
    if (demandsWLogs) {
      let sortedDemands = DemandFilterUtils.filterBy(demandsWLogs, filters);

      if (sortedDemands) {
        setShowingDemands(sortedDemands);
      } else {
        setShowingDemands(demandsWLogs);
      }
    }
  }, [filters, demandsWLogs]);

  const getDemandsLogs = async () => {
    let demandsHistoric = dbDemands.map(async (demand) => {
      let demandHistoric = DemandLogService.getDemandLogs(demand.idDemanda);

      return {
        ...demand,
        historico: await demandHistoric,
      };
    });

    setDemandsWLogs(await Promise.all(demandsHistoric));
  };

  //DRAFT THINGS
  const [openModalConfirmationDemand, setOpenModalConfirmationDemand] =
    useState(false);
  const [
    openModalConfirmationSelectedDemand,
    setOpenModalConfirmationSelectedDemand,
  ] = useState(false);

  const ButtonAddSelected = styled(MuiButton)({
    backgroundColor: "#FFF",
    color: "#0075B1",
    fontWeight: "bold",
    border: "#0075B1 solid 1px",
    fontSize: "0.89rem",
    height: "2.5rem",

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
  const handleClickOpenModalConfirmationSelectedDemand = () => {
    setOpenModalConfirmationSelectedDemand(true);
  };

  const handleCloseModalConfirmationSelectedDemand = () => {
    setOpenModalConfirmationSelectedDemand(false);
  };

  const deleteSelectedDrafts = () => {
    DemandService.deleteListDemands(selectedDrafts).then((response) => {
      if (response.status === 200) {
        setSelectedDrafts([]);
        window.location.reload();
      }
    });
  };

  const deleteAllDrafts = () => {
    DemandService.deleteAllDrafts().then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };

  function getDemandsList() {
    return (
      <div className="flex h-full items-center justify-center">
        <DemandsList demands={showingDemands} />
      </div>
    );
  }

  function getDemandsGrid() {
    const showingDemandsPaginated = showingDemands
      ? showingDemands.slice(firstIndex, lastIndex)
      : [];
    const handleChangePage = (event, value) => {
      // Função para alterar a página atual
      setCurrentPage(value);
    };

    return (
      <>
        <Button
          disabled={false}
          variant="contained"
          onClick={handleCreateExcel}
        >
          EXCEL
        </Button>
        <Grid
          container
          gap={3}
          rowGap={1}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{ padding: "0 20px" }}
        >
          {showingDemandsPaginated &&
            showingDemandsPaginated.map((demand, i) => {
              if (demandType == DemandType.DRAFT) {
                return (
                  <DemandCard
                    key={i}
                    demand={demand}
                    setSelectedDrafts={setSelectedDrafts}
                  />
                );
              } else {
                return <DemandCard key={i} demand={demand} />;
              }
            })}
        </Grid>

        <div className="flex w-full justify-center">
          {showingDemands && showingDemands.length > 0 && (
            <Pagination
              count={Math.ceil(showingDemands?.length / demandsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <SubHeader
          setIsListFormat={setIsListFormat}
          isListFormat={isListFormat}
          setFilters={setFilters}
        >
          {demandType == DemandType.DEMAND && <p>Minhas demandas</p>}
          {demandType == DemandType.DRAFT && <p>Rascunhos</p>}
          {demandType == DemandType.MANAGER && <p>Gerenciar demandas</p>}
        </SubHeader>
      </div>
      {/* DRAFT CASE */}
      {demandType == DemandType.DRAFT && (
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
            <div className="grid items-center justify-center">
              <div className="flex items-center justify-center">
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
                  {translate["Têm certeza que deseja deletar todos os rascunhos?"]?.[language] ?? "Têm certeza que deseja deletar todos os rascunhos?"}
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
                  {translate["Cancelar"]?.[language] ?? "Cancelar"}
                </Button>
                <Button
                  onClick={deleteAllDrafts}
                  sx={{
                    backgroundColor: "#0075B1",
                    height: "2.5rem",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                >
                  {translate["Deletar tudo"]?.[language] ?? "Deletar tudo"}
                </Button>
              </div>
            </DialogActions>
          </Dialog>
          {/* FIM MODAL DELETAR TODOS OS RASCUNHOS */}
          {/* MODAL CONFIRM DELETE SELECTED DRAFTS */}
          <Dialog
            open={openModalConfirmationSelectedDemand}
            onClose={handleCloseModalConfirmationSelectedDemand}
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
            <div className="grid items-center justify-center">
              <div className="flex items-center justify-center">
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
                  {translate["Têm certeza que deseja deletar"]?.[language] ?? "Têm certeza que deseja deletar"}{" "}
                  {selectedDrafts.length > 1
                    ? translate["esses rascunhos?"]?.[language] ?? "esses rascunhos?"
                    : translate["esse rascunho?"]?.[language] ?? "esse rascunho?"}
                </p>
              </DialogTitle>
            </div>
            <DialogActions>
              <div className="flex gap-5">
                <Button
                  autoFocus
                  onClick={handleCloseModalConfirmationSelectedDemand}
                  sx={{
                    backgroundColor: "#C2BEBE",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#C2BEBE",
                    },
                  }}
                >
                  {translate["Cancelar"]?.[language] ?? "Cancelar"}
                </Button>
                <Button
                  onClick={deleteSelectedDrafts}
                  sx={{
                    backgroundColor: "#0075B1",
                    height: "2.5rem",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                >
                  {translate["Deletar"]?.[language] ?? "Deletar"}
                </Button>
              </div>
            </DialogActions>
          </Dialog>
          {/* FIM MODAL DELETAR TODOS OS RASCUNHOS SELECIONADOS */}
          {showingDemands && showingDemands.length > 0 && (
            <div className="mb-10 flex gap-10">
              <Button
                style={{ fontSize: fonts.sm }}
                onClick={handleClickOpenModalConfirmationDemand}
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#FFF",
                  height: "2.5rem",
                  marginLeft: 2,
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
                startIcon={
                  <DeleteRoundedIcon
                    sx={{
                      color: "#FFF",
                      fontSize: "0.89rem",
                    }}
                  />
                }
              >
                {translate["Deletar tudo"]?.[language] ?? "Deletar tudo"}
              </Button>
              {selectedDrafts.length > 0 && (
                <Fade
                  in={true}
                  sx={{
                    transitionDelay:
                      selectedDrafts.length > 0 ? "500ms" : "0ms",
                  }}
                >
                  <ButtonAddSelected
                    style={{ fontSize: fonts.sm }}
                    onClick={handleClickOpenModalConfirmationSelectedDemand}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={
                      <DeleteRoundedIcon
                        sx={{
                          color: "#0075B1",
                          fontSize: "0.89rem",
                        }}
                      />
                    }
                    className={`opacity-0 transition-opacity duration-300 ease-in-out ${selectedDrafts.length > 0 ? "opacity-100" : ""
                      }`}
                  >
                    {translate["Deletar"]?.[language] ?? "Deletar"} {"(" + selectedDrafts.length + ")"}{" "}
                    {selectedDrafts.length > 1 ? "rascunhos" : "rascunho"}
                  </ButtonAddSelected>
                </Fade>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-around">
        {isLoaded ? (
          showingDemands && showingDemands.length > 0 ? (
            isListFormat ? (
              getDemandsList()
            ) : (
              getDemandsGrid()
            )
          ) : (
            <div className="flex h-[65vh] items-center justify-around">
              <NoContent isManager={!(demandType == DemandType.MANAGER)}>
                <div style={{ fontSize: fonts.xl }}>
                  {demandType == DemandType.DEMAND &&
                    translate["Nenhuma demanda encontrada!"]?.[language]}
                  {demandType == DemandType.DRAFT &&
                    translate["Nenhum rascunho encontrado!"]?.[language]}
                  {demandType == DemandType.MANAGER &&
                    translate["Nenhuma demanda para gerenciar!"]?.[language]}
                </div>
              </NoContent>
            </div>
          )
        ) : (
          <div className="flex h-[71vh] items-center justify-around">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
}
