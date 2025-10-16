import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import countries from "world-countries";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [guestType, setGuestType] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const selectedCountry = countries.find((c) => c.name.common === country);
  const [lat, lng] = selectedCountry?.latlng || [];

  console.log("lat-long", lat);

  const handleAgeChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };
  const handleGuestTypeChange = (event: SelectChangeEvent) => {
    setGuestType(event.target.value as string);
  };

  const onChangeCountry = (val: any) => {
    console.log("val", val);
    setCountry(val);
    if (!val) {
      setRegion("");
    }
  };
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
        <Stack className="login-right-side" width={"50%"} pl={8} pr={4} py={5}>
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
          <Stack gap={2} overflow={"auto"} height={620}>
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
                  style={{ width: "403px" }}
                />
              </Box>
            </Stack>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>Password</Typography>
              <TextField
                type="password"
                id="outlined-basic"
                label="6+ characters"
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
            <Stack flexDirection={"row"} width={"100%"} gap={3}>
              <Stack gap={1}>
                <Typography sx={{ fontWeight: 500 }}>Gender</Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={handleAgeChange}
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D2D2D",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // hover state
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // focused state
                        },
                      }}
                    >
                      <MenuItem value={10}>Male</MenuItem>
                      <MenuItem value={20}>Female</MenuItem>
                      <MenuItem value={30}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <Stack gap={1}>
                <Typography sx={{ fontWeight: 500 }}> Guest Type</Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Guest Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={guestType}
                      label="Gender"
                      onChange={handleGuestTypeChange}
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D2D2D",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // hover state
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // focused state
                        },
                      }}
                    >
                      <MenuItem value={"single"}>Single</MenuItem>
                      <MenuItem value={"couple"}>Couple</MenuItem>
                      <MenuItem value={"family"}>Family</MenuItem>
                      <MenuItem value={"business"}>Business</MenuItem>
                      <MenuItem value={"friends"}>Friends</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>Country</Typography>
              <CountryDropdown
                value={country}
                onChange={onChangeCountry}
                style={{
                  padding: 10,
                  fontSize: 20,
                  borderRadius: 10,
                  borderColor: "#D2D2D2",
                }}
              />
            </Stack>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>Region</Typography>
              <RegionDropdown
                country={country}
                value={region}
                onChange={(val) => setRegion(val)}
                style={{
                  padding: 10,
                  fontSize: 20,
                  borderRadius: 10,
                  borderColor: "#D2D2D2",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Register;
