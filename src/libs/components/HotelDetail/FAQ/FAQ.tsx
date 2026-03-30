import { Stack, Typography } from "@mui/material";
import React from "react";
import FAQList from "./FAQList";

const FAQ = () => {
  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", gap: 2, mb: "70px !important" }}
    >
      <Typography className="bold-text">
        FAQs about The Grand Sumorum
      </Typography>
      <FAQList />
    </Stack>
  );
};

export default FAQ;
