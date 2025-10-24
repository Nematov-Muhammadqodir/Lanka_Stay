import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

const AttractionsReviewCard = () => {
  return (
    <Stack
      width={380}
      height={210}
      sx={{
        border: "1px solid",
        borderRadius: 2,
        p: 2,
        borderColor: "text.disabled",
        gap: 2,
      }}
    >
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Image
          src={"/img/Villa.jpg"}
          alt="user-image"
          width={40}
          height={40}
          style={{ objectFit: "cover", borderRadius: 200 }}
        />
        <Stack>
          <Typography fontWeight={700}>Shakh</Typography>
          <Typography className="small-text">Russia</Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography>
          Great attraction. A must see when travelling in London. The view from
          ther eye in amazing.{" "}
        </Typography>
      </Stack>
      <Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <FamilyRestroomIcon />
          <Typography>Visited with family</Typography>
        </Stack>
        <Typography className="small-text">
          Posted 30 March 2025 on LankStay.com
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AttractionsReviewCard;
