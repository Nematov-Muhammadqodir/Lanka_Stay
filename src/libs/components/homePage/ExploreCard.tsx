import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
import { useRouter } from "next/router";

interface ExploreCardProps {
  region: {
    region: string;
    country: string;
    image?: string;
    propertyCount: number;
    attractionCount: number;
    totalListings: number;
  };
}

const ExploreCard = ({ region }: ExploreCardProps) => {
  const router = useRouter();

  const imageUrl = region.image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${region.image}`
    : "/img/hotel.jpg";

  const handleClick = () => {
    router.push(`/hotels?region=${encodeURIComponent(region.region)}`);
  };

  return (
    <Stack
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack
        height={135}
        width={170}
        borderRadius="15px"
        overflow="hidden"
        position="relative"
      >
        <Image
          src={imageUrl}
          alt={region.region}
          width={170}
          height={135}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Stack>
      <Stack height={65} paddingY={1} gap={0.3}>
        <Typography fontWeight={700} fontSize={15}>
          {region.region}
        </Typography>
        <Stack direction="row" gap={1.5} alignItems="center">
          {region.propertyCount > 0 && (
            <Stack direction="row" gap={0.3} alignItems="center">
              <HotelIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography fontSize={12} color="text.secondary">
                {region.propertyCount}
              </Typography>
            </Stack>
          )}
          {region.attractionCount > 0 && (
            <Stack direction="row" gap={0.3} alignItems="center">
              <AttractionsIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography fontSize={12} color="text.secondary">
                {region.attractionCount}
              </Typography>
            </Stack>
          )}
          <Typography fontSize={12} color="text.secondary">
            {region.totalListings} {region.totalListings === 1 ? "listing" : "listings"}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ExploreCard;
