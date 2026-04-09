import { Box, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { useRouter } from "next/router";
import { formatKoreanWon } from "../../handlers/priceHandler";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

interface PopularAttractionCardProps {
  attraction: {
    _id: string;
    attractionName: string;
    attractionCity?: string;
    attractionCountry?: string;
    attractionImages?: string[];
    attractionAdultPrice?: number;
    attractionType?: string;
    averageRating?: number;
    totalReviews?: number;
    freeCancellation?: boolean;
  };
}

const PopularAttractionCard = ({ attraction }: PopularAttractionCardProps) => {
  const router = useRouter();

  const imageUrl =
    attraction.attractionImages && attraction.attractionImages.length > 0
      ? resolveImageUrl(attraction.attractionImages[0])
      : "/img/hotel.jpg";

  const handleClick = () => {
    router.push(`/attractions/attractionDetail/${attraction._id}`);
  };

  return (
    <Stack onClick={handleClick} sx={{ flexShrink: 0 }}>
      <Stack
        width={290}
        height={220}
        position="relative"
        sx={{
          cursor: "pointer",
          borderRadius: "15px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* Type chip */}
        <Chip
          label={attraction.attractionType ?? "Attraction"}
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

        <Image
          src={imageUrl}
          alt={attraction.attractionName}
          width={290}
          height={220}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 70%)",
          }}
        />
        <Stack
          position="absolute"
          bottom={12}
          left={12}
          right={12}
          gap={0.3}
        >
          <Typography
            sx={{ fontSize: 17, color: "white", fontWeight: 700 }}
            noWrap
          >
            {attraction.attractionName}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={13} color="rgba(255,255,255,0.85)">
              From {formatKoreanWon(String(attraction.attractionAdultPrice ?? 0))}
            </Typography>
            {(attraction.averageRating ?? 0) > 0 && (
              <Stack direction="row" gap={0.3} alignItems="center">
                <StarIcon sx={{ color: "#FEBB05", fontSize: 15 }} />
                <Typography fontSize={12} fontWeight={700} color="white">
                  {(attraction.averageRating ?? 0).toFixed(1)}
                </Typography>
              </Stack>
            )}
          </Stack>
          {attraction.freeCancellation && (
            <Stack direction="row" gap={0.5} alignItems="center" mt={0.2}>
              <EventRepeatIcon sx={{ color: "#4caf50", fontSize: 14 }} />
              <Typography fontSize={11} color="#4caf50" fontWeight={600}>
                Free cancellation
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PopularAttractionCard;
