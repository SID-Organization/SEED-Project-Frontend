import { useState, useEffect } from "react";

// Styles
import "../../styles/index.css";

// Components
import DemandList from "../../Components/Demand-card-list";
import SubHeader from "../../Components/Sub-header";

// Interfaces
import LoggedUserInterface from "../../Interfaces/user/LoggedUserInterface";
import DemandCard from "../../Components/Demand-card";

export default function DemandManager() {
  // State to set the format of the demands
  const [isListFormat, setIsListFormat] = useState(false);

  // Filter search for demands to manage
  const [filter, setFilter] = useState<{filterId: number, filterType: string}>({filterId: 0, filterType: "date"});
  const [search, setSearch] = useState<string>("");


  const [user, setUser] = useState<LoggedUserInterface>(
    JSON.parse(localStorage.getItem("user")!)
  );
  const [demandsToManage, setDemandsToManage] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:8080/sid/api/demanda/analista/" +
        user.numeroCadastroUsuario
    )
      .then((response) => response.json())
      .then((data) => {
        setDemandsToManage(data);
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
        >
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <div className="flex justify-center items-center h-full">
          <DemandList />
        </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {demandsToManage &&
            demandsToManage
              .filter((item) => item.statusDemanda != "RASCUNHO" && item.solicitanteDemanda.numeroCadastroUsuario !== user.numeroCadastroUsuario)
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
