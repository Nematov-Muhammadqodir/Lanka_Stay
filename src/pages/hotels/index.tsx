import Filter from "@/src/libs/components/hotels/Filter";
import React from "react";
import ListOfHotels from "@/src/libs/components/hotels/ListOfHotels";
import RecentlyViewed from "@/src/libs/components/hotels/RecentlyViewed/RecentlyViewed";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const Hotels = () => {
  const loading = true;
  const loadingArray = [1, 2, 3];
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
