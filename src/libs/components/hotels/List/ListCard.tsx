import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { formatKoreanWon } from "@/src/libs/handlers/priceHandler";

const ListCard = ({ item }: { item: any }) => {
  const filters = useSelector((state: RootState) => state.filters);
  console.log("itemm", item);
  const [value, setValue] = React.useState<number | null>(4);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/hotels/hotelDetail/${item._id}`); // 🔹 replace "1" with dynamic id later
  };
  return (
    <Stack
      p={1}
      px={1.5}
      height={275}
      width={"100%"}
      border={"1px solid"}
      borderColor={"text.disabled"}
      borderRadius={3}
      justifyContent={"center"}
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
          src={
            item.propertyImages
              ? `${process.env.NEXT_PUBLIC_API_URL}/${item.propertyImages[0]}`
              : "/img/hotel.jpg"
          }
          alt="left-image"
          width={298}
          height={238}
          style={{ objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
        />
        <Box
          width={40}
          height={40}
          position={"absolute"}
          top={10}
          left={245}
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
          <Stack className="middle" gap={1}>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="bold-text" color={"primary.main"}>
                {item.propertyName}
              </Typography>
              <Rating name="read-only" value={item.propertyStars} readOnly />
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text" color={"primary.main"}>
                {item.propertyCity}, {item.propertyRegion}
              </Typography>
              <Typography className="small-text">7.7 km from centre</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text">Metro access</Typography>
              <Typography className="small-text">Beach nearby</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <BeachAccessIcon />
              <Typography className="small-text">2.3 km from beach</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1} color={"primary.main"}>
              <RestaurantIcon />
              <Typography className="small-bold-text">
                Breakfast {item.breakfastIncluded ? "" : "not"} included
              </Typography>
            </Stack>
          </Stack>
          <Stack className="right" textAlign={"right"}>
            <Stack justifyContent={"space-between"} height={"100%"}>
              <Stack>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                  justifyContent={"end"}
                >
                  <Stack>
                    <Typography className="bold-text">Very good</Typography>
                    <Typography className="small-text">124 reviews</Typography>
                  </Stack>
                  <Stack
                    border={"1px solid"}
                    width={40}
                    height={40}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={1}
                    sx={{ backgroundColor: "primary.main", color: "white" }}
                  >
                    <Typography className="bold-text">8.3</Typography>
                  </Stack>
                </Stack>
                <Typography className="small-bold-text" color={"primary.main"}>
                  Comfort 8.9
                </Typography>
              </Stack>
              <Stack>
                <Stack
                  flexDirection={"row"}
                  gap={1}
                  justifyContent={"flex-end"}
                >
                  <Typography className="small-text">
                    {Number(filters.endDate?.split("-")[2].split("T")[0]) -
                      Number(
                        filters.startDate?.split("-")[2].split("T")[0]
                      )}{" "}
                    nights,
                  </Typography>
                  <Typography className="small-text">2 adults</Typography>
                </Stack>
                <Typography className="bold-text">
                  {formatKoreanWon(item.propertyRooms[0].roomPricePerNight)}
                </Typography>
                <Typography className="small-text">
                  Includes taxes and charges
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                  }}
                  onClick={handleClick}
                >
                  <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "secondary.contrastText",
                      }}
                    >
                      See Availability
                    </Typography>
                    <NavigateNextIcon
                      sx={{ color: "secondary.contrastText" }}
                    />
                  </Stack>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListCard;
