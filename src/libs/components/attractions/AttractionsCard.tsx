import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";

interface AttractionsListCardProps {
  attraction: any;
}

const AttractionsListCard = ({ attraction }: AttractionsListCardProps) => {
  const router = useRouter();

  const imageUrl =
    attraction.attractionImages && attraction.attractionImages.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}/${attraction.attractionImages[0]}`
      : "/img/hotel.jpg";

  const handleClick = () => {
    router.push(`/attractions/attractionDetail/${attraction._id}`);
  };

  return (
    <Stack
      pt={3}
      px={2.5}
      height={250}
      width={"100%"}
      border={"1px solid"}
      borderColor={"text.disabled"}
      borderRadius={3}
      justifyContent={"flex-start"}
      onClick={handleClick}
      sx={{
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          borderColor: "primary.main",
        },
      }}
    >
      <Stack flexDirection={"row"} gap={2} position={"relative"}>
        <Image
          src={imageUrl}
          alt={attraction.attractionName || "Attraction"}
          width={175}
          height={175}
          style={{ objectFit: "cover", borderRadius: 5 }}
        />
        <Box
          width={40}
          height={40}
          position={"absolute"}
          top={10}
          left={125}
          textAlign={"center"}
          pt={1}
          bgcolor={"secondary.contrastText"}
          borderRadius={"50%"}
        >
          <FavoriteIcon sx={{ color: "#D40F1D" }} />
        </Box>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack className="middle" gap={0.5}>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="bold-text">
                {attraction.attractionName || "Untitled Attraction"}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text">
                {attraction.attractionCity || "Unknown City"}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-text">
                {attraction.attractionDescription
                  ? attraction.attractionDescription.length > 150
                    ? attraction.attractionDescription.substring(0, 150) + "..."
                    : attraction.attractionDescription
                  : "No description available"}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Stack>
                {attraction.attractionDuration && (
                  <Stack flexDirection={"row"} gap={1}>
                    <TimerIcon />
                    <Typography className="small-text">
                      Duration: {attraction.attractionDuration}
                    </Typography>
                  </Stack>
                )}
                <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                  <StarIcon sx={{ color: "#FEBB05" }} />
                  <Typography className="small-bold-text">
                    {attraction.averageRating ?? 0} ({attraction.totalReviews ?? 0} reviews)
                  </Typography>
                </Stack>
                {attraction.freeCancellation && (
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    alignItems={"center"}
                    sx={{ color: "#018233" }}
                  >
                    <EventRepeatIcon />
                    <Typography className="small-text">
                      Free cancellation available
                    </Typography>
                  </Stack>
                )}
              </Stack>

              <Stack className="right" textAlign={"right"}>
                <Stack justifyContent={"space-between"} height={"100%"}>
                  <Stack>
                    <Typography className="bold-text">
                      {formatKoreanWon(String(attraction.attractionAdultPrice ?? 0))}
                    </Typography>
                    <Typography className="small-text">
                      Includes taxes and charges
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                    >
                      <Stack
                        flexDirection={"row"}
                        gap={1}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          See Availability
                        </Typography>
                        <NavigateNextIcon />
                      </Stack>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttractionsListCard;
