"use client";
import { Stack } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const DetailLayoutBanner = () => {
  const images = [
    "/img/beach.jpg",
    "/img/forest.jpg",
    "/img/hotels.jpg",
    "/img/kim-sung-jin.jpg",
    "/img/village.jpg",
    "/img/Busan.jpg",
    "/img/Tokyo.jpg",
    "/img/Seoul.jpg",
    "/img/Villa.jpg",
    "/img/cable-car.jpg",
  ];

  return (
    <Stack mt={"0px !important"}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000, // 10 seconds
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: "100%", height: "435px" }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`banner-image-${index}`}
              width={1500}
              height={435}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "435px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default DetailLayoutBanner;
