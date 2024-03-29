import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import { useLocation, Link } from "react-router-dom";


// Recebe o nome da rota e retorna o nome com a primeira letra maiúscula
const buscarPathName = (path) => {
  const pathName = path.split("")[0].toUpperCase() + path.slice(1);
  return pathName;
};


// Retorna o link correto para cada item do breadcrumb
const buscarLink = (index) => {
  let link = "";
  for (let i = 0; i <= index; i++) {
    link += "/" + location.pathname.substring(1).split("/")[i];
  }
  return link;
};

// Navegação por histórico de rotas
export default function PathHistory() {
  const location = useLocation();
  const [pathHist, setPathHist] = useState([]);

  useEffect(() => {
    setPathHist(location.pathname.substring(1).split("/"));
  }, [location]);


  return (
    <div role="presentation" className="bg-breadcrumb-bg">
      <Breadcrumbs aria-label="breadcrumb">
        {pathHist.map((item, index) => {
          return (
            <div key={index}>
              {index == 0 ? (
                <div className="ml-3">
                  {pathHist.length == 1 ? (
                    <Typography color="text.primary">
                      {buscarPathName(item)}
                    </Typography>
                  ) : (
                    <Link color="inherit" to={buscarLink(index)}>
                      {buscarPathName(item)}
                    </Link>
                  )}
                </div>
              ) : index == pathHist.length - 1 ? (
                <Typography color="text.primary">
                  {buscarPathName(item)}
                </Typography>
              ) : (
                <Link color="inherit" to={buscarLink(index)}>
                  {buscarPathName(item)}
                </Link>
              )}
            </div>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}


