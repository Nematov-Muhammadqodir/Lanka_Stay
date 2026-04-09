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
        alignItems: "stretch",
        gap: { xs: 2, md: 2 },
      }}
    >
      {/* Left images */}
      <Stack
        className="left-hotel-images-container"
        sx={{
          flex: { xs: "unset", md: 1 },
          minWidth: 0,
          width: { xs: "100%", md: "auto" },
          height: { xs: "auto", md: 520 },
          gap: "10px",
        }}
        justifyContent={"space-between"}
      >
        {/* Top container: 1 big image + 2 small images */}
        <Stack
          flexDirection={"row"}
          gap={"10px"}
          className="top-big-images-container"
          sx={{ width: "100%", minWidth: 0 }}
        >
          {/* Big image */}
          {topBigImage && (
            <Stack
              className="left-big-image"
              sx={{
                flex: { xs: 2, md: "1 1 0%" },
                minWidth: 0,
                position: "relative",
                height: { xs: 240, md: 400 },
              }}
            >
              <Image
                src={resolveImageUrl(topBigImage)}
                alt="hotel-image"
                fill
                sizes="(max-width: 900px) 60vw, 600px"
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
            </Stack>
          )}
          {/* Two small images */}
          <Stack
            className="right-small-images"
            justifyContent={"space-between"}
            sx={{
              flex: { xs: 1, md: "0 0 290px" },
              minWidth: 0,
              gap: "10px",
              height: { xs: 240, md: 400 },
            }}
          >
            {rightSmallImages.map((img, index) => (
              <Stack
                key={index}
                sx={{
                  position: "relative",
                  flex: 1,
                  minHeight: 0,
                  width: "100%",
                }}
              >
                <Image
                  src={resolveImageUrl(img)}
                  alt={`hotel-image-${index}`}
                  fill
                  sizes="290px"
                  style={{ objectFit: "cover", borderRadius: 5 }}
                />
              </Stack>
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
            width: "100%",
            "&::-webkit-scrollbar": { height: "8px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          {bottomSmallImages.map((img, index) => (
            <Stack
              key={index}
              sx={{
                flex: "0 0 170px",
                position: "relative",
                width: 170,
                height: 100,
              }}
            >
              <Image
                src={resolveImageUrl(img)}
                alt={`hotel-image-bottom-${index}`}
                fill
                sizes="170px"
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Right: Map / Reviews */}
      <Stack
        sx={{
          flex: { xs: "unset", md: "0 0 390px" },
          width: { xs: "100%", md: 390 },
        }}
      >
        <ReviewMapContainer partnerProperty={partnerProperty} />
      </Stack>
    </Stack>
  );
};

export default HotelInfoSection;
