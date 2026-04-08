import { Box, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import { formatKoreanWon } from "../../handlers/priceHandler";

interface MostPickedCardProps {
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
    views?: number;
    propertyType?: string;
    attractionType?: string;
  };
}

export default function MostPickedCard({ item }: MostPickedCardProps) {
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

  const priceLabel = isProperty
    ? `${formatKoreanWon(String(item.price ?? 0))}/night`
    : `From ${formatKoreanWon(String(item.price ?? 0))}`;

  return (
    <Stack
      onClick={handleClick}
      sx={{
        width: { xs: "100%", sm: "48%", md: 313 },
        height: { xs: 200, sm: 230, md: 260 },
        borderRadius: "15px",
        flexShrink: 0,
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Price Badge */}
      <Typography
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "primary.main",
          padding: "5px 12px",
          borderBottomLeftRadius: 12,
          fontSize: 13,
          fontWeight: 700,
          zIndex: 2,
          color: "white",
        }}
      >
        {priceLabel}
      </Typography>

      {/* Type Badge */}
      <Chip
        icon={
          isProperty ? (
            <HotelIcon sx={{ fontSize: 14, color: "white !important" }} />
          ) : (
            <AttractionsIcon sx={{ fontSize: 14, color: "white !important" }} />
          )
        }
        label={isProperty ? item.propertyType ?? "Hotel" : item.attractionType ?? "Attraction"}
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

      {/* Image */}
      <Image
        src={imageUrl}
        alt={item.name}
        width={313}
        height={260}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* Bottom Content */}
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        px={1.5}
        pb={1.5}
        gap={0.5}
      >
        <Typography sx={{ fontSize: 18, color: "white", fontWeight: 700 }}>
          {item.name}
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
          {[item.city, item.country].filter(Boolean).join(", ")}
        </Typography>
        <Stack direction="row" gap={1.5} alignItems="center" mt={0.3}>
          {(item.rating ?? 0) > 0 && (
            <Stack direction="row" gap={0.3} alignItems="center">
              <StarIcon sx={{ color: "#FEBB05", fontSize: 16 }} />
              <Typography fontSize={12} fontWeight={700} color="white">
                {(item.rating ?? 0).toFixed(1)}
              </Typography>
              {(item.totalReviews ?? 0) > 0 && (
                <Typography fontSize={11} color="rgba(255,255,255,0.7)">
                  ({item.totalReviews})
                </Typography>
              )}
            </Stack>
          )}
          <Stack direction="row" gap={0.3} alignItems="center">
            <VisibilityIcon sx={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }} />
            <Typography fontSize={11} color="rgba(255,255,255,0.7)">
              {item.views ?? 0}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
