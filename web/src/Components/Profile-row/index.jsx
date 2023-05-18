import { useState, useEffect } from "react";

//MUI
import { IconButton, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

export default function ProfileRow(props) {
  const [phoneNumber, setPhoneNumber] = useState("+55 (47) 99123-2134");
  const [isEditOn, setIsEditOn] = useState(false);

  const [inputValue, setInputValue] = useState(18);

  const increaseValue = () => {
    if (inputValue < 20) {
      setInputValue(inputValue + 2);
    }
  };

  const decreaseValue = () => {
    if (inputValue > 12) {
      setInputValue(inputValue - 2);
    } else {
      setInputValue(inputValue);
    }
  };

  useEffect(() => {
    console.log("Tamanho fonte: ", inputValue);
  }, [inputValue]);

  return (
    <div>
      <div>
        <div
          className={
            props.topLine == true
              ? `flex items-center gap-10 border-b-[1px] border-t-[1px] border-[#808080]`
              : `flex items-center gap-10 border-b-[1px] border-t-[0px] border-[#808080]`
          }
        >
          <h1 className="m-4 font-bold">{props.topic}</h1>
          {props.phone == true && (
            <>
              <input
                type="text"
                value={phoneNumber}
                disabled={!isEditOn}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={
                  `font-normal text-[#6C6C6C]` +
                  (isEditOn
                    ? " border-b-[1px] border-[#0075B1] outline-none"
                    : "")
                }
              />

              <div className="flex justify-end">
                <IconButton onClick={() => setIsEditOn(!isEditOn)}>
                  {isEditOn ? (
                    <Tooltip title="Salvar alterações">
                      <CheckRoundedIcon
                        className="cursor-pointer"
                        sx={{
                          color: "#000",
                          transition: "0.3s",
                          "&:hover": {
                            color: "#0075B1",
                          },
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Editar telefone">
                      <EditRoundedIcon
                        className="cursor-pointer"
                        sx={{
                          color: "#000",
                          transition: "0.3s",
                          "&:hover": {
                            color: "#0075B1",
                          },
                        }}
                      />
                    </Tooltip>
                  )}
                </IconButton>
              </div>
            </>
          )}
          {props.content && (
            <span className="font-normal text-[#6C6C6C]">{props.content}</span>
          )}
          {props.increaseFontSize == true && (
            <div className="flex items-center justify-center gap-4">
              <>
                <Tooltip title="Diminuir fonte">
                  <IconButton onClick={decreaseValue}>
                    <RemoveRoundedIcon
                      className="cursor-pointer"
                      sx={{ color: "#000" }}
                    />
                  </IconButton>
                </Tooltip>
              </>

              <>
                <Tooltip title="Aumentar fonte">
                  <IconButton onClick={increaseValue}>
                    <AddRoundedIcon
                      className="cursor-pointer"
                      sx={{ color: "#000" }}
                    />
                  </IconButton>
                </Tooltip>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
