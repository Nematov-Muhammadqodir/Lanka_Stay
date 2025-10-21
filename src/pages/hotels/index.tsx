import Filter from "@/src/libs/components/hotels/Filter";
import ListOfHotels from "@/src/libs/components/hotels/ListOfHotels";
import RecentlyViewed from "@/src/libs/components/hotels/RecentlyViewed/RecentlyViewed";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import React from "react";

const Hotels = () => {
  return (
    <Stack overflow={"auto"} mt={"50px"} mb={20}>
      <Stack className="container">
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Stack width={300}>
            <Filter />
          </Stack>
          <Stack width={980}>
            <ListOfHotels />
            <Stack className="recentlyViewedHotelsContainer" mt={12}>
              <RecentlyViewed />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutSecondary(Hotels);
