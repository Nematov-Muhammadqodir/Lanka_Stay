import { setLocation } from "@/src/slices/filteringSlice";
import { RootState } from "@/store";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const TrendingDestinations = () => {
  const stripEmoji = (text: string) =>
    text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  console.log("filters", filters);
  const destinations = [
    { src: "/img/Busan.jpg", name: "Busan🇰🇷", width: 650 },
    { src: "/img/Seoul.jpg", name: "Seoul🇰🇷", width: 650 },
    { src: "/img/Tokyo.jpg", name: "Tokyo🇯🇵", width: 421 },
    { src: "/img/Gyeongju.jpg", name: "Gyeongju🇰🇷", width: 421 },
    { src: "/img/Jeju.jpg", name: "Jeju🇰🇷", width: 421 },
  ];

  const ImageBox = ({ item }: any) => (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={() => dispatch(setLocation(stripEmoji(item.name).trim()))}
    >
      <Image
        src={item.src}
        alt={item.name}
        width={item.width}
        height={272}
        style={{ objectFit: "cover", borderRadius: 15 }}
      />

      {/* ✨ Top-left gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)",
        }}
      />

      <Typography
        position="absolute"
        top={15}
        left={15}
        fontSize="25px"
        color="white"
        fontWeight={700}
      >
        {item.name}
      </Typography>
    </Box>
  );

  return (
    <Stack className="container" alignItems="center" gap={3}>
      <Stack alignSelf={"start"}>
        <Typography fontSize={"30px"} fontWeight={800}>
          Trending destinations
        </Typography>
        <Typography>
          Travellers searching for South Korea also booked these
        </Typography>
      </Stack>
      <Stack flexDirection="row" justifyContent="center" gap={3}>
        {destinations.slice(0, 2).map((item, i) => (
          <ImageBox key={i} item={item} />
        ))}
      </Stack>
      <Stack flexDirection="row" justifyContent="center" gap={4}>
        {destinations.slice(2).map((item, i) => (
          <ImageBox key={i} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default TrendingDestinations;
