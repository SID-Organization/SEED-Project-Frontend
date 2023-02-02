import react from "react";

import { useState, useEffect } from "react";

import DemandCard from "../../../Components/Demand-card";
import { useParams } from "react-router";
import DemandCardProps from "../../../Interfaces/demand/DemandCardPropsInterface";

interface TableProps {
  numberOfRows: number;
  numberOfColumns: number;
  table: string[][];
}

interface ITableProps {
  row: string[];
}

const TableRow: React.FC<ITableProps> = (props) => {
  return (
    <div className="flex border border-black rounded my-2">
      {props.row.map((cell, index) => (
        <input key={index} value={cell} className="p-2 border border-black" />
      ))}
    </div>
  );
};

export default function GenerateProposal(props: TableProps) {
  const [demand, setDemand] = useState<any>();
  const [numberOfRows, setNumberOfRows] = useState<number>(0);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(0);
  const [table, setTable] = useState<string[][]>([]);

  const handleCreateTable = () => {
    setNumberOfRows(parseInt(prompt("Insira o número de linhas")!));
    setNumberOfColumns(parseInt(prompt("Insira o número de colunas")!));
    let newTable: string[][] = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row: string[] = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push("");
      }
      newTable.push(row);
    }
    setTable(newTable);
  };

  let demandId = useParams().id;

  async function getDemandFromDatabase() {
    const response = await fetch(
      `http://localhost:8080/sid/api/demanda/id/${demandId}`
    );
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getDemandFromDatabase().then((demand) => {
      setDemand(demand);
    });
  }, []);

  useEffect(() => {
    console.log("demand ", demand);
  }, [demand]);

  return (
    <div>
      <div className="grid justify-center items-center gap-5">
        <h1
          className="
          flex items-center justify-center
          text-2xl font-roboto mt-5 font-bold text-blue-weg
        "
        >
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1
          className="
          flex items-center justify-start
          text-xl font-roboto mt-5 font-bold p-5
        "
        >
          Escopo do projeto
        </h1>
        <h1 className="flex justify-center items-center">
          ** EDITOR DE TEXTO AQUI **
        </h1>
      </div>
      <div>
        <h1
          className="
          flex items-center justify-center
          text-2xl font-roboto mt-5 font-bold text-blue-weg
        "
        >
          Tabela de custos:{" "}
        </h1>
        <br />
        <br />
        <button onClick={handleCreateTable}>Criar Tabela</button>
        <div className="mt-5">
          <table className="table-auto border-2 border-black">
            <thead>
              <tr>
                {Array.from({ length: numberOfColumns }).map((_, index) => (
                  <th key={index} className="border-2 border-black p-2">
                    Coluna {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border-2 border-black p-2">
                      <input value={cell} className="p-1" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
