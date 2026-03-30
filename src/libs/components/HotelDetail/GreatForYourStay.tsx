import { Box, Stack, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PoolIcon from "@mui/icons-material/Pool";

const GreatForYourStay = () => {
  return (
    <Stack className="container" gap={2}>
      <Typography fontWeight={700} fontSize={20}>
        Great for your stay
      </Typography>

      <Stack width={700} flexWrap={"wrap"} flexDirection={"row"} gap={2}>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <WifiIcon color="primary" />
          <Typography fontSize={13}>Free WiFi</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <RestaurantIcon color="primary" />
          <Typography fontSize={13}>Restaurant</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={0} alignItems={"center"}>
          <LocalParkingIcon color="primary" />
          <Typography fontSize={13}>Parking</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <BathtubIcon color="primary" />
          <Typography fontSize={13}>Private bathroom</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <FitnessCenterIcon color="primary" />
          <Typography fontSize={13}>Fitness centre</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <FamilyRestroomIcon color="primary" />
          <Typography fontSize={13}>Family rooms</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <SmokeFreeIcon color="primary" />
          <Typography fontSize={13}>Non-smoking rooms</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <PersonalVideoIcon color="primary" />
          <Typography fontSize={13}>Flat-screen TV</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={0} alignItems={"center"}>
          <LocalParkingIcon color="primary" />
          <Typography fontSize={13}>Free parking</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <PoolIcon color="primary" />
          <Typography fontSize={13}>3 swimming pools</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GreatForYourStay;
