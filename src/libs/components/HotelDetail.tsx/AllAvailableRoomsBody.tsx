import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import HelpIcon from "@mui/icons-material/Help";
import SelectRoomMenu from "./SelectRoomMenu";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RoomFeatures from "./RoomFeatures";

const AllAvailableRoomsBody = () => {
  return (
    <Stack
      className="available-rooms-body"
      flexDirection={"row"}
      justifyContent={"space-between"}
      height={"auto"}
      paddingX={1}
      mt={2}
      borderBottom={"1px solid"}
      borderColor={"secondary"}
      pb={2}
    >
      <Stack width={220}>
        <Typography
          className="available-rooms-header-text"
          color={"primary.main"}
          fontSize={20}
          sx={{ textDecoration: "underline" }}
        >
          Family Twin Main Building
        </Typography>

        <Box
          sx={{
            bgcolor: "#E1F3E1",
            p: "2px",
            borderRadius: "5px",
            mt: "6px",
          }}
        >
          <Typography className="small-bold-text">
            Recommended for 2 adults
          </Typography>
        </Box>
        <RoomFeatures />
      </Stack>
      <Box height={"100%"} borderRight={"1px solid black"}></Box>
      <Stack width={140} flexDirection={"row"} gap={0.5}>
        <PersonIcon />
        <PersonIcon />
      </Stack>
      <Box height={"100%"} borderRight={"1px solid black"}></Box>
      <Stack width={175}>
        <Stack flexDirection={"row"} gap={0.5}>
          <Typography className="available-rooms-header-text">
            KRW 153,912
          </Typography>
          <InfoIcon color="primary" />
        </Stack>
        <Typography>Included texes and charges</Typography>
      </Stack>
      <Box height={"100%"} borderRight={"1px solid black"}></Box>
      <Stack width={260} flexDirection={"row"} gap={1}>
        <Stack flexDirection={"row"} gap={0.5}>
          <EmojiFoodBeverageIcon />
          <Stack flexDirection={"row"} gap={0.5}>
            <Typography className="small-bold-text">
              Very good breakfast
            </Typography>
            <Typography className="small-text">included</Typography>
          </Stack>
        </Stack>
        <Button sx={{ width: "14px", height: "21px" }}>
          <HelpIcon color="primary" />
        </Button>
      </Stack>
      <Box height={"100%"} borderRight={"1px solid black"}></Box>
      <SelectRoomMenu />
      <Box height={"100%"} borderRight={"1px solid black"}></Box>
      <Stack width={255}>
        <Button
          variant="contained"
          sx={{ width: "200px", color: "secondary.contrastText" }}
        >
          I'll reserve
        </Button>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <FiberManualRecordIcon sx={{ fontSize: 12 }} />
          <Typography className="small-text">
            You won't be charged yet
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AllAvailableRoomsBody;
