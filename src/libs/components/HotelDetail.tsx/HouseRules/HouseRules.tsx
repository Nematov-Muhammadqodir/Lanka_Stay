import { Stack } from "@mui/material";
import React from "react";
import HouseRulesHeader from "./HouseRulesHeader";
import HouseRulesBody from "./HouseRulesBody";

const HouseRules = () => {
  return (
    <Stack className="container" mt={"50px !important"}>
      <Stack className="houseRulesHeaderMainContainer">
        <HouseRulesHeader />
      </Stack>
      <Stack className="houseRulesBodyMainContainer">
        <HouseRulesBody />
      </Stack>
    </Stack>
  );
};

export default HouseRules;
