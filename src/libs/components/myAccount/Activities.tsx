import React from "react";
import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_MY_COMMENTS } from "@/apollo/user/query";
import { formatShortDate } from "../../utils";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Image from "next/image";
import { useRouter } from "next/router";

const Activities = () => {
  const router = useRouter();

  const { data, loading } = useQuery(GET_MY_COMMENTS, {
    variables: { input: { page: 1, limit: 50 } },
    fetchPolicy: "network-only",
  });

  const comments = data?.getMyComments?.list ?? [];
  const total = data?.getMyComments?.metaCounter?.[0]?.total ?? 0;

  if (loading) {
    return (
      <Stack width="100%" py={6} alignItems="center">
        <Typography color="text.secondary">Loading activities...</Typography>
      </Stack>
    );
  }

  return (
    <Stack width="100%" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          My Activities
        </Typography>
        <Chip label={`${total} reviews`} size="small" />
      </Stack>

      {comments.length === 0 ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          py={8}
          gap={1}
          sx={{
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <ChatBubbleOutlineIcon
            sx={{ fontSize: 48, color: "text.disabled" }}
          />
          <Typography color="text.secondary" fontSize={15}>
            You haven&apos;t left any reviews yet
          </Typography>
          <Typography color="text.secondary" fontSize={13}>
            Your hotel and attraction reviews will appear here
          </Typography>
        </Stack>
      ) : (
        <Stack gap={2}>
          {comments.map((comment: any) => {
            const isHotel = !!comment.propertyData;
            const isAttraction = !!comment.attractionData;
            const name = isHotel
              ? comment.propertyData.propertyName
              : isAttraction
              ? comment.attractionData.attractionName
              : "Unknown";
            const city = isHotel
              ? comment.propertyData.propertyCity
              : isAttraction
              ? comment.attractionData.attractionCity
              : "";
            const country = isHotel
              ? comment.propertyData.propertyCountry
              : isAttraction
              ? comment.attractionData.attractionCountry
              : "";
            const images = isHotel
              ? comment.propertyData.propertyImages
              : isAttraction
              ? comment.attractionData.attractionImages
              : [];
            const detailUrl = isHotel
              ? `/hotels/hotelDetail/${comment.propertyData._id}`
              : isAttraction
              ? `/attractions/attractionDetail/${comment.attractionData._id}`
              : "#";
            const image =
              images?.length > 0
                ? `${process.env.NEXT_PUBLIC_API_URL}/${images[0]}`
                : "/img/hotel.jpg";

            return (
              <Stack
                key={comment._id}
                direction="row"
                gap={2}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  },
                }}
                onClick={() => router.push(detailUrl)}
              >
                {/* Image */}
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: 1.5,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={image}
                    alt={name}
                    width={90}
                    height={90}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </Box>

                {/* Content */}
                <Stack flex={1} justifyContent="space-between">
                  <Stack gap={0.5}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      {isHotel ? (
                        <HotelIcon
                          sx={{ fontSize: 16, color: "primary.main" }}
                        />
                      ) : (
                        <AttractionsIcon
                          sx={{ fontSize: 16, color: "primary.main" }}
                        />
                      )}
                      <Typography fontWeight={700} fontSize={15}>
                        {name}
                      </Typography>
                      <Chip
                        label={isHotel ? "Hotel" : "Attraction"}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 11, height: 22 }}
                      />
                    </Stack>
                    <Typography fontSize={12} color="text.secondary">
                      {city}
                      {country ? `, ${country}` : ""}
                    </Typography>
                  </Stack>

                  <Typography
                    fontSize={14}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                      mt: 0.5,
                    }}
                  >
                    &ldquo;{comment.commentContent}&rdquo;
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                    mt={0.5}
                  >
                    <Typography fontSize={12} color="text.secondary">
                      {formatShortDate(comment.createdAt)}
                    </Typography>
                    {comment.commentLikes > 0 && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.3}
                      >
                        <ThumbUpIcon
                          sx={{ fontSize: 13, color: "primary.main" }}
                        />
                        <Typography fontSize={12} color="primary.main">
                          {comment.commentLikes}
                        </Typography>
                      </Stack>
                    )}
                    {comment.commentDislikes > 0 && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.3}
                      >
                        <ThumbDownIcon
                          sx={{ fontSize: 13, color: "error.main" }}
                        />
                        <Typography fontSize={12} color="error.main">
                          {comment.commentDislikes}
                        </Typography>
                      </Stack>
                    )}
                    {comment.commentScore !== 0 && (
                      <Chip
                        label={`Score: ${comment.commentScore}`}
                        size="small"
                        color={comment.commentScore > 0 ? "success" : "error"}
                        variant="outlined"
                        sx={{ fontSize: 11, height: 20 }}
                      />
                    )}
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default Activities;
