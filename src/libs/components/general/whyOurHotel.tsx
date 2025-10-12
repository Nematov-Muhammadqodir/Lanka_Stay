import { Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PublicIcon from "@mui/icons-material/Public";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const WhyOurHotel = () => {
  const data = [
    {
      src: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation.png",
      header: "Book now, pay at the property",
      definition: "FREE cancellation on most rooms",
    },
    {
      src: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation.png",
      header: "Book now, pay at the property",
      definition: "FREE cancellation on most rooms",
    },
    {
      src: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation.png",
      header: "Book now, pay at the property",
      definition: "FREE cancellation on most rooms",
    },
    {
      src: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation.png",
      header: "Book now, pay at the property",
      definition: "FREE cancellation on most rooms",
    },
  ];
  return (
    <Stack>
      <Typography alignSelf={"center"} mb={2} fontWeight={700} fontSize={23}>
        Why Lanka Stay.com?{" "}
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
            Book now, pay at the property
          </Typography>
          <Typography>FREE cancellation on most rooms</Typography>
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
            300M+ reviews from fellow travellers
          </Typography>
          <Typography>Get trusted information from guests like you</Typography>
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
            2+ million properties worldwide
          </Typography>
          <Typography>Hotels, guest houses, apartments, and more…</Typography>
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
            Trusted customer service you can rely on, 24/7
          </Typography>
          <Typography>We're always here to help</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WhyOurHotel;
