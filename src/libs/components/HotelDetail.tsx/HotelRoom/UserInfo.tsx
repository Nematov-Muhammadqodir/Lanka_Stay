import React, { useState } from "react";
import { Box, Radio, Stack, TextField, Typography } from "@mui/material";
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

const UserInfo = () => {
  const [phone, setPhone] = useState("");
  return (
    <Stack gap={2}>
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
          src={"/img/logo/uniface.jpg"}
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
            nematovmuhammadqodir68@gmail.com
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
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Stack gap={0.5}>
              <Typography className="small-bold-text">First name</Typography>
              <TextField placeholder="First name" sx={{ width: 350 }} />
            </Stack>
            <Stack gap={0.5}>
              <Typography className="small-bold-text">Last name</Typography>
              <TextField placeholder="Last name" sx={{ width: 350 }} />
            </Stack>
          </Stack>
          <Stack gap={0.5}>
            <Typography className="small-bold-text">Email address</Typography>
            <TextField placeholder="example@gmail.com" sx={{ width: 350 }} />
            <Typography className="small-text" pl={1} color={"primary.main"}>
              Confirmation email goes to this address
            </Typography>
          </Stack>
          <Stack gap={0.5}>
            <Typography className="small-bold-text">Phone No</Typography>

            <Box
              sx={{
                width: 470, // match other inputs
                "--react-international-phone-border-radius": "3px",
                "--react-international-phone-height": "52px",
                "--react-international-phone-background-color": "white",
                "--react-international-phone-border-color": "#E0E0E0",
                "--react-international-phone-font-size": "16px",
                "--react-international-phone-text-color": "#000",
                "& .react-international-phone-input": {
                  width: "305px",
                },
                "& .react-international-phone-country-selector-button": {
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                },
              }}
            >
              <PhoneInput
                defaultCountry="ua"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </Box>
          </Stack>
        </Stack>

        <Stack>
          <Typography className="small-text">
            Are you travelling for work?(optional)
          </Typography>
          <Stack flexDirection={"row"}>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Radio />
              <Typography>Yes</Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Radio />
              <Typography>No</Typography>
            </Stack>
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
            Stay flexible: You can cancel for free before 5 December 2025, so
            lock in this great price today.
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <TimerIcon sx={{ color: "#D40F1D" }} />
          <Typography>
            You're booking the last available Standard Double Room - 11th - 16th
            Floor with Bath - Parking included we have at Hotel Gracery Seoul on
            our site.
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
          <CheckIcon sx={{ color: "#018233" }} />
          <Typography color={"#018233"}>Includes parking</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <CheckIcon sx={{ color: "#018233" }} />
          <Typography color={"#018233"} className="small-bold-text">
            Free cancellation before 5 December 2025
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <GroupIcon />
          <Typography className="small-bold-text">Guests: ​2 adults</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <EmojiPeopleIcon />
          <Typography className="small-text">
            Main guest: Nematov Mukhamadkodir
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <AutoAwesomeIcon />
          <Typography className="small-text">Spotless rooms - 9.2</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <SmokeFreeIcon />
          <Typography className="small-text">No smoking</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
