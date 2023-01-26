import { useState, useEffect } from "react";

// Styles
import "../../styles/index.css";

// Components
import DemandCardList from "../../Components/Demand-card-list";
import SubHeader from "../../Components/Sub-header";

// Interfaces
import LoggedUserInterface from "../../Interfaces/user/LoggedUserInterface";
import DemandCard from "../../Components/Demand-card";
import { getMenuItemUnstyledUtilityClass } from "@mui/base";

export default function DemandManager() {
  // State to set the format of the demands
  const [isListFormat, setIsListFormat] = useState(false);

  // Search for demands to manage
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

  useEffect(() => {
    console.log("Search input", search)
  }, [search])

  return (
    <div>
      <SubHeader search={search} setSearch={setSearch} setIsListFormat={setIsListFormat} isListFormat={isListFormat}>
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <DemandCardList />
      ) : (
        <div className="flex flex-wrap justify-around">
          {demandsToManage &&
            demandsToManage
              .filter((item) => item.statusDemanda != "RASCUNHO")
              .filter((item) => {
                if(search === "") return item;
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
