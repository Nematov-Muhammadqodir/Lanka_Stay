import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import CheckIcon from "@mui/icons-material/Check";
import TimerIcon from "@mui/icons-material/Timer";
import GroupIcon from "@mui/icons-material/Group";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { RoomReservationRight } from "./RoomReservationRight";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";
import {
  GET_PARTNER_PROPERTY,
  GET_PARTNER_PROPERTY_ROOM,
} from "@/apollo/user/query";
import CloseIcon from "@mui/icons-material/Close";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

const UserInfo = ({
  handlePaymentPage,
  formatted,
  handleEditUserInfo,
  initalValue,
  setActiveStep,
}: RoomReservationRight) => {
  const user = useReactiveVar(userVar);
  const router = useRouter();

  const { roomId } = router.query;
  /** APOLLO REQUESTS **/
  const {
    loading: getPartnerPropertyRoomLoading,
    data: getPartnerPropertyRoomData,
    error: getPartnerPropertyRoomError,
    refetch: getPartnerPropertyRoomRefetch,
  } = useQuery(GET_PARTNER_PROPERTY_ROOM, {
    fetchPolicy: "cache-first",
    variables: { input: roomId },
    skip: !roomId,
    notifyOnNetworkStatusChange: true,
  });
  const roomData = getPartnerPropertyRoomData?.getPartnerPropertyRoom;

  const {
    loading: getPartnerPropertyLoading,
    data: getPartnerPropertyData,
    error: getPartnerPropertyError,
    refetch: getPartnerPropertyRefetch,
  } = useQuery(GET_PARTNER_PROPERTY, {
    fetchPolicy: "cache-first",
    variables: { input: roomData?.propertyId },
    skip: !roomData?.propertyId,
    notifyOnNetworkStatusChange: true,
  });
  const propertyData = getPartnerPropertyData?.getPartnerProperty;

  console.log("getPartnerPropertyDataaa", propertyData);

  return (
    <Stack gap={2} sx={{ mb: { xs: 6, md: 30 } }}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={1}
        border={"1px solid"}
        p={2}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Image
          src={
            user.guestImage !== ""
              ? resolveImageUrl(user.guestImage)
              : "/img/logo/uniface.jpg"
          }
          alt="left-image"
          width={50}
          height={50}
          style={{
            objectFit: "cover",
            borderRadius: 200,
          }}
        />
        <Stack>
          <Typography className="bold-text-medium">
            You are signed in
          </Typography>
          <Typography className="small-text">
            {user.guestEmail !== "" ? user.guestEmail : ""}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        gap={1}
        border={"1px solid"}
        p={2}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Typography className="bold-text">Enter your details</Typography>

        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          border={"1px solid"}
          p={2}
          borderColor={"text.disabled"}
          borderRadius={1}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <InfoIcon />
          <Typography className="small-text">
            Almost done! Just fill in the * required info
          </Typography>
        </Stack>

        <Stack
          className="form"
          mt={2}
          gap={2}
          borderBottom={"1px solid"}
          pb={2}
          borderColor={"text.disabled"}
        >
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: { xs: 2, md: 0 },
            }}
          >
            <Stack gap={0.5} sx={{ width: { xs: "100%", md: "auto" } }}>
              <Typography className="small-bold-text">First name</Typography>
              <TextField
                placeholder="First name"
                sx={{ width: { xs: "100%", md: 350 } }}
                value={initalValue.guestName}
                onChange={(e: any) => {
                  handleEditUserInfo("guestName", e.target.value);
                }}
              />
            </Stack>
            <Stack gap={0.5} sx={{ width: { xs: "100%", md: "auto" } }}>
              <Typography className="small-bold-text">
                Last name (optional)
              </Typography>
              <TextField
                placeholder="Last name"
                sx={{ width: { xs: "100%", md: 350 } }}
                value={initalValue.guestLastName}
                onChange={(e: any) => {
                  handleEditUserInfo("guestLastName", e.target.value);
                }}
              />
            </Stack>
          </Stack>
          <Stack gap={0.5}>
            <Typography className="small-bold-text">Email address</Typography>
            <TextField
              placeholder="example@gmail.com"
              sx={{ width: { xs: "100%", md: 350 } }}
              value={initalValue.guestEmail}
            />
            <Typography className="small-text" pl={1} color={"primary.main"}>
              Confirmation email goes to this address
            </Typography>
          </Stack>
          <Stack gap={0.5}>
            <Typography className="small-bold-text">Phone No</Typography>

            <Box
              sx={{
                width: { xs: "100%", md: 470 },
                "--react-international-phone-border-radius": "3px",
                "--react-international-phone-height": "52px",
                "--react-international-phone-background-color": "white",
                "--react-international-phone-border-color": "#E0E0E0",
                "--react-international-phone-font-size": "16px",
                "--react-international-phone-text-color": "#000",
                "& .react-international-phone-input": {
                  width: { xs: "100%", md: "305px" },
                },
                "& .react-international-phone-country-selector-button": {
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                },
              }}
            >
              <PhoneInput
                defaultCountry="kr"
                value={initalValue.guestPhoneNumber}
                onChange={(phone) => {
                  handleEditUserInfo("guestPhoneNumber", phone);
                }}
              />
            </Box>
          </Stack>
        </Stack>

        <Stack>
          <Typography className="small-text">
            Are you travelling for work?(optional)
          </Typography>
          <Stack flexDirection={"row"}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={initalValue.travelForWork}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value === "true";
                handleEditUserInfo("travelForWork", val);
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        gap={1}
        border={"1px solid"}
        p={2}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Typography className="bold-text">Good to know:</Typography>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <CheckIcon sx={{ color: "#018233" }} />
          <Typography>
            Stay flexible: You can cancel for free before {formatted}, so lock
            in this great price today.
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <TimerIcon sx={{ color: "#D40F1D" }} />
          <Typography>
            You're booking the last available{" "}
            {roomData?.roomName
              ? roomData.roomName
                  .toLowerCase()
                  .split("_")
                  .map(
                    (word: any) => word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ")
              : ""}{" "}
            - 11th - 16th Floor with Bath - Parking included we have at Hotel
            Gracery Seoul on our site.
          </Typography>
        </Stack>
      </Stack>

      <Stack
        gap={1}
        border={"1px solid"}
        p={2}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Typography className="bold-text">
          Standard Double Room - 11th - 16th Floor with Bath - Parking included
        </Typography>
        <Stack flexDirection={"row"} gap={1}>
          {propertyData?.parkingIncluded ? (
            <CheckIcon sx={{ color: "#018233" }} />
          ) : (
            <CloseIcon />
          )}
          {propertyData?.parkingIncluded ? (
            <Typography color={"#018233"}>Includes parking</Typography>
          ) : (
            <Typography color={"#018233"}>Parking not inckuded</Typography>
          )}
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <CheckIcon sx={{ color: "#018233" }} />
          <Typography color={"#018233"} className="small-bold-text">
            Free cancellation before {formatted}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <GroupIcon />
          <Typography className="small-bold-text">
            Room for ​{roomData?.numberOfGuestsCanStay} Guests
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <EmojiPeopleIcon />
          <Typography className="small-text">
            Main guest: {user.guestName}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <AutoAwesomeIcon />
          <Typography className="small-text">Spotless rooms - 9.2</Typography>
        </Stack>
        {roomData?.isSmokingAllowed ? (
          <Stack flexDirection={"row"} gap={1}>
            <SmokingRoomsIcon />
            <Typography className="small-text">Smoking allowed</Typography>
          </Stack>
        ) : (
          <Stack flexDirection={"row"} gap={1}>
            <SmokeFreeIcon />
            <Typography className="small-text">No smoking</Typography>
          </Stack>
        )}
      </Stack>

      <Stack
        gap={1}
        border={"1px solid"}
        p={2}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Typography className="bold-text">Your arrival time</Typography>
        <Stack flexDirection={"row"} gap={1}>
          <CheckIcon sx={{ color: "#018233" }} />
          <Typography>
            Your room will be ready for check-in between{" "}
            {propertyData?.checkInTimeFrom} and{" "}
            {propertyData?.checkInTimeUntill}
          </Typography>
        </Stack>

        <Stack flexDirection={"row"} gap={1}>
          <AssuredWorkloadIcon sx={{ color: "#018233" }} />
          <Typography>
            24-hour front desk – Help whenever you need it!
          </Typography>
        </Stack>
      </Stack>

      <Stack
        gap={1}
        border={"1px solid"}
        p={2}
        borderColor={"text.disabled"}
        borderRadius={3}
      >
        <Typography className="bold-text">Cots and extra beds</Typography>
        <Stack flexDirection={"row"} gap={1}>
          <SingleBedIcon sx={{ color: "#018233" }} />
          <Typography>Requests are subject to availability</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <SingleBedIcon sx={{ color: "#018233" }} />
          <Typography>Requests must be confirmed by the property</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <SingleBedIcon sx={{ color: "#018233" }} />
          <Typography>
            Requests not labelled 'Free' may incur extra charges
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        sx={{
          width: { xs: "100%", md: 300 },
          alignSelf: { xs: "stretch", md: "end" },
        }}
        onClick={() => {
          handlePaymentPage();
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography color={"white"}>Next: Final details</Typography>
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </Stack>
      </Button>
    </Stack>
  );
};

export default UserInfo;
