import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TourHighlights = () => {
  return (
    <Stack gap={2}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <CheckIcon sx={{ color: "#018233" }} />
        <Stack>
          <Typography className="bold-text-medium" color={"#018233"}>
            Free cancellation available
          </Typography>
          <Typography className="small-text">
            Up to 24 hours before the start time
          </Typography>
        </Stack>
      </Stack>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <TimelapseIcon />
        <Stack>
          <Typography className="bold-text-medium">
            Duration: 30 minutes
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography>
          With this admission ticket, you can hop aboard the iconic London Eye
          for a 30-minute ride over the city. The observation wheel reaches a
          height of 135 metres, offering you a chance to savour panoramic views
          of London. You can spot famous city landmarks like Big Ben, Buckingham
          Palace, St Paul’s Cathedral, Westminster Abbey and Trafalgar Square.
        </Typography>
      </Stack>
      <Stack gap={0.5}>
        <Typography className="bold-text-medium">Why visit</Typography>
        <Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <CheckIcon sx={{ color: "#018233" }} />
            <Stack>
              <Typography className="small-text">
                A thrilling bird's-eye view of the English capital
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <CheckIcon sx={{ color: "#018233" }} />
            <Stack>
              <Typography className="small-text">
                Chance to spot prominent landmarks of the city
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <CheckIcon sx={{ color: "#018233" }} />
            <Stack>
              <Typography className="small-text">
                Admire Big Ben, Buckingham Palace and St Paul’s Cathedral
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={0.5}>
        <Typography className="bold-text-medium">What's included</Typography>
        <Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <CheckIcon sx={{ color: "#018233" }} />
            <Stack>
              <Typography className="small-text">
                Admission to the London Eye
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={0.5}>
        <Typography className="bold-text-medium">Restrictions</Typography>
        <Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <CloseIcon />
            <Stack>
              <Typography className="small-text">
                Children under 16 years old must be accompanied by an adult.
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <CloseIcon />
            <Stack>
              <Typography className="small-text">
                Visitors must show a valid photo ID.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={0.5}>
        <Typography className="bold-text-medium">
          Additional information
        </Typography>

        <Typography className="small-text">
          Please note that the time slot is for when you enter the queue for the
          attraction, not the time you are to gain admission. Holiday periods
          are subject to longer wait times. Please note that attractions may
          close areas or exhibits at their discretion on the date of your visit.
          For all ticket holders, the number of people per capsule may vary.
          There are strict security procedures at the London Eye. Please note
          that visitors are required to undergo a non-invasive security check
          before boarding. You can request to be searched by an officer of the
          same sex. The following items are not permitted: alcohol, baseball
          bats, bicycles (including folding ones), explosives (including
          fireworks), guns, knives, pepper spray, pets (except for service
          animals), prams and buggies, sharp objects, scooters, screwdrivers and
          spanners, skateboards, tasers and tripods.
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography className="bold-text-medium">Location</Typography>

        <Stack gap={1}>
          <Box width={"100%"} height={245}>
            <iframe
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=126.563%2C33.247%2C126.580%2C33.256&layer=mapnik"
            ></iframe>
          </Box>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <LocationOnIcon />
            <Stack>
              <Typography className="bold-text-medium">
                Admission to the London Eye
              </Typography>
              <Typography>
                London Eye, 30 The Queen's Walk, Lambeth, London, SE1
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TourHighlights;
