import { Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PublicIcon from "@mui/icons-material/Public";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useTranslation } from "next-i18next";

const WhyOurHotel = () => {
  const { t } = useTranslation("common");

  return (
    <Stack>
      <Typography alignSelf={"center"} mb={2} fontWeight={700} fontSize={23}>
        {t("why.title")}
      </Typography>
      <Stack flexDirection={"row"} justifyContent={"center"} gap={2} mb={20}>
        <Stack
          width={290}
          height={210}
          border={"1px solid black"}
          p={2}
          justifyContent={"space-around"}
          borderRadius={4}
          borderColor={"secondary.main"}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <CalendarMonthIcon />
          <Typography fontWeight={700} fontSize={18}>
            {t("why.bookNowHeader")}
          </Typography>
          <Typography>{t("why.bookNowDesc")}</Typography>
        </Stack>
        <Stack
          width={290}
          height={210}
          border={"1px solid black"}
          p={2}
          justifyContent={"space-around"}
          borderRadius={4}
          borderColor={"secondary.main"}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <ReviewsIcon />
          <Typography fontWeight={700} fontSize={18}>
            {t("why.reviewsHeader")}
          </Typography>
          <Typography>{t("why.reviewsDesc")}</Typography>
        </Stack>
        <Stack
          width={290}
          height={210}
          border={"1px solid black"}
          p={2}
          justifyContent={"space-around"}
          borderRadius={4}
          borderColor={"secondary.main"}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <PublicIcon />
          <Typography fontWeight={700} fontSize={18}>
            {t("why.propertiesHeader")}
          </Typography>
          <Typography>{t("why.propertiesDesc")}</Typography>
        </Stack>
        <Stack
          width={290}
          height={210}
          border={"1px solid black"}
          p={2}
          justifyContent={"space-around"}
          borderRadius={4}
          borderColor={"secondary.main"}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <SupportAgentIcon />
          <Typography fontWeight={700} fontSize={18}>
            {t("why.supportHeader")}
          </Typography>
          <Typography>{t("why.supportDesc")}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WhyOurHotel;
