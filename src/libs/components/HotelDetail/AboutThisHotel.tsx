import { Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { PropertyOverviewProps } from "./PropertyOverview";

const AboutThisHotel = ({
  partnerProperty,
  loading,
}: PropertyOverviewProps) => {
  const { t } = useTranslation("common");

  if (!partnerProperty) return null;

  const name = partnerProperty.propertyName;
  const city = partnerProperty.propertyCity;
  const region = partnerProperty.propertyRegion;
  const country = partnerProperty.propertyCountry;
  const facilities = partnerProperty.propertyFacilities ?? [];
  const stars = partnerProperty.propertyStars;
  const breakfast = partnerProperty.breakfastIncluded;
  const parking = partnerProperty.parkingIncluded;
  const children = partnerProperty.allowChildren;
  const pets = partnerProperty.allowPets;

  // Build a dynamic description from real data
  const parts: string[] = [];

  parts.push(
    `${name} is a${stars ? ` ${stars}-star` : ""} ${partnerProperty.propertyType?.toLowerCase() ?? "property"} located in ${city}, ${region}, ${country}.`
  );

  if (facilities.length > 0) {
    const facilityList = facilities.slice(0, 5).join(", ");
    parts.push(`The property offers ${facilityList}${facilities.length > 5 ? ` and ${facilities.length - 5} more amenities` : ""}.`);
  }

  if (breakfast) parts.push("A complimentary breakfast is included for all guests.");
  if (parking) parts.push("Free parking is available on site.");
  if (children && pets) {
    parts.push("The property welcomes families with children and pets.");
  } else if (children) {
    parts.push("The property welcomes families with children.");
  } else if (pets) {
    parts.push("Pets are welcome at this property.");
  }

  const checkIn = partnerProperty.checkInTimeFrom;
  const checkOut = partnerProperty.checkOutTimeFrom;
  if (checkIn && checkOut) {
    parts.push(`Check-in is from ${checkIn} and check-out is until ${checkOut}.`);
  }

  const staffLangs = partnerProperty.hotelStaffLanguages;
  if (staffLangs && staffLangs.length > 0) {
    parts.push(`Staff speak ${staffLangs.join(", ")}.`);
  }

  return (
    <Stack className="container" marginTop={"50px !important "} gap={2}>
      <Typography fontWeight={700} fontSize={20}>
        {t("hotel.aboutHotel")}
      </Typography>
      <Typography height={220} overflow={"auto"} lineHeight={1.8}>
        {parts.join(" ")}
      </Typography>
    </Stack>
  );
};

export default AboutThisHotel;
