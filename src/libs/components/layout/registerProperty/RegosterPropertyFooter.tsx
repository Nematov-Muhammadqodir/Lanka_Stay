import { Stack, Typography } from "@mui/material";
import React from "react";
import RegisterForFreeCard from "./RegisterForFreeCard";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const RegisterPropertyFooter = () => {
  return (
    <Stack className="container">
      <Stack sx={{ py: 10, gap: 10 }}>
        <Stack
          className="top-footer-container"
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 500, color: "white", letterSpacing: 1 }}
          >
            Sign up and start <br /> welcoming guests today!
          </Typography>
          <RegisterForFreeCard />
        </Stack>
        <Stack
          className="bottom-footer-container"
          sx={{ borderBottom: "2px solid white", pb: 5 }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={4} textAlign={"center"}>
              <Stack gap={2}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}
                >
                  Discover
                </Typography>
                <Stack>
                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    Trust and Safety
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid xs={4} textAlign={"center"}>
              <Stack gap={2}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}
                >
                  Useful links
                </Typography>

                <Stack>
                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    Extranet
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    Pulse for Android
                  </Typography>

                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    Pulse for iOS
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid xs={4} textAlign={"center"}>
              <Stack gap={2}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}
                >
                  Help and communities
                </Typography>

                <Stack>
                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    Partner Help
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    Partner Community
                  </Typography>

                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    How-to videos
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RegisterPropertyFooter;
