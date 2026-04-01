import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

interface AttractionTypesCardProps {
  icon?: string;
  attractionType: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const AttractionTypesCard = ({
  icon,
  attractionType,
  isSelected,
  onClick,
}: AttractionTypesCardProps) => {
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      onClick={onClick}
      sx={{
        border: "1px solid",
        px: 2,
        py: 1,
        borderColor: isSelected ? "primary.main" : "text.disabled",
        borderRadius: 3,
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: isSelected ? "primary.main" : "background.paper",
        "&:hover": {
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          transform: "scale(1.03)",
          borderColor: "primary.main",
        },
      }}
    >
      <Image
        src={icon || "/img/attractions/tour-guide.png"}
        alt={attractionType}
        width={40}
        height={40}
        style={{
          objectFit: "cover",
          width: "40px",
          height: "40px",
          filter: isSelected ? "brightness(0) invert(1)" : "none",
        }}
      />
      <Stack>
        <Typography
          className="bold-text-medium"
          color={isSelected ? "white" : "text.primary"}
        >
          {attractionType}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AttractionTypesCard;
