import { Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Attraction } from "../../../types/attraction/attraction";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

interface AttractionInfoSectionProps {
  attraction?: Attraction | null;
}

const AttractionInfoSection = ({ attraction }: AttractionInfoSectionProps) => {
  const images = (attraction?.attractionImages ?? []).map((img) =>
    resolveImageUrl(img)
  );

  const fallback = "/img/hotel.jpg";

  return (
    <Stack
      flexDirection={"row"}
      height={520}
      className="container"
      justifyContent={"space-between"}
    >
      <Stack
        className="left-hotel-images-container"
        width={"100%"}
        height={500}
        justifyContent={"space-between"}
        gap={"10px"}
      >
        <Stack
          className="top-big-images-container"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Stack className="left-big-image">
            <Image
              src={images[0] ?? fallback}
              alt="attraction-image-1"
              width={800}
              height={470}
              style={{
                objectFit: "cover",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            />
          </Stack>
          <Stack
            className="right-small-images"
            justifyContent={"space-between"}
          >
            <Stack
              flexDirection={"row"}
              width={480}
              justifyContent={"space-between"}
            >
              <Image
                src={images[1] ?? fallback}
                alt="attraction-image-2"
                width={250}
                height={230}
                style={{
                  objectFit: "cover",
                }}
              />
              <Stack justifyContent={"space-between"}>
                <Image
                  src={images[2] ?? fallback}
                  alt="attraction-image-3"
                  width={220}
                  height={110}
                  style={{ objectFit: "cover", borderTopRightRadius: 5 }}
                />
                <Image
                  src={images[3] ?? fallback}
                  alt="attraction-image-4"
                  width={220}
                  height={110}
                  style={{ objectFit: "cover" }}
                />
              </Stack>
            </Stack>
            <Stack
              flexDirection={"row"}
              width={480}
              justifyContent={"space-between"}
            >
              <Image
                src={images[4] ?? fallback}
                alt="attraction-image-5"
                width={250}
                height={230}
                style={{ objectFit: "cover" }}
              />
              <Stack justifyContent={"space-between"}>
                <Image
                  src={images[5] ?? fallback}
                  alt="attraction-image-6"
                  width={220}
                  height={110}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Image
                  src={images[6] ?? fallback}
                  alt="attraction-image-7"
                  width={220}
                  height={110}
                  style={{
                    objectFit: "cover",
                    borderBottomRightRadius: 5,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttractionInfoSection;
