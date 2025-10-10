import { Box, Button, Stack, Typography } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import CameraIcon from "@mui/icons-material/Camera";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Image from "next/image";

const TopHome = () => {
  return (
    <Stack
      className="container"
      direction={"row"}
      justifyContent="space-between"
      sx={{
        borderRadius: 3,
        marginTop: "50px !important",
      }}
    >
      <Stack className="left-side">
        <Typography sx={{ fontSize: "42px", fontWeight: 700, lineHeight: 1.2 }}>
          Forget Busy Work, <br /> Start Next Vacation
        </Typography>
        <Typography
          sx={{
            mt: 3,
            fontSize: "16px",
            color: "text.disabled",
            lineHeight: 1.5,
          }}
        >
          We provide what you need to enjoy your <br /> holiday with family.
          Time to make another <br /> memorable moments.
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "167px",
            height: "41px",
            color: "text.disabled",
            mt: 7,
            borderRadius: "7px",
          }}
        >
          Show More
        </Button>
        <Stack sx={{ mt: 10 }} direction={"row"} spacing={5}>
          <Stack>
            <LuggageIcon />
            <Stack color={"text.disabled"} flexDirection={"row"} gap={"3px"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  flexDirection: "row",
                }}
              >
                2500
              </Typography>
              Users
            </Stack>
          </Stack>
          <Stack>
            <CameraIcon />

            <Stack color={"text.disabled"} flexDirection={"row"} gap={"3px"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  flexDirection: "row",
                }}
              >
                200
              </Typography>
              treasure
            </Stack>
          </Stack>
          <Stack>
            <TravelExploreIcon />
            <Stack color={"text.disabled"} flexDirection={"row"} gap={"3px"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  flexDirection: "row",
                }}
              >
                100
              </Typography>
              cities
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        className="right-side"
        sx={{
          width: "520px",
          height: "410px",
          borderRadius: "100px 15px 15px 15px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src="/img/lanka-stay.jpg"
          alt="user-image"
          width={520}
          height={510}
          style={{ objectFit: "cover" }}
        />
      </Stack>
      <Box
        sx={{
          border: `1px solid`,
          borderColor: "text.disabled",
          position: "absolute",
          width: "520px",
          height: "410px",
          top: 50,
          right: 140,
          zIndex: -1,
          borderRadius: "15px",
        }}
      ></Box>
      <Stack className="right-side"></Stack>
    </Stack>
  );
};

export default TopHome;
