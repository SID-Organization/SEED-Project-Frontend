import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Imgs
import WegLogo from "../../assets/weg-logo.png";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { data } from "autoprefixer";

// Services
import LoginService from "../../service/Login-Service";


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

  const Alert = React.forwardRef(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseNotification = (
    event,
    reason
  ) => {
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
      .then((response) => {
        if (response.status != 200) {
          setOpenNotification(true);
          return;
        }
        return response.data;
      })
      .then((data) => {
        const loggedUser = {
          numeroCadastroUsuario: data.numeroCadastroUsuario,
          businessUnity: data.businessUnity,
          cargoUsuario: data.cargoUsuario,
          departamentoUsuario: data.departamentoUsuario,
          emailUsuario: data.emailUsuario,
          fotoUsuario: data.fotoUsuario,
          nomeUsuario: data.nomeUsuario
        };
        localStorage.setItem(
          "user",
          JSON.stringify(loggedUser)
        );
        props.setUser(loggedUser);
      });
  };


  return (
    <div className="bg-loginWallpaper bg-cover w-full h-screen">
      {!password && !userID ? null : (
        <Snackbar
          open={openNotification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            sx={{
              backgroundColor: "#C31700"
            }}
          >
            Usuário ou senha inválidos!
          </Alert>
        </Snackbar>
      )}

      <div className="flex">
        <div className="w-2/6 h-60 gap-24 grid justify-center items-center">
          <img
            className="w-32 h-20 drop-shadow-weg-shadow mt-20"
            src={WegLogo}
            alt=""
          />
          <div className="grid font-bold">
            <h1 className="text-5xl text-white">Welcome!</h1>
            <h1 className="text-3xl text-white">Bem-vindo!</h1>
          </div>
          <div className="grid">
            <h1 className="text-3xl font-bold text-white">SID</h1>
            <h1 className="text-2xl font-bold text-slate-300">
              Sustainable System
            </h1>
            <h1 className="text-2xl font-bold text-slate-300">of IT Demands</h1>
            <h1 className="text-2xl font-bold text-slate-300">Management</h1>
          </div>
        </div>
        <Container
          maxWidth="sm"
          sx={{
            marginTop: "8%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "520px",
              width: "500px",
              borderRadius: "10px"
            }}
          >
            <div className="grid justify-center items-center">
              <div className="grid gap-4">
                <h1 className="font-bold flex justify-center items-center text-5xl m-12 text-blue-weg">
                  Login
                </h1>
                <div className="grid gap-4">
                  <div className="flex justify-center items-center">
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 35, color: "#00579D" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Usuário"
                      variant="filled"
                      sx={{
                        width: "24rem",
                        input: { backgroundColor: "white", borderRadius: 1 }
                      }}
                      value={userID}
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]*$/)) {
                          setUserID(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <LockOutlinedIcon sx={{ fontSize: 35, color: "#00579D" }} />
                    <TextField
                      id="outlined-basic"
                      label="Senha"
                      variant="filled"
                      type={"password"}
                      sx={{
                        width: "24rem",
                        input: { backgroundColor: "white", borderRadius: 1 }
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <h1 className="text-blue-weg cursor-pointer hover:text-sky-600 transition text-sm">
                      Esqueceu a senha?
                    </h1>
                  </div>
                </div>
                <div className="grid gap-4 justify-center items-center">
                  <Button
                    onClick={handleLogin}
                    variant="contained"
                    sx={{
                      marginTop: "3rem",
                      width: "140px",
                      height: "45px",
                      fontSize: "17px",
                      fontWeight: "bold",
                      textTransform: "none",
                      backgroundColor: "#00579D"
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
