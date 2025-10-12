import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StillInterestedCard = () => {
  const like = true;
  return (
    <Stack
      sx={{
        width: "247px",
        height: "338px",
        border: "1px solid #eee",
        borderRadius: "8px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: 210,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          src="/img/hotel2.jpg"
          alt="user-image"
          width={247}
          height={211}
          style={{
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <Box
          position={"absolute"}
          top={5}
          right={5}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: "50%",
            pt: "8px",
          }}
        >
          {like ? (
            <FavoriteIcon sx={{ color: "#C0392B" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Box>
      </Stack>
      <Stack sx={{ padding: "10px", gap: "3px" }}>
        <Typography
          fontWeight={700}
          width={"100%"}
          height={45}
          overflow={"hidden"}
        >
          Haeundae Seacloud Hotel Residence
        </Typography>
        <Typography fontSize={12}>Busan, South Korea</Typography>
        <Stack flexDirection={"row"}>
          <Box
            sx={{
              width: 28,
              height: 28,
              backgroundColor: "primary.main",
              border: "1px solid #eee",
              borderRadius: "6px",
              mr: 1,
              mt: 0.3,
              textAlign: "center",
              justifyContent: "center",
              borderBottomLeftRadius: 0,
            }}
          >
            <Typography
              fontSize={12}
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              color={"secondary.contrastText"}
              paddingTop={0.3}
            >
              8.0
            </Typography>
          </Box>
          <Typography fontSize={13}>
            Good <br />
            371 reviews
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StillInterestedCard;
