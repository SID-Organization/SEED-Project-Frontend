import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";

interface Data {
  recebimento: string;
  conclusao: string;
  prazo: string;
  tarefa: string;
  responsavel: string;
  acao: string;
  status: string;
  versao: string;
}

function createData(
  recebimento: string,
  conclusao: string,
  prazo: string,
  tarefa: string,
  responsavel: string,
  acao: string,
  status: string,
  versao: string
): Data {
  return {
    recebimento,
    conclusao,
    prazo,
    tarefa,
    responsavel,
    acao,
    status,
    versao,
  };
}

const rows = [
  createData(
    "01/01/2021 - 10:00",
    "01/01/2021 - 10:00",
    "20/01/2021 - 10:00",
    "Elaboração de documento",
    "João da Silva",
    "Aprovar",
    "Aprovado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
  createData(
    "02/10/2022 - 11:00",
    "03/04/2022 - 10:00",
    "01/01/2021 - 10:00",
    "Banco de dados",
    "Maria da Silva",
    "Deletar",
    "Cancelado",
    "1.0"
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "recebimento",
    numeric: false,
    disablePadding: true,
    label: "Recebimento",
  },
  {
    id: "conclusao",
    numeric: true,
    disablePadding: false,
    label: "Conclusão",
  },
  {
    id: "prazo",
    numeric: true,
    disablePadding: false,
    label: "Prazo",
  },
  {
    id: "tarefa",
    numeric: true,
    disablePadding: false,
    label: "Tarefa",
  },
  {
    id: "responsavel",
    numeric: true,
    disablePadding: false,
    label: "Responsável",
  },
  {
    id: "acao",
    numeric: true,
    disablePadding: false,
    label: "Ação",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "versao",
    numeric: true,
    disablePadding: false,
    label: "Versão",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "#b9b9b952",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: "bold",
              border: "1px solid #2717171a",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("recebimento");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "71rem", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.recebimento}
                      sx={{
                        border: "1px solid #8585856c",
                      }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.recebimento}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.conclusao}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.prazo}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.tarefa}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.responsavel}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.acao}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #8585856c",
                        }}
                      >
                        {row.versao}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
