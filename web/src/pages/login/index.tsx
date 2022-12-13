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

import { useState } from "react";

const usersMock = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "user",
    role: "user",
  },
  {
    id: 3,
    username: "analista",
    password: "analista",
    role: "analista",
  },
  {
    id: 4,
    username: "gestor",
    password: "gestor",
    role: "gestor",
  },
];

export default function Login() {
  const [openNotification, setOpenNotification] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    setOpenNotification(true);
    const user = usersMock.find(
      (user) => user.username === username && user.password === password
    );
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin/minhas-demandas");
      }
      if (user.role === "user") {
        navigate("/user/minhas-demandas");
      }
      if (user.role === "analista") {
        navigate("/analista/minhas-demandas");
      }
      if (user.role === "gestor") {
        navigate("/gestor/minhas-demandas");
      }
    }
  };

  return (
    <div className="bg-loginWallpaper bg-cover w-full h-screen">
      {!password && !username ? null : (
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
