import React from "react";

import "../../styles/index.css";

import WegLogo from "../../assets/weg-logo.png";

export default function Login() {
  return (
    <div className="bg-loginWallpaper bg-cover w-full h-screen">
      <div className="w-2/6 h-60 gap-24 grid justify-center items-center">
        <img
          className="w-36 h-24 drop-shadow-weg-shadow mt-20"
          src={WegLogo}
          alt=""
        />
        <div className="grid font-bold">
          <h1 className="text-6xl">Welcome!</h1>
          <h1 className="text-3xl">Bem-vindo!</h1>
        </div>
        <div className="grid">
          <h1 className="text-4xl font-bold">SID</h1>
          <h1 className="text-3xl font-bold text-slate-300">
            Sustainable System
          </h1>
          <h1 className="text-3xl font-bold text-slate-300">of IT Demands</h1>
          <h1 className="text-3xl font-bold text-slate-300">Management</h1>
        </div>
      </div>
    </div>
  );
}
