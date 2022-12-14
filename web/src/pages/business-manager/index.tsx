import { useState, useEffect } from "react";

// Styles
import "../../styles/index.css";

// Components
import DemandCardList from "../../Components/Demand-card-list";
import SubHeader from "../../Components/Sub-header";

// Interfaces
import LoggedUserInterface from "../../Interfaces/user/LoggedUserInterface";

export default function DemandManager() {

  // State to set the format of the demands
  const [isListFormat, setIsListFormat] = useState(false);

  const [user, setUser] = useState<LoggedUserInterface>(JSON.parse(localStorage.getItem("user")!))
  const [demandsToManage, setDemandsToManage] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:8080/sid/api/demanda/gerente/" + user.numeroCadastroUsuario)
      .then(response => response.json())
      .then(data => setDemandsToManage(data))
  }, [])


  return (
    <div>
      <SubHeader setIsListFormat={setIsListFormat} isListFormat={isListFormat}>
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <DemandCardList />
      ) : (
        <div className="flex flex-wrap justify-around">
        </div>
      )}
    </div>
  );
}
