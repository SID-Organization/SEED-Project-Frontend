import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Description,
  Delete,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/filesTable.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";

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

export default function FilesTable({ files }) {

  const translate = TranslationJson;
  let language = TranslateUtils.getLanguage();

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  return (
    <div className="mt-16 grid items-center justify-center">
      <div className="flex items-center justify-center">
        <h1
          style={{ fontSize: fonts.xl }}
          className="mb-5 font-roboto font-bold text-dark-blue-weg"
        >
          {translate["Arquivos anexados"]?.[language] ?? "Arquivos anexados"}
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
                  style={{ fontSize: fonts.xl }}
                  align="center"
                  sx={{
                    "&:first-child": {
                      backgroundColor: "#e5e5e5",
                      color: "black",
                      fontWeight: "bold",
                      border: "#d4d4d4 solid 2px",
                    },
                  }}
                >
                  {translate["Arquivo"]?.[language] ?? "Arquivo"}
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontSize: fonts.xl }}
                  align="center"
                  sx={{
                    border: "#d4d4d4 solid 2px",
                    "&:last-child": {
                      backgroundColor: "#e5e5e5",
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                >
                  {translate["Anexado em"]?.[language] ?? "Anexado em"}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files &&
                files?.map((fileRow, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row" align="center">
                      <a
                        href={`data:${fileRow.tipoArquivo};base64,${fileRow.arquivo}`}
                        download={fileRow.nomeArquivo.split(".")[0]}
                      >
                        <Tooltip title={translate["Baixar arquivo"]?.[language] ?? "Baixar arquivo"}>
                          <Description className="mr-5 flex cursor-pointer items-center justify-center text-light-blue-weg" />
                        </Tooltip>
                      </a>
                      {fileRow.nomeArquivo}
                    </StyledTableCell>
                    <div className="flex items-center justify-center">
                      <StyledTableCell align="center">
                        {new Date(
                          fileRow.dataRegistroArquivo
                        ).toLocaleDateString()}
                      </StyledTableCell>
                      <Tooltip title={translate["Deletar arquivo"]?.[language] ?? "Deletar arquivo"}>
                        <Delete className="ml-5 flex cursor-pointer items-center justify-center text-light-blue-weg" />
                      </Tooltip>
                    </div>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <div className="mb-5 mt-5 flex items-center justify-center">
            <Tooltip title={translate["Adicionar arquivo"]?.[language] ?? "Adicionar arquivo"}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#0075B1",
                }}
              >
                <InsertDriveFileOutlined className="mr-5 flex cursor-pointer items-center justify-center text-white" />
                <span style={{ fontSize: fonts.sm }}>{translate["Anexar arquivo"]?.[language] ?? "Anexar arquivo"}</span>
                <input hidden accept="file/*" multiple type="file" />
              </Button>
            </Tooltip>
          </div>
        </TableContainer>
      </div>
    </div>
  );
}
