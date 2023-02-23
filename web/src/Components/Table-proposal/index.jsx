import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

// Props: table = [["", ""], ["", ""], ["", ""]]
export default function TableProposal(props) {
  const [table, setTable] = useState(props.table);

  function addRow() {
    const newRow = [...table, table[0].map((_) => "")];
    setTable(newRow);
  }

  function removeRow(rowIndex) {
    const newRows = [...table];
    newRows.splice(rowIndex, 1);
    setTable(newRows);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {table[0].map((text, colIndex) => (
              <th
                key={colIndex}
                className="
                    border-2 border-black rounded-xl 
                  "
              >
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  value={text}
                  onChange={(event) => {
                    const newRows = [...table];
                    newRows[0][colIndex] = event.target.value;
                    setTable(newRows);
                  }}
                  maxRows={4}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-2 border-black">
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    value={cell}
                    onChange={(event) => {
                      const newRows = [...table];
                      newRows[rowIndex + 1][cellIndex] = event.target.value;
                      setTable(newRows);
                    }}
                    maxRows={4}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </td>
              ))}
              <td>
                <IconButton onClick={() => removeRow(rowIndex + 1)}>
                  <DeleteRoundedIcon
                    sx={{ color: "#0075B1", fontSize: "1.5rem" }}
                  />
                </IconButton>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <IconButton onClick={addRow}>
                <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "1.5rem" }} />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
