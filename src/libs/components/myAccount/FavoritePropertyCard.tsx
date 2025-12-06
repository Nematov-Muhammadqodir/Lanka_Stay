import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PartnerProperty } from "../../types/partnerInput/partnerProperty";
import { useRouter } from "next/router";
import { LIKE_TARGET_PROPERTY } from "@/apollo/user/mutation";
import { useMutation, useReactiveVar } from "@apollo/client";
import { Messages } from "../../config";
import { userVar } from "@/apollo/store";

interface FavoritePropertyCardProps {
  property?: PartnerProperty;
}

const FavoritePropertyCard = ({ property }: FavoritePropertyCardProps) => {
  console.log("propertyyy", property);
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const like = true;
  return (
    <Stack
      sx={{
        width: "207px",
        height: "308px",
        border: "1px solid #eee",
        borderRadius: "8px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={() => router.push(`/hotels/hotelDetail/${property?._id}`)}
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
          src={
            property?.propertyImages?.[0]
              ? `${process.env.NEXT_PUBLIC_API_URL}/${property.propertyImages[0]}`
              : "/img/hotel.jpg"
          }
          alt="property-image"
          width={207}
          height={211}
          style={{
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      </Stack>
      <Stack sx={{ padding: "10px", gap: "3px" }}>
        <Typography
          fontWeight={700}
          width={"100%"}
          height={45}
          overflow={"hidden"}
        >
          {property?.propertyName}
        </Typography>
        <Typography fontSize={12}>
          {property?.propertyRegion}, {property?.propertyCountry}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FavoritePropertyCard;
