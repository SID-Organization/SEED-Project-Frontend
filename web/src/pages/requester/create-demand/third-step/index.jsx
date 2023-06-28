// React
import React, { useState, useEffect, useContext } from "react";

// MUI
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Tooltip,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";

// Icons
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";

// Styled Components
import MUISC from "../../../../styles/Mui-Styled-Components";

//Utils
import FontSizeUtils from "../../../../utils/FontSize-Utils";

//Translation
import TranslationJson from "../../../../API/Translate/pages/requester/createDemandThirdStep.json"
import { TranslateContext } from "../../../../contexts/translate/index";

export default function ThirdStep({ props }) {

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  return (
    <div>
      <div className="mb-10 grid">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl text-light-blue-weg">{translate["UPLOAD DE ARQUIVOS"]?.[language] ?? "UPLOAD DE ARQUIVOS"}</h1>
        </div>
        <div className="grid h-[380px] w-[830px] shadow-2xl">
          <div className="flex items-center justify-center">
            {props.selectedFiles?.length > 0 ? (
              <TableContainer
                component={Paper}
                sx={{
                  "&:first-child": {
                    backgroundColor: "#FFF",
                  },
                }}
              >
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <MUISC.StyledTableCell
                        align="center"
                        sx={{
                          "&:first-child": {
                            backgroundColor: "#FFF",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            border: "#0075B1 solid 2px",
                          },
                        }}
                      >
                        {translate["Arquivo"]?.[language] ?? "Arquivo"}
                      </MUISC.StyledTableCell>
                      <MUISC.StyledTableCell
                        align="center"
                        sx={{
                          fontSize: "1.2rem",
                          border: "#0075B1 solid 2px",
                          "&:last-child": {
                            backgroundColor: "#FFF",
                            color: "black",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        {translate["Tamanho"]?.[language] ?? "Tamanho"}
                      </MUISC.StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.filesTableRows.map((row) => (
                      <MUISC.StyledTableRow key={row.name}>
                        <MUISC.StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <div className="flex items-center justify-center">
                            <Tooltip title="Baixar arquivo">
                              <DescriptionIcon className="mr-5 flex cursor-pointer items-center justify-center text-light-blue-weg" />
                            </Tooltip>
                            <h1
                              style={{ fontSize: fonts.base }}
                              className="font-roboto text-[#000]"
                            >
                              {row.name}
                            </h1>
                          </div>
                        </MUISC.StyledTableCell>
                        <div className="flex items-center justify-center">
                          <MUISC.StyledTableCell align="center">
                            <h1
                              style={{ fontSize: fonts.base }}
                              className="font-roboto text-[#000]"
                            >
                              {row.size}
                            </h1>
                          </MUISC.StyledTableCell>
                          <Tooltip title="Deletar arquivo">
                            <DeleteIcon
                              onClick={() => {
                                props.setSelectedFiles(props.selectedFiles.filter((file) => file.name != row.name));
                              }}
                              className="ml-5 flex cursor-pointer items-center justify-center text-light-blue-weg"
                            />
                          </Tooltip>
                        </div>
                      </MUISC.StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div>
                <div className="mb-10 flex items-center justify-center">
                  <UploadIcon
                    sx={{
                      fontSize: "5rem",
                      color: "#0075B1",
                    }}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <h1 style={{ fontSize: fonts.xl }} className="font-bold">
                    {translate["Escolha um arquivo ou arraste aqui"]?.[language] ?? "Escolha um arquivo ou arraste aqui"}
                  </h1>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <label htmlFor="upload-photo">
              <Button
                style={{ fontSize: fonts.sm }}
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
                component="label"
              >
                {translate["Escolher arquivo"]?.[language] ?? "Escolher arquivo"}
                <input
                  type="file"
                  id="upload-photo"
                  hidden
                  onChange={(e) => props.handleFileInput(e)}
                />
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
