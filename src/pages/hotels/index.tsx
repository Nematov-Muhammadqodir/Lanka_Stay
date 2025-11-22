import Filter from "@/src/libs/components/hotels/Filter";
import React from "react";
import ListOfHotels from "@/src/libs/components/hotels/ListOfHotels";
import RecentlyViewed from "@/src/libs/components/hotels/RecentlyViewed/RecentlyViewed";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@apollo/client";
import { GET_ALL_AVAILABLE_PROPERTIES } from "@/apollo/user/query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dynamic from "next/dynamic";

const Hotels = () => {
  const filters = useSelector((state: RootState) => state.filters);
  console.log("FILTERS", filters);

  const { data, loading, refetch } = useQuery(GET_ALL_AVAILABLE_PROPERTIES, {
    skip: !filters.propertyRegion, // skip if no region
    variables: {
      input: {
        propertyRegion: filters.propertyRegion,
        from: filters.startDate,
        until: filters.endDate,
        adults: filters.adults,
        children: filters.children,
        page: filters.page,
        limit: filters.limit,
      },
    },
  });
  console.log("dataaaaa", data);
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
            <ListOfHotels data={data} />
            <Stack className="recentlyViewedHotelsContainer" mt={12}>
              <RecentlyViewed />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(withLayoutSecondary(Hotels)), {
  ssr: false,
});
