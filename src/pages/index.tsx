import Typography from "@mui/material/Typography";
import React from "react";
import withLayoutMain from "../libs/components/layout/LayoutMain";
import { Stack } from "@mui/material";
import MostPickedList from "../libs/components/homePage/MostPickedList";

function HomePage() {
  return (
    <Stack id={"pc-wrap"}>
      <MostPickedList />
    </Stack>
  );
}

export default withLayoutMain(HomePage);
