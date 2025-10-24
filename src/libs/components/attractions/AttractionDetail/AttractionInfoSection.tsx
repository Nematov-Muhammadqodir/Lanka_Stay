import { Stack } from "@mui/material";
import React from "react";
import Image from "next/image";

const AttractionInfoSection = () => {
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
              src="/img/forest.jpg"
              alt="user-image"
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
                src="/img/capadokia.jpg"
                alt="user-image"
                width={250}
                height={230}
                style={{
                  objectFit: "cover",
                }}
              />
              <Stack justifyContent={"space-between"}>
                <Image
                  src="/img/Busan.jpg"
                  alt="user-image"
                  width={220}
                  height={110}
                  style={{ objectFit: "cover", borderTopRightRadius: 5 }}
                />
                <Image
                  src="/img/boat.jpg"
                  alt="user-image"
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
                src="/img/Tokyo.jpg"
                alt="user-image"
                width={250}
                height={230}
                style={{ objectFit: "cover" }}
              />
              <Stack justifyContent={"space-between"}>
                <Image
                  src="/img/Jeju.jpg"
                  alt="user-image"
                  width={220}
                  height={110}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Image
                  src="/img/village.jpg"
                  alt="user-image"
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
