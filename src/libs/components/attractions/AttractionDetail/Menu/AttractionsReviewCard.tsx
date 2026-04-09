import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { resolveImageUrl } from "@/src/libs/handlers/imageHandler";

interface AttractionsReviewCardProps {
  comment: any;
}

const AttractionsReviewCard = ({ comment }: AttractionsReviewCardProps) => {
  const memberData = comment.memberData;
  const avatarUrl = memberData?.guestImage
    ? resolveImageUrl(memberData.guestImage)
    : "/img/logo/uniface.jpg";

  const createdAt = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const content = comment.commentContent ?? "";

  return (
    <Stack
      width={380}
      height={210}
      sx={{
        border: "1px solid",
        borderRadius: 2,
        p: 2,
        borderColor: "divider",
        gap: 1.5,
        justifyContent: "space-between",
      }}
    >
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Image
          src={avatarUrl}
          alt="user-image"
          width={40}
          height={40}
          style={{ objectFit: "cover", borderRadius: 200 }}
        />
        <Stack>
          <Typography fontWeight={700} fontSize={14}>
            {memberData?.guestName ?? "Guest"}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {memberData?.guestCountry ?? ""}
          </Typography>
        </Stack>
      </Stack>
      <Stack flex={1}>
        <Typography fontSize={14}>
          {content.length > 120 ? content.slice(0, 120) + "..." : content}
        </Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
        <CalendarMonthIcon sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography fontSize={12} color="text.secondary">
          Posted {createdAt} on LankaStay.com
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AttractionsReviewCard;
