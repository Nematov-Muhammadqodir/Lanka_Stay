import { Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import ReviewMapContainer from "./ReviewMapContainer";
import { PropertyOverviewProps } from "./PropertyOverview";

const HotelInfoSection = ({
  partnerProperty,
  loading,
}: PropertyOverviewProps) => {
  if (!partnerProperty) return null;

  const images = partnerProperty.propertyImages || [];

  const topBigImage = images[0];
  const rightSmallImages = images.slice(1, 3); // second and third images
  const bottomSmallImages = images.slice(3); // rest of the images

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <Stack
      flexDirection={"row"}
      height={520}
      className="container"
      justifyContent={"space-between"}
    >
      {/* Left images */}
      <Stack
        className="left-hotel-images-container"
        width={900}
        height={520}
        justifyContent={"space-between"}
        gap={"10px"}
      >
        {/* Top container: 1 big image + 2 small images */}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          className="top-big-images-container"
        >
          {/* Big image */}
          {topBigImage && (
            <Stack className="left-big-image">
              <Image
                src={`${baseUrl}/${topBigImage}`}
                alt="hotel-image"
                width={600}
                height={400}
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
            </Stack>
          )}
          {/* Two small images */}
          <Stack
            className="right-small-images"
            justifyContent={"space-between"}
          >
            {rightSmallImages.map((img, index) => (
              <Image
                key={index}
                src={`${baseUrl}/${img}`}
                alt={`hotel-image-${index}`}
                width={290}
                height={195}
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
            ))}
          </Stack>
        </Stack>

        {/* Bottom container: remaining small images with scroll */}
        <Stack
          className="bottom-small-images-container"
          flexDirection={"row"}
          gap={"10px"}
          overflow="auto"
          sx={{
            maxWidth: 900,
            "&::-webkit-scrollbar": { height: "8px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          {bottomSmallImages.map((img, index) => (
            <Stack key={index} flex="0 0 auto">
              <Image
                src={`${baseUrl}/${img}`}
                alt={`hotel-image-bottom-${index}`}
                width={170}
                height={100}
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Right: Map / Reviews */}
      <Stack>
        <ReviewMapContainer />
      </Stack>
    </Stack>
  );
};

export default HotelInfoSection;
