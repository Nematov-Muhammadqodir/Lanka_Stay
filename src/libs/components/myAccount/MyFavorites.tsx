import { userVar } from "@/apollo/store";
import { GET_LIKED_PROPERTIES } from "@/apollo/user/query";
import { useQuery, useReactiveVar } from "@apollo/client";
import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import FavoritePropertyCard from "./FavoritePropertyCard";
import Image from "next/image";

const MyFavorites = () => {
  const user = useReactiveVar(userVar);
  const [page, setPage] = React.useState(1);

  const { data, loading, refetch } = useQuery(GET_LIKED_PROPERTIES, {
    skip: !user._id,
    variables: {
      input: {
        page: page,
        limit: 3,
      },
    },
  });
  console.log("dataaa favorites", data);

  const handleChange = (event: any, value: any) => {
    setPage(value);
    console.log("value", value);
  };

  return (
    <Stack width={"100%"} mb={10} gap={2}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography variant="h4" fontWeight={699}>
            My favorites
          </Typography>
        </Stack>
      </Stack>

      {data?.getLikedProperties?.list.length === 0 ? (
        <Stack sx={{ alignItems: "center", mt: 4 }}>
          <Typography variant="h5" mt={2} sx={{ fontWeight: "bold" }}>
            You have no favorite properties yet.
          </Typography>
          <Image
            src={"/img/warning.png"}
            alt="property-image"
            width={217}
            height={211}
            style={{
              objectFit: "cover",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        </Stack>
      ) : (
        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
            justifyContent: "start",
          }}
        >
          {data?.getLikedProperties?.list.map((item: any, index: any) => (
            <FavoritePropertyCard key={index} property={item} />
          ))}
        </Stack>
      )}

      {data?.getLikedProperties?.list.length !== 0 && (
        <Stack spacing={2} mt={2} alignItems="center">
          <Pagination
            count={data?.getLikedProperties?.metaCounter.total}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default MyFavorites;
