import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import StillInterestedCard from "./StillInterestedCard";
import { GET_VISITED_PROPERTIES } from "@/apollo/user/query";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

const StillInterestedList = () => {
  const user = useReactiveVar(userVar);

  const { data, loading, refetch } = useQuery(GET_VISITED_PROPERTIES, {
    skip: !user._id,
    variables: {
      input: {
        page: 1,
        limit: 100,
      },
    },
  });

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.getVisitedProperties?.list
    ? data.getVisitedProperties.list.slice(startIndex, endIndex)
    : [];
  const pageCount = data?.getVisitedProperties?.list
    ? Math.ceil(data.getVisitedProperties.list.length / itemsPerPage)
    : 0;

  const handleChange = (event: any, value: any) => {
    setPage(value);
    console.log("value", value);
  };
  return (
    <Stack
      className="container"
      sx={{ mt: "50px !important", mb: "50px !important" }}
    >
      <Stack>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Still interested in these properties?
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
          justifyContent: "start",
        }}
      >
        {currentItems.map((item: any, index: any) => (
          <StillInterestedCard key={index} property={item} />
        ))}
      </Stack>
      <Stack spacing={2} mt={2} alignItems="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
    </Stack>
  );
};

export default StillInterestedList;
