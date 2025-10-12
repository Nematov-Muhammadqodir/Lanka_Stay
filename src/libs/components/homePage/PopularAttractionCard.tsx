import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const PopularAttractionCard = () => {
  return (
    <Stack>
      <Stack
        width={317}
        height={230}
        position={"relative"}
        sx={{
          cursor: "pointer",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <Image
          src="/img/cable-car.jpg"
          alt="user-image"
          width={317}
          height={230}
          style={{ objectFit: "cover", borderRadius: 15 }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            borderRadius: 4,
          }}
        />
        <Stack position={"absolute"} bottom={15} color={"white"} left={10}>
          <Typography fontWeight={700} sx={{ fontSize: 20 }}>
            Cable Car Ride in Busan
          </Typography>
          <Typography>Starting from KRW 15,876</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PopularAttractionCard;
