import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DemandCard from "../../../Components/Demand-card";
import { IconButton, Tooltip } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function GenerateProposal() {
  const [demand, setDemand] = useState<any>();
  const [numRows, setNumRows] = useState(0);
  const [numColumns, setNumColumns] = useState(0);
  const [tables, setTables] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTable = () => {
    setTables([
      ...tables,
      Array.from({ length: numRows }, () =>
        Array.from({ length: numColumns }, () => "")
      ),
    ]);
  };

  const handleCreateTable = () => {
    const data = Array.from({ length: numRows }, () =>
      Array.from({ length: numColumns }, () => "")
    );
    setTables([...tables, data]);
  };

  const handleCellChange = (rowIndex: any, cellIndex: any, value: string) => {
    const newTables = tables.map((table: any[], tableIndex: number) => {
      if (tableIndex === tables.length - 1) {
        return table.map((row, rowI) => {
          if (rowI === rowIndex) {
            return row.map((cell: any, cellI: any) => {
              if (cellI === cellIndex) {
                return value;
              }
              return cell;
            });
          }
          return row;
        });
      }
      return table;
    });
    setTables(newTables);
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

  return (
    <div>
      <div className="grid justify-center items-center gap-5">
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1 className="flex items-center justify-start text-xl font-roboto mt-5 font-bold p-5">
          Escopo do projeto
        </h1>
        <h1 className="flex justify-center items-center">
          ** EDITOR DE TEXTO AQUI **
        </h1>
      </div>
      <div>
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Tabela de custos:{" "}
        </h1>
        <div className="flex justify-center items-center">
          <Tooltip title="Adicionar tabela">
            <IconButton onClick={handleClickOpen}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nova tabela</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="columns"
              label="Colunas"
              type="number"
              value={numColumns}
              onChange={(e) => setNumColumns(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="rows"
              label="Linhas"
              type="number"
              value={numRows}
              onChange={(e) => setNumRows(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={createTable} color="primary">
              Criar tabela
            </Button>
          </DialogActions>
        </Dialog>
        {tables.map((data: any[], index: React.Key | null | undefined) => (
          <TableContainer key={index}>
            <Table style={{ width: "100%", borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f2f2f2" }}>
                  {Array.from({ length: numColumns }, (_, i) => (
                    <TableCell key={i} style={{ border: "1px solid #d3d3d3" }}>
                      Coluna {i + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map(
                      (
                        cell: unknown,
                        cellIndex: React.Key | null | undefined
                      ) => (
                        <TableCell
                          key={cellIndex}
                          style={{
                            border: "1px solid #d3d3d3",
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#fafafa" : "",
                          }}
                        >
                          <TextField
                            value={cell}
                            onChange={(e) =>
                              handleCellChange(
                                rowIndex,
                                cellIndex,
                                e.target.value
                              )
                            }
                            fullWidth
                            InputProps={{
                              disableUnderline: true,
                              style: {
                                backgroundColor: "transparent",
                                border: "none",
                                padding: 0,
                              },
                            }}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </div>
    </div>
  );
}
