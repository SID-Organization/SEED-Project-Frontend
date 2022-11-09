import React from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function PathHistory() {
  return (
    <div role="presentation" className="bg-breadcrumb-bg">
      <Breadcrumbs aria-label="breadcrumb">
        <div className="ml-3">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
        </div>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}
