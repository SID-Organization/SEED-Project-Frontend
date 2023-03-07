import { useState, useEffect } from "react";

// Styles
import "../../styles/index.css";

// Components
import DemandList from "../../Components/Demand-card-list";
import SubHeader from "../../Components/Sub-header";

// Interfaces
import DemandCard from "../../Components/Demand-card";

export default function DemandManager() {
  // State to set the format of the demands
  const [isListFormat, setIsListFormat] = useState(false);

  // Filter search for demands to manage
  const [filter, setFilter] = useState({filterId: 0, filterType: "date"});
  const [search, setSearch] = useState("");


  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [demandsToManage, setDemandsToManage] = useState([]);

  useEffect(() => {
    if(demandsToManage) {
      console.log(demandsToManage)
    }
  }, [demandsToManage])

  useEffect(() => {

    const getUserRoleToURL = () => {
      if(user.cargoUsuario === "ANALISTA") return "analista";
      if(user.cargoUsuario === "GERENTE") return "gerente-da-area";
      if(user.cargoUsuario === "GESTOR_TI") return "gestor-ti";
    }

    fetch(
      `http://localhost:8080/sid/api/demanda/${getUserRoleToURL()}/${user.numeroCadastroUsuario}`
    )
      .then((response) => response.json())
      .then((data) => {
        let demandsToManage = data;
        if(user.cargoUsuario === "GERENTE") {
          demandsToManage = demandsToManage.filter((item) => item.statusDemanda === "CLASSIFICADO_PELO_ANALISTA");
        }
        setDemandsToManage(demandsToManage);
      });
  }, []);

  
  return (
    <div>
      <SubHeader
        search={search}
        setSearch={setSearch}
        setIsListFormat={setIsListFormat}
        isListFormat={isListFormat}
        setFilter={setFilter}
        filter={filter}
        >
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <div className="flex justify-center items-center h-full">
          <DemandList demands={demandsToManage}/>
        </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {demandsToManage &&
            demandsToManage
              .filter((item) => {
                if(search.length < 3) return item;
                else if(item.tituloDemanda.toLowerCase().includes(search.toLowerCase())) return item;
              })
              .map((demand, i) => {
                return <DemandCard key={i} demand={demand} />;
              })
              }
        </div>
      )}
    </div>
  );
}
