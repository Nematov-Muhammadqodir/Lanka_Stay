import React, { useState } from "react";
import { Box, Radio, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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
    </Stack>
  );
};

export default UserInfo;
