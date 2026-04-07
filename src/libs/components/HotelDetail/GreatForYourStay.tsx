import { Stack, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import SpaIcon from "@mui/icons-material/Spa";
import PoolIcon from "@mui/icons-material/Pool";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import HotTubIcon from "@mui/icons-material/HotTub";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PetsIcon from "@mui/icons-material/Pets";
import { useTranslation } from "next-i18next";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";

const facilityIconMap: Record<string, any> = {
  "Restaurant": RestaurantIcon,
  "Room Service": RestaurantIcon,
  "Bar": RestaurantIcon,
  "Front Desk": SmokeFreeIcon,
  "Sauna": SpaIcon,
  "Fitness Center": FitnessCenterIcon,
  "Garden": SpaIcon,
  "Terrace": SpaIcon,
  "Non-smoking Rooms": SmokeFreeIcon,
  "Airport Shuttle": AirportShuttleIcon,
  "Family Rooms": FamilyRestroomIcon,
  "Spa and Wellness Center": SpaIcon,
  "Hot Tub/Jacuzzi": HotTubIcon,
  "Free Wi-Fi": WifiIcon,
  "Air Conditioning": AcUnitIcon,
  "Water Park": PoolIcon,
  "Electric Vehicle Charging Station": LocalParkingIcon,
  "Swimming Pool": PoolIcon,
};

interface GreatForYourStayProps {
  partnerProperty?: PartnerProperty | null;
}

const GreatForYourStay = ({ partnerProperty }: GreatForYourStayProps) => {
  const { t } = useTranslation("common");

  const facilities = partnerProperty?.propertyFacilities ?? [];
  const extras: string[] = [];

  if (partnerProperty?.breakfastIncluded) extras.push("Breakfast Included");
  if (partnerProperty?.parkingIncluded) extras.push("Free Parking");
  if (partnerProperty?.allowChildren) extras.push("Children Welcome");
  if (partnerProperty?.allowPets) extras.push("Pets Allowed");

  const allFeatures = [...facilities, ...extras];

  if (allFeatures.length === 0) return null;

  return (
    <Stack className="container" gap={2}>
      <Typography fontWeight={700} fontSize={20}>
        {t("hotel.greatForStay")}
      </Typography>
      <Stack width={700} flexWrap={"wrap"} flexDirection={"row"} gap={2}>
        {allFeatures.map((facility) => {
          const IconComponent = facilityIconMap[facility] || WifiIcon;
          return (
            <Stack
              key={facility}
              flexDirection={"row"}
              gap={1}
              alignItems={"center"}
            >
              <IconComponent color="primary" sx={{ fontSize: 20 }} />
              <Typography fontSize={13}>{facility}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default GreatForYourStay;
