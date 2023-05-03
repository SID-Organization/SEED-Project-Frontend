import { useEffect, useState } from "react";
import DemandType from "./DemandType-ENUM";

//Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import DemandCard from "../Demand-card";
import { Fade, Pagination } from "@mui/material";
import DemandsList from "../Demand-card-list";

//Utils
import UserUtils from "../../utils/User-Utils";

//Components
import NoDemands from "../../Components/No-demands";
import SubHeader from "../Sub-header";

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

export default function DemandsPage(props) {
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
  const [dbDemands, setDbDemands] = useState();
  const [sortedDemands, setSortedDemands] = useState([]);
  const [showingDemands, setShowingDemands] = useState([]);
  const [selectedDrafts, setSelectedDrafts] = useState([]);

  //States para filtro
  const [filter, setFilter] = useState({ filterId: 0, filterType: "date" });
  const [search, setSearch] = useState("");

  //Variáveis para o Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define a página atual como 1
  const demandsPerPage = 12; // Define o número de demandas por página
  const lastIndex = currentPage * demandsPerPage; // Último índice das demandas a serem mostradas
  const firstIndex = lastIndex - demandsPerPage; // Primeiro índice das demandas a serem mostradas

  const [demandType, setDemandType] = useState(props.DemandType);

  // const [showingDemandsPaginated, setShowingDemandsPaginated] = useState(
  //   showingDemands ? showingDemands.slice(firstIndex, lastIndex) : []
  // ); // Fatiamento das demandas

  const [showingDemandsPaginated, setShowingDemandsPaginated] = useState([]);

  useEffect(() => {
    setDemandType(props.DemandType);
    console.log("props.DemandType: ", props.DemandType);
  }, [props.DemandType]);

  //Pegar as respectivas demandas
  useEffect(() => {
    if (demandType == DemandType.DEMAND) {
      console.log("ENTROU DEMAND");
      DemandService.getDemandsByRequestorId(user.numeroCadastroUsuario).then(
        (demands) => {
          setDbDemands(demands.filter((d) => d.statusDemanda != "RASCUNHO"));
        }
      );
    } else if (demandType == DemandType.DRAFT) {
      console.log("ENTROU DRAFT");
      DemandService.getDraftsByRequestorId(user.numeroCadastroUsuario).then(
        (demands) => {
          setDbDemands(demands.filter((d) => d.statusDemanda == "RASCUNHO"));
        }
      );
    } else {
      console.log("ENTROU GERENTE");
      DemandService.getDemandsToManage(
        user.numeroCadastroUsuario,
        user.cargoUsuario
      ).then((data) => {
        let demandsToManage = data;
        if (user.cargoUsuario === "GERENTE") {
          demandsToManage = demandsToManage.filter(
            (item) => item.statusDemanda === "CLASSIFICADO_PELO_ANALISTA"
          );
        }
        setDbDemands(demandsToManage);
        console.log("Demands to manage: ", demandsToManage);
      });
    }
  }, []);

  useEffect(() => {
    if (dbDemands) {
      if (demandType == DemandType.DEMAND) {
        console.log("Demands carregadas:", dbDemands);
      } else if (demandType == DemandType.DRAFT) {
        console.log("Drafts carregados:", dbDemands);
      } else {
        console.log("Demands to manage: ", dbDemands);
      }
      getDemandsLogs();
    }
  }, [dbDemands]);

  useEffect(() => {
    if (demandsWLogs) {
      updateDemandSort(search);

      if (sortedDemands) {
        setShowingDemands(sortedDemands);
      }
    }
  }, [filter, demandsWLogs]);

  useEffect(() => {
    if (showingDemands) {
      setShowingDemandsPaginated(showingDemands.slice(firstIndex, lastIndex));
    }
  }, [showingDemands]);

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

  const updateDemandSort = (search) => {
    let sortedDemands;
    if (demandsWLogs) {
      sortedDemands = demandsWLogs;

      setSortedDemands(sortedDemands);
    }
  };

  // useEffect(() => {
  //   if (!demandsToManage) return;
  //   setFilteredDemands(demandsToManage);
  // }, [demandsToManage]);

  // useEffect(() => {
  //   if (!filters) return;
  //   const filtered = DemandFilterUtils.filterBy(demandsToManage, filters);
  //   setFilteredDemands(filtered);
  // }, [filters]);

  // console.log("DbDemands: ", dbDemands);

  //DRAFT THINGS
  const [openModalConfirmationDemand, setOpenModalConfirmationDemand] =
    useState(false);

  const ButtonAddSelected = styled(MuiButton)({
    backgroundColor: "#FFF",
    color: "#0075B1",
    fontWeight: "bold",
    border: "#0075B1 solid 1px",
    fontSize: "0.89rem",
    width: 260,
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

  const deleteSelectedDrafts = () => {
    DemandService.deleteListDemands(selectedDrafts).then((response) => {
      if (response.status === 200) {
        setSelectedDrafts([]);
        window.location.reload();
      }
    });
  };

  const deleteAllDrafts = () => {
    DemandService.deleteAllDemands().then((response) => {
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
    const handleChangePage = (event, value) => {
      // Função para alterar a página atual
      setCurrentPage(value);
    };

    return (
      <div>
        <div className="flex w-full flex-wrap justify-around gap-4">
          {showingDemandsPaginated &&
            showingDemandsPaginated.map((demand, i) => {
              return <DemandCard key={i} demand={demand} />;
            })}
        </div>
        <div className="mt-4 flex w-full justify-center">
          {showingDemands.length > 0 && (
            <Pagination
              count={Math.ceil(showingDemands?.length / demandsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <SubHeader
          setIsListFormat={setIsListFormat}
          isListFormat={isListFormat}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
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
                  Deletar tudo
                </Button>
              </div>
            </DialogActions>
          </Dialog>
          {/* FIM MODAL DELETAR TODOS OS RASCUNHOS */}
          {dbDemands && dbDemands.length > 0 && (
            <div className="mb-10 flex gap-10">
              <Button
                onClick={handleClickOpenModalConfirmationDemand}
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#FFF",
                  fontSize: "0.89rem",
                  width: 200,
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
                Deletar tudo
              </Button>
              {selectedDrafts.length > 0 && (
                <Fade
                  in={selectedDrafts.length > 0}
                  unmountOnExit
                  sx={{
                    transitionDelay:
                      selectedDrafts.length > 0 ? "500ms" : "0ms",
                  }}
                >
                  <ButtonAddSelected
                    onClick={deleteSelectedDrafts}
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
                    className={`opacity-0 transition-opacity duration-300 ease-in-out ${
                      selectedDrafts.length > 0 ? "opacity-100" : ""
                    }`}
                  >
                    Deletar {"(" + selectedDrafts.length + ")"}{" "}
                    {selectedDrafts.length > 1 ? "rascunhos" : "rascunho"}
                  </ButtonAddSelected>
                </Fade>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-around">
        {dbDemands && dbDemands.length > 0 ? (
          isListFormat ? (
            getDemandsList()
          ) : (
            getDemandsGrid()
          )
        ) : (
          <div className="flex h-[65vh] w-full items-center justify-center">
            <NoDemands>
              {demandType == DemandType.DEMAND ? (
                <p>Sem demandas!</p>
              ) : (
                <p>Sem rascunhos!</p>
              )}
            </NoDemands>
          </div>
        )}
      </div>
    </div>
  );
}
