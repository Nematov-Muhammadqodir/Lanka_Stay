import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const BrowseByPropertyTypeCard = () => {
  return (
    <Stack
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack width={265} height={210}>
        <Image
          src="/img/Villa.jpg"
          alt="user-image"
          width={260}
          height={210}
          style={{ objectFit: "cover", borderRadius: 15 }}
        />
      </Stack>
      <Stack width={265} height={130} paddingY={1}>
        <Typography fontWeight={800}>Hotels</Typography>
        <Typography>17 Oct-18 Oct, 2 adults</Typography>
        <Typography>35 available</Typography>
      </Stack>
    </Stack>
  );
};

export default BrowseByPropertyTypeCard;
