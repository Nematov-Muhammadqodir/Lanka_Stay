import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import withLayoutMain from "../libs/components/layout/LayoutMain";
import { Stack } from "@mui/material";
import MostPickedList from "../libs/components/homePage/MostPickedList";
import StillInterestedList from "../libs/components/homePage/StillInterestedList";
import ExploreList from "../libs/components/homePage/ExploreList";
import TrendingDestinations from "../libs/components/homePage/TrendingDestinations";
import BrowseByPropertyType from "../libs/components/homePage/BrowseByPropertyType";
import PopularAttractions from "../libs/components/homePage/PopularAttractions";
import WhyOurHotel from "../libs/components/general/whyOurHotel";
import { logOutPartner } from "../libs/auth";

function HomePage() {
  useEffect(() => {
    logOutPartner();
  }, []);
  return (
    <Stack id={"pc-wrap"}>
      <StillInterestedList />
      <MostPickedList />
      <ExploreList />
      <TrendingDestinations />
      <BrowseByPropertyType />
      <PopularAttractions />
      <WhyOurHotel />
    </Stack>
  );
}

export default withLayoutMain(HomePage);
