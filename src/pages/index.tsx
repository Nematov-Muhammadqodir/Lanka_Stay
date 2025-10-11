import Typography from "@mui/material/Typography";
import React from "react";
import withLayoutMain from "../libs/components/layout/LayoutMain";
import { Stack } from "@mui/material";
import MostPickedList from "../libs/components/homePage/MostPickedList";
import StillInterestedList from "../libs/components/homePage/StillInterestedList";
import ExploreList from "../libs/components/homePage/ExploreList";
import TrendingDestinations from "../libs/components/homePage/TrendingDestinations";

function HomePage() {
  return (
    <Stack id={"pc-wrap"}>
      <StillInterestedList />
      <MostPickedList />
      <ExploreList />
      <TrendingDestinations />
    </Stack>
  );
}

export default withLayoutMain(HomePage);
