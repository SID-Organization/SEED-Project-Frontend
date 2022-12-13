import React from "react";

import WegLogo from "../../assets/weg-logo.png";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import { Link, useNavigate } from "react-router-dom";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useState, useEffect } from "react";



export default function Login() {
  const [openNotification, setOpenNotification] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [userID, setUserID] = useState<number>();
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<{
    numeroCadastroUsuario: number;
    businessUnity: string;
    cargoUsuario: string;
    departamentoUsuario: string;
    emailUsuario: string;
    fotoUsuario: string;
  }>();

  const navigate = useNavigate();
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotification(false);
  };
  const handleLogin = () => {
    const user = {
      numeroCadastroUsuario: userID,
      senhaUsuario: password
    }; 

    fetch('http://localhost:8080/sid/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
      .then(data => {
        setUser(data);
      })
  };

  useEffect(() => {
    if(user) {
      localStorage.setItem("user", JSON.stringify({
        numeroCadastroUsuario: user.numeroCadastroUsuario,
        businessUnity: user.businessUnity,
        cargoUsuario: user.cargoUsuario,
        departamentoUsuario: user.departamentoUsuario,
        emailUsuario: user.emailUsuario,
        fotoUsuario: user.fotoUsuario,
      }));
        navigate("/demandas")
      }
  }, [user])


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
              backgroundColor: "#C31700",
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
            <div className="grid justify-center items-center">
              <div className="grid gap-4">
                <h1 className="font-bold flex justify-center items-center text-5xl m-12 text-blue-weg">
                  Login
                </h1>
                <form action="">
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
                          input: { backgroundColor: "white", borderRadius: 1 },
                        }}
                        value={userID}
                        onChange={(e) => {
                          if(e.target.value.match(/^[0-9]*$/)){
                            setUserID(parseInt(e.target.value))
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <LockOutlinedIcon
                        sx={{ fontSize: 35, color: "#00579D" }}
                      />
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
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-1 justify-center items-center">
                      <Checkbox className="w-4 h-4" {...label} defaultChecked />
                      <h1 className="text-gray-600 text-sm font-semibold">
                        Lembrar de mim
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-blue-weg cursor-pointer hover:text-sky-600 transition text-sm">
                        Esqueceu a senha?
                      </h1>
                    </div>
                  </div>
                  <div className="grid gap-4 justify-center items-center">
                    <button type="submit" onClick={handleLogin}>
                      <Button
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
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
}
