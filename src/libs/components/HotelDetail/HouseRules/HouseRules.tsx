import { Stack } from "@mui/material";
import React from "react";
import HouseRulesHeader from "./HouseRulesHeader";
import HouseRulesBody from "./HouseRulesBody";
import { PropertyOverviewProps } from "../PropertyOverview";

const HouseRules = ({ partnerProperty, loading }: PropertyOverviewProps) => {
  return (
    <Stack className="container" mt={"50px !important"}>
      <Stack className="houseRulesHeaderMainContainer">
        <HouseRulesHeader />
      </Stack>
      <Stack className="houseRulesBodyMainContainer">
        <HouseRulesBody partnerProperty={partnerProperty} />
      </Stack>
    </Stack>
  );
};

export default HouseRules;
