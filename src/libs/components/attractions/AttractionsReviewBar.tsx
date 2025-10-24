import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";

interface AttractionsReviewBarProps {
  label: any;
  value: any;
}

const AttractionsReviewBar = ({ label, value }: AttractionsReviewBarProps) => {
  return (
    <Stack width={250}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Typography pl={2} sx={{ width: "auto" }}>
          {label}
        </Typography>
        <Typography sx={{ width: 30, fontWeight: 700 }}>{value}</Typography>
      </Stack>

      <Box sx={{ flexGrow: 1, mx: 2 }}>
        <LinearProgress
          variant="determinate"
          value={(value / 5) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#FEBB05",
              borderRadius: 5,
            },
            backgroundColor: "#F2F2F2",
          }}
        />
      </Box>
    </Stack>
  );
};

export default AttractionsReviewBar;
