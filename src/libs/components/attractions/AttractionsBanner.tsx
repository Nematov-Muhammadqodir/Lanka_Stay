"use client";
import { Stack, Typography, Box } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AttractionsLayoutBanner = () => {
  const images = [
    "/img/attractions/charxfalak1.jpg",
    "/img/attractions/boutes.jpg",
    "/img/attractions/korean-hist.jpg",
    "/img/attractions/poyezd.jpg",
    "/img/attractions/gwangalli.jpg",
    "/img/attractions/village2.jpg",
  ];

  return (
    <Stack mt={"0px !important"} position={"relative"}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: "100%", height: "380px" }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            {/* Background image */}
            <Image
              src={src}
              alt={`banner-image-${index}`}
              width={1500}
              height={380}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "380px",
              }}
            />

            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.45)", // adjust opacity (0.3–0.6)
                zIndex: 1,
              }}
            />

            {/* Text */}
            <Typography
              position={"absolute"}
              top={"20%"}
              left={"10%"}
              sx={{
                fontSize: 50,
                color: "white",
                fontWeight: 800,
                zIndex: 2,
              }}
            >
              Up to 15% off services
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default AttractionsLayoutBanner;
