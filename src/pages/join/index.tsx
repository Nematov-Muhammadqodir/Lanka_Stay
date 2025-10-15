import { Box, Input, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const Register = () => {
  const [phone, setPhone] = useState("");
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Stack
        flexDirection={"row"}
        width={1000}
        height={"auto"}
        border={"1px solid black"}
        className="container"
        position={"relative"}
        justifyContent={"center"}
      >
        <Stack className="login-left-side" width={"50%"}>
          <Image
            src={"/img/Villa.jpg"}
            alt="user-image"
            style={{ objectFit: "cover" }}
            width={500}
            height={778}
          />
        </Stack>
        <Stack className="login-right-side" width={"50%"} px={8} py={5}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 40,
              justifyContent: "center",
              textAlign: "center",
              mb: 2,
            }}
          >
            Create Account
          </Typography>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>Name</Typography>
              <TextField
                id="outlined-basic"
                label="Enter your name"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D2D2D2", // border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "blue", // hover border color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#D2D2D2", // label color
                  },
                  "&:hover .MuiInputLabel-root": {
                    color: "blue", // label hover color
                  },
                }}
              />
            </Stack>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>E-mail</Typography>
              <TextField
                id="outlined-basic"
                label="example@gmail.com"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D2D2D2", // border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "blue", // hover border color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#D2D2D2", // label color
                  },
                  "&:hover .MuiInputLabel-root": {
                    color: "blue", // label hover color
                  },
                }}
              />
            </Stack>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>Phone No</Typography>

              <Box
                sx={{
                  width: 400, // controls total width
                  "--react-international-phone-border-radius": "10px",
                  "--react-international-phone-height": "52px",
                  "--react-international-phone-background-color": "white",
                  "--react-international-phone-border-color": "#D2D2D2",
                  "--react-international-phone-font-size": "16px",
                  "--react-international-phone-text-color": "#000",
                  "& .react-international-phone-input": {
                    width: "100%", // ✅ makes input match the box width
                  },
                  "& .react-international-phone-country-selector-button": {
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  },
                }}
              >
                <PhoneInput
                  defaultCountry="ua"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  style={{ width: "372px" }}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Register;
