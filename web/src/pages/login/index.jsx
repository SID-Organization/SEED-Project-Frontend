import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Imgs
import WegLogo from "../../assets/weg-logo.png";
import SeedLogo from "../../assets/seedLogo.png"

// MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// Services
import LoginService from "../../service/Login-Service";
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";

export default function Login(props) {
  const [openNotification, setOpenNotification] = useState(false);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Se o usuário for atualizado, será redirecionado para a página de demandas
  useEffect(() => {
    if (props.user) {
      navigate("/demandas");
    }
  }, [props.user]);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotification(false);
  };

  const handleLogin = () => {
    // Validação de campos
    if (!userID || !password) {
      setOpenNotification(true);
      return;
    }

    LoginService.login(userID, password)
      .then((res) => {
        if (res.status != 200) {
          setOpenNotification(true);
          return false
        }
        return true;
      })
      .then((auth) => {
        if (!auth) return;
        const loggedUser = UserUtils.getUserFromCookie();
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("configs", JSON.stringify({ language: "pt-br" }));
        FontSizeUtils.setFontSize();
        props.setUser(loggedUser);
      });
  };

  return (
    <div className="h-screen w-full bg-loginWallpaper bg-cover">
      {openNotification && (
        <Snackbar
          open={openNotification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            sx={{
              backgroundColor: "#C31700",
            }}
          >
            Usuário ou senha inválidos!
          </MuiAlert>
        </Snackbar>
      )}

      <div className="flex">
        <div className="grid h-60 w-2/6 items-center justify-center gap-24">
          <img
            className="mt-20 h-20 w-32 drop-shadow-weg-shadow"
            src={WegLogo}
            alt=""
          />
          <div className="grid font-bold">
            <h1 className="text-5xl text-white">Welcome!</h1>
            <h1 className="text-3xl text-white">Bem-vindo!</h1>
          </div>
          <div className="grid justify-start items-center w-64">
            <div className="flex gap-1">
              <h1 className="text-3xl font-bold text-white items-center flex ">SEED</h1>
              <img className="brightness-[100] w-16" src={SeedLogo} alt="" />
            </div>
            <h1 className="text-2xl font-bold text-slate-300 break-words">
              Accessible and Sustainable System of IT Demands Management
            </h1>
          </div>
        </div>
        <Container
          maxWidth="sm"
          sx={{
            marginTop: "8%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "520px",
              width: "500px",
              borderRadius: "10px",
            }}
          >
            <div className="grid items-center justify-center">
              <div className="grid gap-4">
                <h1 className="m-12 flex items-center justify-center text-5xl font-bold text-blue-weg">
                  Login
                </h1>
                <div className="grid gap-4">
                  <div className="flex items-center justify-center">
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 35, color: "#00579D" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Usuário"
                      variant="filled"
                      sx={{
                        width: "24rem",
                        input: { backgroundColor: "white", borderRadius: 1 },
                      }}
                      value={userID}
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]*$/)) {
                          setUserID(e.target.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <LockOutlinedIcon sx={{ fontSize: 35, color: "#00579D" }} />
                    <TextField
                      id="outlined-basic"
                      label="Senha"
                      variant="filled"
                      type={"password"}
                      sx={{
                        width: "24rem",
                        input: { backgroundColor: "white", borderRadius: 1 },
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h1 className="cursor-pointer text-sm text-blue-weg transition hover:text-sky-600">
                      Esqueceu a senha?
                    </h1>
                  </div>
                </div>
                <div className="grid items-center justify-center gap-4">
                  <Button
                    onClick={() => {
                      handleLogin();
                    }}
                    variant="contained"
                    sx={{
                      marginTop: "3rem",
                      width: "140px",
                      height: "45px",
                      fontSize: "17px",
                      fontWeight: "bold",
                      textTransform: "none",
                      backgroundColor: "#00579D",
                    }}
                  >
                    Entrar
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
}
