import { Box, Stack, Typography, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCoordinates } from "../../handlers/common";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";
import CustomMap from "./CustomMap";

export interface ReviewMapContainerProps {
  partnerProperty?: PartnerProperty;
}

const ReviewMapContainer = (props: ReviewMapContainerProps) => {
  const { partnerProperty } = props;
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (!partnerProperty) return;

    const fetchCoordinates = async () => {
      const coords = await getCoordinates(
        partnerProperty.propertyCountry,
        partnerProperty.propertyRegion
      );
      setLatLng(coords);
    };

    fetchCoordinates();
  }, [partnerProperty]);

  console.log("latLng", latLng);

  if (!latLng) return <div>Loading map...</div>;
  return (
    <Stack
      className="right-review-map-container"
      width={390}
      height={510}
      justifyContent={"space-between"}
    >
      <Stack
        className="review-container"
        height={300}
        border={"1px solid"}
        borderColor={"secondary.main"}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          justifyContent={"flex-end"}
          padding={1}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack>
            <Typography fontWeight={700}>Fabulous</Typography>
            <Typography fontSize={12}>1,310 reviews</Typography>
          </Stack>
          <Box
            padding={"5px"}
            sx={{ backgroundColor: "primary.main", borderRadius: 1 }}
          >
            <Typography color={"secondary.contrastText"}>8.9</Typography>
          </Box>
        </Stack>
        <Stack
          gap={2}
          padding={1}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack>Guests who stayed here loved</Stack>
          <Stack gap={1}>
            <Typography height={90} overflow={"auto"}>
              “Nice facilities, great size family rooms. Delicious breakfast!
              Good location on the sea front in walking distance to some super
              restaurants and cafes.”
            </Typography>
            <Stack flexDirection={"row"} gap={1}>
              <Image
                src="/img/Villa.jpg"
                alt="user-image"
                width={30}
                height={30}
                style={{ objectFit: "cover", borderRadius: 200 }}
              />
              <Typography fontWeight={700}>Hannah</Typography>
              <Typography>United Kingdom</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          gap={1}
          justifyContent={"center"}
          padding={1}
          flexDirection={"row"}
        >
          <Stack justifyContent={"center"}>
            <Typography fontWeight={700}>
              Top Rated Coffee Shops Nearby
            </Typography>
          </Stack>
          <Box
            padding={"5px"}
            sx={{ backgroundColor: "primary.main", borderRadius: 1 }}
          >
            <Typography color={"secondary.contrastText"}>8.9</Typography>
          </Box>
        </Stack>
      </Stack>

      <CustomMap
        country={partnerProperty?.propertyCountry}
        lat={latLng.lat}
        lng={latLng.lng}
      />
    </Stack>
  );
};

export default ReviewMapContainer;
