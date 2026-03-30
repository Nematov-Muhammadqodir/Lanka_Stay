import { Stack, Typography } from "@mui/material";
import React from "react";
import FAQList from "../../../HotelDetail/FAQ/FAQList";
import AttractionsFAQList from "./AttractionsFAQList";

const AttractionsFAQ = () => {
  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", gap: 2, mb: "70px !important" }}
    >
      <Typography className="bold-text">Frequently asked questions</Typography>
      <AttractionsFAQList />
    </Stack>
  );
};

export default AttractionsFAQ;
