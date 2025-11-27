import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import HelpIcon from "@mui/icons-material/Help";
import SelectRoomMenu from "./SelectRoomMenu";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RoomFeatures from "./RoomFeatures";
import { useRouter } from "next/router";
import { PropertyOverviewProps } from "./PropertyOverview";
import {
  PartnerProperty,
  PropertyRoom,
} from "../../types/partnerInput/partnerProperty";
import { formatKoreanWon } from "../../handlers/priceHandler";

interface AllAvailableRoomsBodyProps {
  partnerProperty?: PartnerProperty;
  propertyRoom?: PropertyRoom;
}

const AllAvailableRoomsBody = ({
  partnerProperty,
  propertyRoom,
}: AllAvailableRoomsBodyProps) => {
  console.log("partnerProperty AllAvailableRooms", partnerProperty);
  const guestCount = propertyRoom?.numberOfGuestsCanStay ?? 0;
  const router = useRouter();
  return (
    <Stack
      className="available-rooms-body"
      flexDirection={"row"}
      justifyContent={"space-between"}
      height={"auto"}
      paddingX={1}
      mt={2}
      borderBottom={"3px solid"}
      borderColor={"primary.main"}
      pb={2}
    >
      <Stack width={220}>
        <Typography
          className="available-rooms-header-text"
          color={"primary.main"}
          fontSize={20}
          sx={{ textDecoration: "underline" }}
        >
          {propertyRoom?.roomName}
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
            Recommended for {propertyRoom?.numberOfGuestsCanStay} adults
          </Typography>
        </Box>
        <RoomFeatures propertyRoom={propertyRoom} />
      </Stack>
      <Box
        sx={{
          width: "2px",
          bgcolor: "primary.main",
        }}
      ></Box>
      <Stack width={140} flexDirection={"row"} gap={0.5} flexWrap={"wrap"}>
        {Array.from({ length: guestCount }).map((_, idx) => (
          <PersonIcon key={idx} />
        ))}
      </Stack>
      <Box
        sx={{
          width: "2px",
          bgcolor: "primary.main",
        }}
      ></Box>
      <Stack width={175}>
        <Stack flexDirection={"row"} gap={0.5}>
          <Typography className="available-rooms-header-text">
            {formatKoreanWon(
              propertyRoom?.roomPricePerNight
                ? propertyRoom?.roomPricePerNight
                : ""
            )}
          </Typography>
          <InfoIcon color="primary" />
        </Stack>
        <Typography>Included taxes and charges</Typography>
      </Stack>
      <Box
        sx={{
          width: "2px",
          bgcolor: "primary.main",
        }}
      ></Box>
      <Stack width={260} flexDirection={"row"} gap={1}>
        <Stack flexDirection={"row"} gap={0.5}>
          <EmojiFoodBeverageIcon />
          {partnerProperty?.breakfastIncluded ? (
            <Stack flexDirection={"row"} gap={0.5}>
              <Typography className="small-bold-text">
                Very good breakfast
              </Typography>
              <Typography className="small-text">included</Typography>
            </Stack>
          ) : (
            <Stack flexDirection={"row"} gap={0.5}>
              <Typography className="small-bold-text">
                Breakfast not included
              </Typography>
            </Stack>
          )}
        </Stack>
        <Button sx={{ width: "14px", height: "21px" }}>
          <HelpIcon color="primary" />
        </Button>
      </Stack>
      <Box
        sx={{
          width: "2px",
          bgcolor: "primary.main",
        }}
      ></Box>
      <SelectRoomMenu />
      <Box
        sx={{
          width: "2px",
          bgcolor: "primary.main",
        }}
      ></Box>
      <Stack width={255}>
        <Button
          variant="contained"
          sx={{ width: "200px", color: "secondary.contrastText" }}
          onClick={() => router.push(`roomId/${propertyRoom?.roomId}`)}
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
