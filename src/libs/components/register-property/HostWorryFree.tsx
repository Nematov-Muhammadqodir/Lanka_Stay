import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const HostWorryFree = () => {
  return (
    <Stack className="container">
      <Stack sx={{ py: 15, gap: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Host worry-free. We’ve got your back
        </Typography>

        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack sx={{ gap: 1, width: "32%" }}>
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Your rental, your rules
            </Typography>
            <Stack sx={{ gap: 2 }}>
              <Stack>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon />
                  <Typography>
                    Accept or decline bookings with Request to Book .
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon />
                  <Typography>
                    Manage your guests' expectations by setting up clear house
                    rules.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ gap: 1, width: "32%" }}>
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Get to know your guests
            </Typography>
            <Stack sx={{ gap: 2 }}>
              <Stack>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon />
                  <Typography>
                    Chat with your guests before accepting their stay with
                    pre-booking messaging.*
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon />
                  <Typography>Access guest travel history insights.</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ gap: 1, width: "32%" }}>
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Stay protected
            </Typography>
            <Stack sx={{ gap: 2 }}>
              <Stack>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon />
                  <Typography>
                    Protection against liability claims from guests and
                    neighbours up to €/$/£1,000,000 for every reservation.
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon />
                  <Typography>
                    Selection of damage protection options for you to choose.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
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
          Host with us today
        </Button>
      </Stack>
    </Stack>
  );
};

export default HostWorryFree;
