import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function MostPickedCard() {
  return (
    <Stack
      sx={{
        width: 313,
        height: 251,
        borderRadius: 15,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack>
        <Typography
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "primary.main",
            padding: "5px 10px",
            borderBottomLeftRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            zIndex: 1,
            color: "secondary.contrastText",
          }}
        >
          $34/night
        </Typography>
      </Stack>
      <Image
        src="/img/hotel.jpg"
        alt="user-image"
        width={313}
        height={251}
        style={{ objectFit: "cover", borderRadius: 15 }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top right, rgba(0,0,0,0.6) 15%, rgba(0,0,0,0) 50%)",
          borderRadius: 4,
        }}
      />
      <Stack position={"absolute"} bottom={10} left={10} gap={0.5}>
        <Typography sx={{ fontSize: 20, color: "white", fontWeight: 600 }}>
          Ocean Land
        </Typography>
        <Typography sx={{ fontSize: 15, color: "white", fontWeight: 500 }}>
          Trincomalee, Sri Lanka
        </Typography>
      </Stack>
    </Stack>
  );
}
