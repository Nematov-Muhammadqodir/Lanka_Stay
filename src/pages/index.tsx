import Typography from "@mui/material/Typography";
import React from "react";
import withLayoutMain from "../libs/components/layout/LayoutMain";

function HomePage() {
  return (
    <Typography color="primary" fontSize={100}>
      index
    </Typography>
  );
}

export default withLayoutMain(HomePage);
