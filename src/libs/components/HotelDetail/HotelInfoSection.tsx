import { Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import ReviewMapContainer from "./ReviewMapContainer";
import { PropertyOverviewProps } from "./PropertyOverview";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

const HotelInfoSection = ({
  partnerProperty,
  loading,
}: PropertyOverviewProps) => {
  if (!partnerProperty) return null;

  const images = partnerProperty.propertyImages || [];

  const topBigImage = images[0];
  const rightSmallImages = images.slice(1, 3); // second and third images
  const bottomSmallImages = images.slice(3); // rest of the images

  return (
    <Stack
      className="container"
      sx={{
        flexDirection: { xs: "column", md: "row" },
        height: { xs: "auto", md: 520 },
        justifyContent: "space-between",
        gap: { xs: 2, md: 0 },
      }}
    >
      {/* Left images */}
      <Stack
        className="left-hotel-images-container"
        sx={{
          width: { xs: "100%", md: 900 },
          height: { xs: "auto", md: 520 },
          gap: "10px",
        }}
        justifyContent={"space-between"}
      >
        {/* Top container: 1 big image + 2 small images */}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={"10px"}
          className="top-big-images-container"
        >
          {/* Big image */}
          {topBigImage && (
            <Stack className="left-big-image" sx={{ flex: { xs: 2, md: "0 0 auto" } }}>
              <Image
                src={resolveImageUrl(topBigImage)}
                alt="hotel-image"
                width={600}
                height={400}
                style={{ objectFit: "cover", borderRadius: 5, width: "100%", height: "auto", maxHeight: 400 }}
              />
            </Stack>
          )}
          {/* Two small images */}
          <Stack
            className="right-small-images"
            justifyContent={"space-between"}
            sx={{ flex: { xs: 1, md: "0 0 auto" }, gap: "10px" }}
          >
            {rightSmallImages.map((img, index) => (
              <Image
                key={index}
                src={resolveImageUrl(img)}
                alt={`hotel-image-${index}`}
                width={290}
                height={195}
                style={{ objectFit: "cover", borderRadius: 5, width: "100%", height: "auto", maxHeight: 195 }}
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
            maxWidth: { xs: "100%", md: 900 },
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
                src={resolveImageUrl(img)}
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
      <Stack sx={{ width: { xs: "100%", md: "auto" } }}>
        <ReviewMapContainer partnerProperty={partnerProperty} />
      </Stack>
    </Stack>
  );
};

export default HotelInfoSection;
