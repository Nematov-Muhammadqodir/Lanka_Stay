import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import StillInterestedCard from "./StillInterestedCard";
import { GET_VISITED_PROPERTIES } from "@/apollo/user/query";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useTranslation } from "next-i18next";
import { userVar } from "@/apollo/store";
import { LIKE_TARGET_PROPERTY } from "@/apollo/user/mutation";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import { T } from "../../types/common";

const StillInterestedList = () => {
  const { t } = useTranslation("common");
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

  /** APOLLO REQUESTS **/
  const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

  const likePropertyHandler = async (user: T, id: string) => {
    console.log("likeRefid", user._id);
    try {
      if (!id) return;
      if (!user._id) throw new Error("User not found!");

      // execute likeTargetProperty Mutation
      await likeTargetProperty({ variables: { input: id } });
      // execute getPropertiesRefetch
      await refetch({
        input: {
          page: 1,
          limit: 100,
        },
      });

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("Error, likePropertyHandler", err);
      sweetMixinErrorAlert(err.message).then();
    }
  };

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
          {t("home.stillInterested")}
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          flexWrap: { xs: "nowrap", md: "wrap" },
          gap: 2,
          mt: 2,
          justifyContent: "start",
          overflowX: { xs: "auto", md: "visible" },
          scrollSnapType: { xs: "x mandatory", md: "none" },
          pb: { xs: 1, md: 0 },
          "&::-webkit-scrollbar": { display: { xs: "none", md: "auto" } },
        }}
      >
        {currentItems.map((item: any, index: any) => (
          <Stack
            key={index}
            sx={{
              flexShrink: 0,
              scrollSnapAlign: { xs: "start", md: "none" },
              width: { xs: 220, md: "auto" },
            }}
          >
            <StillInterestedCard
              property={item}
              likePropertyHandler={likePropertyHandler}
            />
          </Stack>
        ))}
      </Stack>
      {pageCount > 1 && (
        <Stack spacing={2} mt={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default StillInterestedList;
