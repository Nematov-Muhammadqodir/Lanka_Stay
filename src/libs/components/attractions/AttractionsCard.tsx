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
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

const AttractionsListCard = () => {
  const [value, setValue] = React.useState<number | null>(4);
  const router = useRouter();
  const handleClick = () => {
    router.push("/attractions/attractionDetail/id=2"); // 🔹 replace "1" with dynamic id later
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
          src={"/img/hotel.jpg"}
          alt="left-image"
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
                Admission to the London Eye
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text">Busan</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              {/* <Typography className="small-text">Beach nearby</Typography> */}
              <Typography className="small-text">
                With this admission ticket, you can hop aboard the iconic London
                Eye for a 30-minute ride over the city. The observation wheel
                reaches a
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Stack>
                <Stack flexDirection={"row"} gap={1}>
                  <TimerIcon />
                  <Typography className="small-text">
                    Duration: 30 minutes
                  </Typography>
                </Stack>
                <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                  <StarIcon sx={{ color: "#FEBB05" }} />
                  <Typography className="small-bold-text">
                    4.5 · Fabulous (5013 reviews)
                  </Typography>
                </Stack>
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
              </Stack>

              <Stack className="right" textAlign={"right"}>
                <Stack justifyContent={"space-between"} height={"100%"}>
                  <Stack>
                    <Typography className="bold-text">KRW 828,820</Typography>
                    <Typography className="small-text">
                      Includes taxes and charges
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                      }}
                      onClick={handleClick}
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
