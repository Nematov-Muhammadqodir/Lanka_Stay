import { Box, Button, Stack, Typography } from "@mui/material";
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

const GuestReviewItemMenu = () => {
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
      flexDirection={"row"}
      gap={"10px"}
      p={1}
      pb={2}
      mt={5}
      borderBottom={"1px solid black"}
    >
      <Stack width={215} height={340} gap={2}>
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
        <Stack gap={1}>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <BedIcon />
            <Typography className="small-text">
              Premier Twin (Annex Building)
            </Typography>
          </Stack>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <CalendarMonthIcon />
            <Typography className="small-text">
              3 nights · October 2025
            </Typography>
          </Stack>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <FamilyRestroomIcon />
            <Typography className="small-text">Family</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack width={675} height={"auto"} px={2} gap={1} pb={2}>
        <Stack
          flexDirection={"row"}
          p={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack>
            <Typography className="small-text">
              Reviewed: 10 October 2025
            </Typography>
            <Typography className="bold-text">Exceptional</Typography>
          </Stack>
          <Stack>
            <Stack
              width={35}
              height={35}
              sx={{
                backgroundColor: "primary.main",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
              }}
            >
              <Typography color={"secondary.contrastText"} fontWeight={700}>
                10
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          alignItems={"flex-start"}
          gap={1}
          height={"100px"}
        >
          <SentimentSatisfiedAltIcon sx={{ paddingTop: 1, fontSize: 30 }} />
          <Typography>
            Nice facilities, great size family rooms. Delicious breakfast! Good
            location on the sea front in walking distance to some super
            restaurants and cafes.
          </Typography>
        </Stack>
        {/* HOTEL RESPONSE */}
        <Stack className="hotel-response-section">
          <Stack>
            <Stack
              height={"auto"}
              width={630}
              borderRadius={3}
              px={2}
              sx={{ backgroundColor: "secondary.main" }}
            >
              <Stack flexDirection={"row"} p={2} alignItems={"center"} gap={1}>
                <ChatBubbleIcon sx={{ fontSize: 15 }} />
                <Typography className="small-bold-text">
                  Hotel response:
                </Typography>
              </Stack>
              <Stack height={expand} overflow={"hidden"}>
                <Typography>
                  Dear valued guest, Thank you for your kind feedback, we are
                  very delighted to receive your feedback. I am sure that your
                  information about our hotel will make everyone who wants to
                  stay at our hotel more enjoyable. Once again, thank you for
                  your valuable patronage and we look forward to welcoming you
                  back again at The Grand Sumorum soon. Best regards, The Grand
                  Sumorum
                </Typography>
              </Stack>
              <Button
                sx={{
                  width: "140px",
                  textTransform: "capitalize",
                  textDecoration: "underline",
                  color: "primary.main",
                  justifyContent: "flex-start",
                }}
                onClick={handleExpand}
              >
                {expand === "70px" ? "Continue Reading" : "Return"}
              </Button>
            </Stack>
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={2}
            mt={2}
            justifyContent={"flex-end"}
            color={"primary.main"}
          >
            <Stack flexDirection={"row"} gap={1}>
              <ThumbUpOffAltIcon />
              <Typography>Helpful</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={1}>
              <ThumbDownOffAltIcon />
              <Typography>Not helpful</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GuestReviewItemMenu;
