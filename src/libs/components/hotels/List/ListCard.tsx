import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ListCard = () => {
  const [value, setValue] = React.useState<number | null>(4);
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
    >
      <Stack flexDirection={"row"} gap={2} position={"relative"}>
        <Image
          src={"/img/hotel.jpg"}
          alt="left-image"
          width={238}
          height={238}
          style={{ objectFit: "cover", borderRadius: 10 }}
        />
        <Box
          width={40}
          height={40}
          position={"absolute"}
          top={10}
          left={190}
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
                Hotel Noah
              </Typography>
              <Rating name="read-only" value={value} readOnly />
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <Typography className="small-bold-text" color={"primary.main"}>
                Jung-gu, Busan
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
                Breakfast included
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
                  <Typography className="small-text">9 nights,</Typography>
                  <Typography className="small-text">2 adults</Typography>
                </Stack>
                <Typography className="bold-text">KRW 828,820</Typography>
                <Typography className="small-text">
                  Includes taxes and charges
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                  }}
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
