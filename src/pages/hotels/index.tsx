import Filter from "@/src/libs/components/hotels/Filter";
import React, { useEffect } from "react";
import ListOfHotels from "@/src/libs/components/hotels/ListOfHotels";
import RecentlyViewed from "@/src/libs/components/hotels/RecentlyViewed/RecentlyViewed";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_AVAILABLE_PROPERTIES,
  GET_VISITED_PROPERTIES,
} from "@/apollo/user/query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dynamic from "next/dynamic";

const Hotels = () => {
  const filters = useSelector((state: RootState) => state.filters);
  console.log("FILTERS", filters);

  const { data, loading, refetch } = useQuery(GET_ALL_AVAILABLE_PROPERTIES, {
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

  const {
    data: visitedHotelsData,
    loading: visitedHotelsLoading,
    refetch: visitedHotelsRefetch,
  } = useQuery(GET_VISITED_PROPERTIES, {
    variables: {
      input: {
        page: 1,
        limit: 50,
      },
    },
  });

  console.log("visitedHotelsData", visitedHotelsData?.getVisitedProperties);

  useEffect(() => {
    visitedHotelsRefetch({
      input: {
        page: 1,
        limit: 50,
      },
    });
  }, []);

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
              {visitedHotelsData?.getVisitedProperties &&
                visitedHotelsData?.getVisitedProperties?.list.length > 0 && (
                  <RecentlyViewed
                    visitedHotelsData={visitedHotelsData.getVisitedProperties}
                    visitedHotelsLoading={visitedHotelsLoading}
                  />
                )}
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
