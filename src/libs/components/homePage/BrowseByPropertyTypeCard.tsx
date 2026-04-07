import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

interface BrowseByPropertyTypeCardProps {
  type: {
    propertyType: string;
    count: number;
    image?: string;
  };
}

const BrowseByPropertyTypeCard = ({ type }: BrowseByPropertyTypeCardProps) => {
  const router = useRouter();

  const imageUrl = type.image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${type.image}`
    : "/img/hotel.jpg";

  const handleClick = () => {
    router.push(`/hotels?type=${encodeURIComponent(type.propertyType)}`);
  };

  return (
    <Stack
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease",
        flexShrink: 0,
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack width={220} height={180} borderRadius="15px" overflow="hidden">
        <Image
          src={imageUrl}
          alt={type.propertyType}
          width={220}
          height={180}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Stack>
      <Stack paddingY={1} gap={0.2}>
        <Typography fontWeight={700} fontSize={16}>
          {type.propertyType}s
        </Typography>
        <Typography fontSize={13} color="text.secondary">
          {type.count} {type.count === 1 ? "property" : "properties"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BrowseByPropertyTypeCard;
