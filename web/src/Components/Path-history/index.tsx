import React from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from 'react-router-dom';

export default function PathHistory() {
  const location = useLocation();

  console.log("location", location);

  return (
    <div role="presentation" className="bg-breadcrumb-bg">
      <Breadcrumbs aria-label="breadcrumb">
        <div className="ml-3">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
        </div>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}
