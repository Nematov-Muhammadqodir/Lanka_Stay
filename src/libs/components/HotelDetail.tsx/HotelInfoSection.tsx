import { Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import ReviewMapContainer from "./ReviewMapContainer";

const HotelInfoSection = () => {
  return (
    <Stack
      flexDirection={"row"}
      height={520}
      className="container"
      justifyContent={"space-between"}
    >
      <Stack
        className="left-hotel-images-container"
        width={900}
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
              src="/img/Villa.jpg"
              alt="user-image"
              width={600}
              height={400}
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
          </Stack>
          <Stack
            className="right-small-images"
            justifyContent={"space-between"}
          >
            <Image
              src="/img/beach.jpg"
              alt="user-image"
              width={290}
              height={195}
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
            <Image
              src="/img/hotel.jpg"
              alt="user-image"
              width={290}
              height={195}
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
          </Stack>
        </Stack>
        <Stack
          className="bottom-small-images-container"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Image
            src="/img/hotels.jpg"
            alt="user-image"
            width={170}
            height={100}
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
          <Image
            src="/img/Seoul.jpg"
            alt="user-image"
            width={170}
            height={100}
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
          <Image
            src="/img/Jeju.jpg"
            alt="user-image"
            width={170}
            height={100}
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
          <Image
            src="/img/Busan.jpg"
            alt="user-image"
            width={170}
            height={100}
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
          <Image
            src="/img/lanka-stay.jpg"
            alt="user-image"
            width={170}
            height={100}
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
        </Stack>
      </Stack>
      <Stack>
        <ReviewMapContainer />
      </Stack>
    </Stack>
  );
};

export default HotelInfoSection;
