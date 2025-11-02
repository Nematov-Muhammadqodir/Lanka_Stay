import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

const BigMap = () => {
  return (
    <Stack className="big-map-container" sx={{ position: "relative" }}>
      <Image
        src={"/img/world-map.jpg"}
        alt="big-map-image"
        width={1500}
        height={435}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "435px",
        }}
      />

      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)", // ← change opacity 0.2–0.6
        }}
      />

      <Stack className="container">
        <Stack
          sx={{
            position: "absolute",
            top: -300,
            gap: 3,
            width: "100%",
            color: "white",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Reach a unique global customer base
          </Typography>
          <Stack
            sx={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                1.8+ billion
              </Typography>
              <Typography>holiday rental guests since 2010.</Typography>
            </Stack>
            <Stack>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                1 in every 3
              </Typography>
              <Typography>
                room nights booked in 2024 was a holiday rental.
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                48% of nights
              </Typography>
              <Typography>
                booked were for international stays at the end of 2023.
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{
              color: "white",
              width: 220,
              py: 2,
              backgroundColor: "#053A95",
              textTransform: "capitalize",
              fontWeight: 700,
            }}
          >
            Reach new guests today
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BigMap;
