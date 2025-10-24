import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import BedIcon from "@mui/icons-material/Bed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState } from "react";

const TourReviewItemForMenu = () => {
  const [expand, setExpand] = useState("70px");

  const handleExpand = () => {
    if (expand === "70px") {
      setExpand("auto");
    } else {
      setExpand("70px");
    }
  };
  return (
    <Stack
      width={"auto"}
      height={"auto"}
      gap={"10px"}
      p={1}
      py={3}
      pb={2}
      mt={2}
      border={"1px solid black"}
      borderColor={"text.disabled"}
      borderRadius={3}
    >
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
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
        <Rating name="read-only" value={5} readOnly />
      </Stack>
      <Stack gap={1}>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography className="small-text">
            The queue process was a bit stressful, not knowing which bit of the
            line to be in. Good once you're on the wheel
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <FamilyRestroomIcon />
          <Typography sx={{ fontSize: 14 }}>Visited with family</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography sx={{ fontSize: 12 }}>
            Posted 24 October 2025 on LankaStay.com
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TourReviewItemForMenu;
