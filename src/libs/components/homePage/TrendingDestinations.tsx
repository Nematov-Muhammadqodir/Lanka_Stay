import { setLocation } from "@/src/slices/filteringSlice";
import { RootState } from "@/store";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

const TrendingDestinations = () => {
  const { t } = useTranslation("common");
  const stripEmoji = (text: string) =>
    text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  console.log("filters", filters);
  const destinations = [
    { src: "/img/Busan.webp", name: "Busan🇰🇷", width: 650 },
    { src: "/img/Seoul.webp", name: "Seoul🇰🇷", width: 650 },
    { src: "/img/Tokyo.jpg", name: "Tokyo🇯🇵", width: 421 },
    { src: "/img/Gyeongju.webp", name: "Gyeongju🇰🇷", width: 421 },
    { src: "/img/Jeju.webp", name: "Jeju🇰🇷", width: 421 },
  ];

  const ImageBox = ({ item }: any) => (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        width: "100%",
        height: { xs: 220, sm: 240, md: 272 },
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={() => dispatch(setLocation(stripEmoji(item.name).trim()))}
    >
      <Image
        src={item.src}
        alt={item.name}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          borderRadius: 15,
        }}
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
          {t("home.trendingDestinations")}
        </Typography>
        <Typography>{t("home.trendingDesc")}</Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 2, md: 0 },
          width: "100%",
        }}
      >
        {destinations.slice(0, 2).map((item, i) => (
          <Box
            key={i}
            sx={{ width: { xs: "100%", md: "49%" } }}
          >
            <ImageBox item={item} />
          </Box>
        ))}
      </Stack>
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: { xs: 2, sm: 0 },
          width: "100%",
          flexWrap: { xs: "nowrap", sm: "nowrap" },
        }}
      >
        {destinations.slice(2).map((item, i) => (
          <Box
            key={i}
            sx={{ width: { xs: "100%", sm: "32.5%" } }}
          >
            <ImageBox item={item} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default TrendingDestinations;
