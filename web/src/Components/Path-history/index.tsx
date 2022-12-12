import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from 'react-router-dom';

// Navegação por histórico de rotas
export default function PathHistory() {
  const location = useLocation();
  const [pathHist, setPathHist] = useState<string[]>([]);

  useEffect(() => {
    setPathHist(location.pathname.substring(1).split('/').slice(1));
  }, [location])

  // Retorna o link correto para cada item do breadcrumb
  const buscarLink = (index: number) => {
    let link = '';
    for (let i = 0; i <= index+1; i++) {
      link += '/' + location.pathname.substring(1).split('/')[i];
    }
    return link;
  }

  return (
    <div role="presentation" className="bg-breadcrumb-bg">
      <Breadcrumbs aria-label="breadcrumb">
          { pathHist.map((item: string, index: number) => {
            return (
              <>
                {index == 0 ?
                  <div className="ml-3">
                    {pathHist.length == 1 ?
                      <Typography color="text.primary">{buscarPathName(item)}</Typography>
                      :
                      <Link underline="hover" color="inherit" href={buscarLink(index)}>{buscarPathName(item)}</Link>
                    }
                  </div>
                  :
                  index == pathHist.length - 1 ?
                  <Typography color="text.primary">{buscarPathName(item)}</Typography>
                  :
                  <Link underline="hover" color="inherit" href={buscarLink(index)}>{buscarPathName(item)}</Link>
                }
              </>
            )
          })
          }
      </Breadcrumbs>
    </div>
  );
}

// Recebe o nome da rota e retorna o nome com a primeira letra maiúscula
const buscarPathName = (path: string) => {
  const pathName = path.split('')[0].toUpperCase() + path.slice(1);
  return pathName;
}


