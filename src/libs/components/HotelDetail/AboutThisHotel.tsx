import { Stack, Typography } from "@mui/material";
import { PropertyOverviewProps } from "./PropertyOverview";

const AboutThisHotel = ({
  partnerProperty,
  loading,
}: PropertyOverviewProps) => {
  return (
    <Stack className="container" marginTop={"50px !important "} gap={2}>
      <Typography fontWeight={700} fontSize={20}>
        About this property
      </Typography>
      <Typography height={220} overflow={"auto"}>
        {partnerProperty?.propertyName} is located in{" "}
        {partnerProperty?.propertyCity} City just a short walk from{" "}
        {partnerProperty?.propertyRegion} Beach. It houses an outdoor terrace
        where guests can enjoy panoramic sunset views. Free WiFi is available at
        all areas. Boasting a private terrace with sweeping sea views, rooms
        will provide you with a flat-screen TV and coffee machine. Featuring
        hot-water showers, private bathrooms also come with a bathtub and free
        toiletries. At {partnerProperty?.propertyName}, you will find a 24-hour
        front desk with luggage storage space. The on-site restaurant features a
        sea view and serves a Korean or American breakfast. The nearest
        supermarket is an 8-minute drive from the property. Couples particularly
        like the location — they rated it 8.9 for a two-person trip.
      </Typography>
    </Stack>
  );
};

export default AboutThisHotel;
