"use client";
import { Stack, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AttractionsLayoutBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const bannerHeight = isMobile ? 220 : 380;

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
        navigation={!isMobile}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: "100%", height: `${bannerHeight}px` }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            <Image
              src={src}
              alt={`banner-image-${index}`}
              width={1500}
              height={bannerHeight}
              style={{
                objectFit: "cover",
                width: "100%",
                height: `${bannerHeight}px`,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.45)",
                zIndex: 1,
              }}
            />

            <Typography
              position={"absolute"}
              sx={{
                top: { xs: "30%", md: "20%" },
                left: { xs: "6%", md: "10%" },
                right: { xs: "6%", md: "auto" },
                fontSize: { xs: 26, sm: 36, md: 50 },
                color: "white",
                fontWeight: 800,
                zIndex: 2,
                lineHeight: 1.2,
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
