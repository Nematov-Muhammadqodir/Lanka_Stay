import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import MyPage from "@/src/libs/components/myAccount/MyPage";
import Reservations from "@/src/libs/components/myAccount/Reservations";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const MyAccount = () => {
  const router = useRouter();
  console.log("router", router.query);
  const { userId, section } = router.query;
  return (
    <Stack className="container">
      <Stack sx={{ flexDirection: "row" }}>
        <Stack width={"30%"}>
          <Button
            variant="outlined"
            onClick={() => router.push(`/myPage/${userId}/reservations`)}
          >
            My Reservations
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push(`/myPage/${userId}/myPage`)}
          >
            My Page
          </Button>
        </Stack>
        <Stack width={"69%"}>
          {section === "reservations" && <Reservations />}
          {section === "myPage" && <MyPage />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutAttractionsReserve(MyAccount);
