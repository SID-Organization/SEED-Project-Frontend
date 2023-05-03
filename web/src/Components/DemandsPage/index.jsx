// import { useEffect, useState } from "react";
// import DemandType from "./DemandType-ENUM";

// //Services
// import DemandService from "../../service/Demand-Service";
// import DemandLogService from "../../service/DemandLog-Service";
// import DemandCard from "../Demand-card";
// import { Pagination } from "@mui/material";
// import DemandsList from "../Demand-card-list";

// export default function DemandsPage(props) {
//   const [isListFormat, setIsListFormat] = useState(false);
//   const [user, setUser] = useState(UserUtils.getLoggedUser());

//   const [demandsWLogs, setDemandsWLogs] = useState();
//   const [dbDemands, setDbDemands] = useState();
//   const [sortedDemands, setSortedDemands] = useState([]);
//   const [showingDemands, setShowingDemands] = useState([]);

//   const [filter, setFilter] = useState({ filterId: 0, filterType: "date" });
//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1); // Define a página atual como 1
//   const demandsPerPage = 12; // Define o número de demandas por página
//   const lastIndex = currentPage * demandsPerPage; // Último índice das demandas a serem mostradas
//   const firstIndex = lastIndex - demandsPerPage; // Primeiro índice das demandas a serem mostradas

//   useEffect(() => {
//     if (props.DemandType == DemandType.DEMAND) {
//       DemandService.getDemandsByRequestorId(user.numeroCadastroUsuario).then(
//         (demands) => {
//           console.log("Demands carregadas:", demands);
//           setDbDemands(demands.filter((d) => d.statusDemanda != "RASCUNHO"));
//         }
//       );
//     } else if (props.DemandType == DemandType.DRAFT) {
//       DemandService.getDraftsByRequestorId(user.numeroCadastroUsuario).then(
//         (demands) => {
//           console.log("Demands carregadas:", demands);
//           setDbDemands(demands.filter((d) => d.statusDemanda == "RASCUNHO"));
//         }
//       );
//     } else {
//       DemandService.getDemandsToManage(
//         user.numeroCadastroUsuario,
//         user.cargoUsuario
//       ).then((data) => {
//         let demandsToManage = data;
//         if (user.cargoUsuario === "GERENTE") {
//           demandsToManage = demandsToManage.filter(
//             (item) => item.statusDemanda === "CLASSIFICADO_PELO_ANALISTA"
//           );
//         }
//         setDbDemands(demandsToManage);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (dbDemands) {
//       console.log("Chamando getDemandsLogs()");
//       getDemandsLogs();
//     }
//   }, [dbDemands]);

//   useEffect(() => {
//     if (demandsWLogs) {
//       console.log("Chamando updateDemandSort()");
//       updateDemandSort(search);

//       if (sortedDemands) {
//         setShowingDemands(sortedDemands);
//       }
//     }
//   }, [filter, demandsWLogs]);

//   function getDemandsList() {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <DemandsList demands={showingDemands} />
//       </div>
//     );
//   }

//   function getDemandsGrid() {
//     const showingDemandsPaginated = showingDemands
//       ? showingDemands.slice(firstIndex, lastIndex)
//       : []; // Fatiamento das demandas

//     const handleChangePage = (event, value) => {
//       // Função para alterar a página atual
//       setCurrentPage(value);
//     };

//     return (
//       <div>
//         <div className="flex w-full flex-wrap justify-around gap-4">
//           {showingDemandsPaginated &&
//             showingDemandsPaginated.map((demand, i) => {
//               return <DemandCard key={i} demand={demand} />;
//             })}
//         </div>
//         <div className="mt-4 flex w-full justify-center">
//           {showingDemands.length > 0 && (
//             <Pagination
//               count={Math.ceil(showingDemands?.length / demandsPerPage)}
//               page={currentPage}
//               onChange={handleChangePage}
//               color="primary"
//             />
//           )}
//         </div>
//       </div>
//     );
//   }

//   const getDemandsLogs = async () => {
//     let demandsHistoric = dbDemands.map(async (demand) => {
//       let demandHistoric = DemandLogService.getDemandLogs(demand.idDemanda);

//       return {
//         ...demand,
//         historico: await demandHistoric,
//       };
//     });

//     setDemandsWLogs(await Promise.all(demandsHistoric));
//   };

//   const updateDemandSort = (search) => {
//     let sortedDemands;
//     if (demandsWLogs) {
//       sortedDemands = demandsWLogs;

//       setSortedDemands(sortedDemands);
//     }
//   };

//   console.log("DbDemands: ", dbDemands);

//   return (
//     <div>
//       <div>
//         <SubHeader
//           setIsListFormat={setIsListFormat}
//           isListFormat={isListFormat}
//           search={search}
//           setSearch={setSearch}
//           filter={filter}
//           setFilter={setFilter}
//         >
//           Minhas demandas
//         </SubHeader>
//       </div>
//       <div className="flex flex-wrap justify-around">
//         {dbDemands && dbDemands.length > 0 ? (
//           isListFormat ? (
//             getDemandsList()
//           ) : (
//             getDemandsGrid()
//           )
//         ) : (
//           <div className="flex h-[65vh] w-full items-center justify-center">
//             <NoDemands>Sem demandas!</NoDemands>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
