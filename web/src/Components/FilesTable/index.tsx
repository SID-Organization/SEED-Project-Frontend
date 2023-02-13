import React from 'react'

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    Tooltip,
    Button
} from '@mui/material'
import {Description, Delete, InsertDriveFileOutlined} from '@mui/icons-material'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "left",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

export default function FilesTable({ files } : any) {
  return (
    <div className="grid justify-center items-center mt-16">
          <div className="flex justify-center items-center">
            <h1 className="mb-5 font-roboto text-2xl font-bold text-dark-blue-weg">
              Arquivos anexados
            </h1>
          </div>
          <div>
            <TableContainer
              component={Paper}
              sx={{
                "&:first-child": {
                  backgroundColor: "#e5e5e5",
                },
              }}
            >
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      sx={{
                        "&:first-child": {
                          backgroundColor: "#e5e5e5",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          border: "#d4d4d4 solid 2px",
                        },
                      }}
                    >
                      Arquivo
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                        border: "#d4d4d4 solid 2px",
                        "&:last-child": {
                          backgroundColor: "#e5e5e5",
                          color: "black",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      Anexado em
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files &&
                    files?.map((fileRow : any, i: number) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <a
                            href={`data:${fileRow.tipoArquivo};base64,${fileRow.arquivo}`}
                            download={fileRow.nomeArquivo.split(".")[0]}
                          >
                            <Tooltip title="Baixar arquivo">
                              <Description className="text-light-blue-weg cursor-pointer flex justify-center items-center mr-5" />
                            </Tooltip>
                          </a>
                          {fileRow.nomeArquivo}
                        </StyledTableCell>
                        <div className="flex justify-center items-center">
                          <StyledTableCell align="center">
                            {new Date(
                              fileRow.dataRegistroArquivo
                            ).toLocaleDateString()}
                          </StyledTableCell>
                          <Tooltip title="Deletar arquivo">
                            <Delete className="text-light-blue-weg cursor-pointer flex justify-center items-center ml-5" />
                          </Tooltip>
                        </div>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="flex justify-center items-center mt-5 mb-5">
                <Tooltip title="Adicionar arquivo">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#0075B1",
                    }}
                  >
                    <InsertDriveFileOutlined className="text-white cursor-pointer flex justify-center items-center mr-5" />
                    Anexar arquivo
                    <input hidden accept="file/*" multiple type="file" />
                  </Button>
                </Tooltip>
              </div>
            </TableContainer>
          </div>
        </div>
  )
}
