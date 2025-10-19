import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

interface AttractionTypesCardProps {
  icon?: any;
  attractionType: any;
  numberOfThingsToDo: any;
}

const AttractionTypesCard = ({
  icon,
  attractionType,
  numberOfThingsToDo,
}: AttractionTypesCardProps) => {
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      sx={{
        border: "1px solid",
        px: 2,
        py: 1,
        borderColor: "text.disabled",
        borderRadius: 3,
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: "background.paper",
        "&:hover": {
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          transform: "scale(1.03)",
          borderColor: "primary.main",
          backgroundColor: "action.hover",
        },
      }}
    >
      <Image
        src={icon}
        alt={`banner-image`}
        width={40}
        height={40}
        style={{
          objectFit: "cover",
          width: "40px",
          height: "40px",
        }}
      />
      <Stack>
        <Typography className="bold-text-medium">{attractionType}</Typography>
        <Typography className="small-text">
          {numberOfThingsToDo} things to do
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AttractionTypesCard;
