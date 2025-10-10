import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import MostPickedCard from "./MostPickedCard";

export default function FullWidthGrid() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Stack className="container" sx={{ mt: "50px !important" }}>
      <Stack>
        <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
          Most Picked
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 2,
          flexWrap: "wrap",
          mt: 2,
          justifyContent: "start",
        }}
      >
        {data.map((item) => {
          return <MostPickedCard />;
        })}
      </Stack>
    </Stack>
  );
}
