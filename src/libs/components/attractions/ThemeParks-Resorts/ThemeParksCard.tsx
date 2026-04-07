import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
import { useRouter } from "next/router";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";

interface ThemeParksCardProps {
  item: {
    _id: string;
    itemType: string;
    name: string;
    city?: string;
    country?: string;
    image?: string;
    price?: number;
    rating?: number;
    totalReviews?: number;
    propertyType?: string;
    attractionType?: string;
  };
}

const ThemeParksCard = ({ item }: ThemeParksCardProps) => {
  const router = useRouter();
  const isProperty = item.itemType === "PROPERTY";

  const imageUrl = item.image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`
    : "/img/hotel.jpg";

  const handleClick = () => {
    if (isProperty) {
      router.push(`/hotels/hotelDetail/${item._id}`);
    } else {
      router.push(`/attractions/attractionDetail/${item._id}`);
    }
  };

  const typeLabel = isProperty
    ? item.propertyType ?? "Resort"
    : item.attractionType ?? "Theme Park";

  const priceLabel = isProperty
    ? `From ${formatKoreanWon(String(item.price ?? 0))}/night`
    : `From ${formatKoreanWon(String(item.price ?? 0))}`;

  return (
    <Stack
      onClick={handleClick}
      sx={{
        width: 220,
        height: 280,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Image
        src={imageUrl}
        alt={item.name}
        width={220}
        height={280}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />

      {/* Type Badge */}
      <Chip
        icon={
          isProperty ? (
            <HotelIcon sx={{ fontSize: 13, color: "white !important" }} />
          ) : (
            <AttractionsIcon sx={{ fontSize: 13, color: "white !important" }} />
          )
        }
        label={typeLabel}
        size="small"
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          fontWeight: 600,
          fontSize: 11,
          height: 24,
        }}
      />

      {/* Gradient */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "55%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Content */}
      <Stack
        position="absolute"
        bottom={12}
        left={12}
        right={12}
        gap={0.5}
      >
        <Typography
          fontSize={15}
          fontWeight={700}
          color="white"
          lineHeight={1.3}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.name}
        </Typography>
        {(item.rating ?? 0) > 0 && (
          <Stack direction="row" gap={0.3} alignItems="center">
            <StarIcon sx={{ color: "#FEBB05", fontSize: 14 }} />
            <Typography fontSize={11} fontWeight={700} color="white">
              {(item.rating ?? 0).toFixed(1)}
            </Typography>
            {(item.totalReviews ?? 0) > 0 && (
              <Typography fontSize={10} color="rgba(255,255,255,0.7)">
                ({item.totalReviews})
              </Typography>
            )}
          </Stack>
        )}
        <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
          <Typography fontSize={12} color="rgba(255,255,255,0.8)">
            {priceLabel}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ThemeParksCard;
