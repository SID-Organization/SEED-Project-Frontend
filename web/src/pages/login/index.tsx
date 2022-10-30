import WegLogo from "../../assets/weg-logo.png";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import { Link } from "react-router-dom";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import "../../styles/index.css";

export default function Login() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="bg-loginWallpaper bg-cover w-full h-screen">
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
      <Container maxWidth="sm" sx={{ marginRight: "50px", marginTop: "-8rem" }}>
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
              <div className="grid gap-4">
                <div className="flex justify-center items-center">
                  <PersonOutlineOutlinedIcon
                    sx={{ fontSize: 35, color: "#00579D" }}
                  />
                  <input
                    className="w-96 h-14 outline-none text-base pl-4 rounded-lg border-2 border-slate-300"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <LockOutlinedIcon sx={{ fontSize: 35, color: "#00579D" }} />
                  <input
                    className="w-96 h-14 outline-none text-base pl-4 rounded-lg border-2 border-slate-300"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
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
                <Link to="/minhas-demandas">
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
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
}
